import axios from "axios"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Alert } from "react-bootstrap"
import DEFAULT_STYLE from '../../data/default_style'
import BounceLoader from 'react-spinners/BounceLoader'

const urlBase = 'http://localhost:3000'

export default function HistEqual(props){

    const [showError, setShowError] = useState(false)
    const [loading, setLoading] = useState(false)
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
        setLoading(true)

        axios.post(`${urlBase}/applyHistEqual`, {...post, new_id: new_id_value}).then(res=>{
            console.log(res.data)
            if (res.data !== null) {
                setImageLink(res.data)
                setId(new_id_value)
                setImageChanged(true)
            }
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
            console.log(error)
            setShowError(true)
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
                {showError ? (<Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                <Alert.Heading>Sorry, you got an error!</Alert.Heading>
                <p>
                Something went wrong while editing the image, please try again later.
                </p>
                </Alert>) : null}
                <section className='postSection'>
                    {loading ? ( <div className="loading-section"> <BounceLoader 
                            size={40}
                            loading={loading}
                            color={"#64746E"}
                            /> </div>) :
                        (<img className='edit-photo' src={imageLink} alt={post.description} style={getImageStyle()}/> )}
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