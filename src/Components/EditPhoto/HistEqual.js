import axios from "axios"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import DEFAULT_STYLE from '../../data/default_style'

const urlBase = 'http://localhost:3000'

export default function HistEqual(props){

    const navigate = useNavigate()
    const post = props.post
    const [id, setId] = useState(post.id)
    const [imageLink, setImageLink] = useState(post.imageLink)
    const [imageChanged, setImageChanged] = useState(false)

    const styleOptions = (post.style !== undefined && post.style.length !== 0) ? post.style : DEFAULT_STYLE
    
    function handleApply(){
        // Send image to backend
        const new_id_value = parseInt(Number(new Date()))
        console.log("Apply Hist")
        axios.post(`${urlBase}/applyHistEqual`, {...post, new_id: new_id_value}).then(res=>{
            console.log(res.data)
            if (res.data !== null) {
                setImageLink(res.data)
                setId(new_id_value)
                setImageChanged(true)
            }
        }).catch((error) => {
            console.log(error)
            //criar alert de erro
        })
    }

    function handleDiscard(){
        //Discard changes
        setImageLink(post.imageLink)
        setId(post.id)
        setImageChanged(false)
    }

    function handleSave(){
        //Save changes
        if (imageChanged) {
            props.startUpdatingPostImage(post, id, imageLink)
            navigate('/')
        }

    }

    function getImageStyle() {
        const filters = styleOptions.map((option) => {
            return `${option.property}(${option.value}${option.unit})`
        })

        return {filter: filters.join(' ')}
    }

    return(
            <div className='container'>
                <section className='postSection'>
                    <img className='edit-photo' src={imageLink} alt={post.description} style={getImageStyle()}/>
                    <div className='p-3'>
                    <Button variant="success" size="lg" onClick={() => handleApply()}>Apply</Button>
                    </div>
                </section>
                <div className='style-button-container'>
                    <button className='style-button' onClick={() => handleDiscard()}>Discard</button>
                    <button className='style-button' onClick={() => handleSave()}>Save</button>
                </div>
            </div>
    )
}