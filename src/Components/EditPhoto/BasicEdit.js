import {React, useState} from 'react'
import { useNavigate } from "react-router-dom"
import BasicEditOption from './BasicEditOption'
import SliderEditor from '../SliderEditor'
import DEFAULT_STYLE from '../../data/default_style'


function Basic_Edit(props){

    const post = props.post

    const navigate = useNavigate()
    const [styleOptions, setStyleOptions] = useState((post.style !== undefined && post.style.length !== 0) ? post.style : DEFAULT_STYLE)
    const [selectedKey, setSelectedKey] = useState(0)
    const previousStyle = (post.style !== undefined && post.style.length !== 0) ? post.style : DEFAULT_STYLE

    const selectedItem = styleOptions[selectedKey]

    function handleSlideChange( { target }){
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


    function handleCancel(){
        setStyleOptions(previousStyle)
    }

    function handleApply(){
        console.log("Submitting changes to firebase");
        props.startUpdatingPost(post, styleOptions)
        navigate('/')
    }
        return(
            <div className='container'>
                <section className='postSection'>
                    <img className='edit-photo' src={post.imageLink} alt={post.description} style={getImageStyle()}/>
                    <div className='sidebar'> 
                    {styleOptions.map((item, index) => {
                        return(
                            <BasicEditOption name = {item.name}
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
    }

export default Basic_Edit