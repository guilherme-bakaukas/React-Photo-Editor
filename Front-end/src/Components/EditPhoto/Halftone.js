import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import DEFAULT_STYLE from '../../data/default_style'
import BounceLoader from 'react-spinners/BounceLoader'

const urlBase = 'http://localhost:3000'

export default function Halftone(props){

    const post = props.post
    const [showError, setShowError] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)
    const navigate = useNavigate()
    const [imageLink, setImageLink] = useState(post.imageLink)
    const [imageChanged, setImageChanged] = useState(false)
    const [halftoneOption, setHalftoneOption] = useState('1')

    const styleOptions = (post.style !== undefined && post.style.length !== 0) ? post.style : DEFAULT_STYLE
    
    const handleApply = (event) => {
        // Send image to backend
        event.preventDefault();
        event.stopPropagation()

        const new_id_value = parseInt(Number(new Date()))
        setImageLoading(true)
        axios.post(`${urlBase}/applyHalftone`, {...post, new_id: new_id_value, option: halftoneOption}).then(res=>{
            console.log(res.data)
            if (res.data !== null) {
                setImageLink(res.data)
                setImageChanged(true)
            }
            setImageLoading(false)
        }).catch((error) => {
            setImageLoading(false)
            console.log(error)
            setShowError(true)
        })
    }

    function handleDiscard(){
        //Discard changes
        setImageLink(post.imageLink)
        setImageChanged(false)
    }

    function handleSave(){
        //Save changes
        if (imageChanged) {
            props.startSetLoading(true)
            props.startUpdatingPostImage(post, imageLink).catch((error) => {
                console.log(error)
                props.startSetLoading(false)
                props.startUpdatingErrorStatus(true, 'An error occured on halftoning process, please try again later')
            })
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
                {showError ? (<Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                <Alert.Heading>Sorry, you got an error!</Alert.Heading>
                <p>
                Something went wrong while editing the image, please try again later.
                </p>
                </Alert>) : null}
                <section className='postSection'>
                        {imageLoading ? ( <div className="loading-section"> <BounceLoader 
                            size={40}
                            loading={imageLoading}
                            color={"#64746E"}
                            /> </div>) :
                        (<img className='edit-photo' src={imageLink} alt={post.description} style={getImageStyle()}/> )}
                    <div className='sidebar'>
                        <Form onSubmit={handleApply}>
                            <Form.Group className="form-group">
                            <Form.Label>Choose frequency filter</Form.Label>
                                <Form.Select size="lg" value={halftoneOption} onChange={(e) => setHalftoneOption(e.target.value)}>
                                    <option value={1}>Floyd</option>
                                    <option value={2}>Sierra</option>
                                    <option value={3}>Burkes</option>
                                </Form.Select>
                            </Form.Group>
                            <div className="d-grid gap-2 p-3">
                                <Button variant="success" type="submit">Apply</Button>
                            </div>
                        </Form>
                    </div>
                </section>
                <div className='style-button-container'>
                    <button className='style-button' onClick={() => handleDiscard()}>Discard</button>
                    <button className='style-button' onClick={() => handleSave()}>Save</button>
                </div>
            </div>
    )
}