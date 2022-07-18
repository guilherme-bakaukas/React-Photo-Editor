import {React, useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import EditOption from './EditOption'
import SliderEditor from './SliderEditor';

const DEFAULT_STYLE = [
    {
        name: "Brightness",
        property: "brightness",
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: "Contrast",
        property: "contrast",
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: "Saturation",
        property: "saturate",
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: "Grayscale",
        property: "grayscale",
        value: 0,
        range: {
            min: 0,
            max: 100
        },
        unit: '%'
    },        
    {
        name: "Blur",
        property: "blur",
        value: 0,
        range: {
            min: 0,
            max: 20
        },
        unit: 'px'
    }
]


function Single(props){

    const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    const posts = props.posts
    const post = posts.find((post) => post.id === parseInt(id))

    const [styleOptions, setStyleOptions] = useState((post.style !== undefined && post.style.length !== 0) ? post.style : DEFAULT_STYLE)
    const [selectedKey, setSelectedKey] = useState(0)
    const previousStyle = (post.style !== undefined && post.style.length !== 0) ? post.style : DEFAULT_STYLE

    const selectedItem = styleOptions[selectedKey]

    function handleSlideChange( { target }){
        console.log(selectedItem)
        setStyleOptions(prevOptions => {
            return prevOptions.map((option, index) => {
                if (index === selectedKey) return {...option, value: target.value}
                else return option
            })
        })
    }

    function getImageStyle() {
        const filters = styleOptions.map((option) => {
            return `${option.property}(${option.value}${option.unit})`
        })

        return {filter: filters.join(' ')}
    }

    function getStyleValues() {
        const styleValues = styleOptions.map((option) => {
            return {property: option.property, 
                    value: option.value}
        })
        console.log(styleValues)
    }

    function handleCancel(){
        setStyleOptions(previousStyle)
    }

    function handleApply(){
        console.log("Submitting changes to firebase");
        props.startUpdatingPost(id, styleOptions)
        navigate('/')
    }
    
    if (props.loading === true){
        return <div className='loader'>...loading</div>
    } else if (post) {
        return(
            <div className='container'>
                <section className='postSection'>
                    <img className='edit-photo' src={post.imageLink} alt={post.description} style={getImageStyle()}/>
                    <div className='sidebar'> 
                    {styleOptions.map((item, index) => {
                        return(
                            <EditOption name = {item.name}
                            key = {index} 
                            active = {index === selectedKey}
                            handleClick = {() => setSelectedKey(index)}/>
                        )
                    })}
                    </div>
                </section>
                <div className='control-panel'>
                    <SliderEditor
                    min = {selectedItem.range.min}
                    max = {selectedItem.range.max}
                    value = {selectedItem.value}
                    handleChange = {handleSlideChange}
                    />
                </div>
                <div className='style-button-container'>
                    <button className='style-button' onClick={handleCancel}>Cancel</button>
                    <button className='style-button' onClick={handleApply}>Apply</button>
                </div>
            </div>

        )
    } else {
        return <h4>No post found...</h4>
    }
}

export default Single