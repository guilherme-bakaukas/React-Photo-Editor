import {React, useState} from "react";
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Modal, Button} from 'react-bootstrap'
import '../Styles/stylesheet.css'
import PopupEvent from './PopupEvent'

export default function Photo(props){

    const post = props.post
    const navigate = useNavigate()
    const [openPopup, setOpenPopup] = useState(false)

    function getImageStyle(){

        if(post.style == undefined) return {}

        const filters = post.style.map((option) => {
            return `${option.property}(${option.value}${option.unit})`
        })

        return {filter: filters.join(' ')}
    }

    function onDelete(){
        props.startRemovingPost(props.index, post.id)
        setOpenPopup(false)
    }

    function handleClickRemove(){
        setOpenPopup(true)
    }

    function handleClose(){
        setOpenPopup(false)
    }
    
    return(
        <div className="figure">

            <figure className="image-description-box">
                <Link to={`/single/${post.id}`}><img className="photo" src={post.imageLink} alt={post.description} style={getImageStyle()} /></Link>
                <figcaption><p>{post.description}</p></figcaption>
            </figure>

            <div className="button-container">

                    <button className="remove-button"
                    onClick={() => {handleClickRemove()}}><FontAwesomeIcon icon="trash-can" size="2x"/></button>


                    <button className="remove-button"
                    onClick={() => {navigate(`/single/${post.id}`)}}>
                        <FontAwesomeIcon icon="pen-to-square" size="2x"/>
                        </button>
 
            </div>

            <PopupEvent info = {post} onHide={handleClose} show={openPopup} onDelete={onDelete} />

        </div>
    )
}