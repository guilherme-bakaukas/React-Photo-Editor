import React from 'react'
import { Button, Form } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import { connect } from 'react-redux';

function AddPhoto(props) {

    const navigate = useNavigate()

    function handleSubmit(event){
        event.preventDefault(); // this line disable the refresh page when clicking
        const imageLink = event.target.elements.ImageURL.value
        const description = event.target.elements.ImageDescription.value
        const newPost = {
            id: parseInt(Number(new Date())),
            description: description,
            imageLink: imageLink,
            style: []
        }
        //use Date as id: More recently added => Bigger the number (used to sort images)
        if(imageLink && description){
            props.startSetLoading(true)
            console.log(props)
            props.startAddingPostImage(newPost).catch((error) => {
                console.log(error)
                props.startSetLoading(false)
                props.startUpdatingErrorStatus(true, 'An error occured while adding the post, please try again later')
            })
            navigate('/')
        }

    }

    return(
        <div>
            <div className='addForm'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="ImageURL">
                    <Form.Label className="h3">Image Url</Form.Label>
                    <Form.Control className="inputBox" size="lg" type="text" placeholder="Enter url" />
                    </Form.Group>

                    <Form.Group className="mt-4 mb-3" controlId="ImageDescription">
                    <Form.Label className="h3">Image Description</Form.Label>
                    <Form.Control className="inputBox" size="lg" type="text" placeholder="Enter description" />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button size="lg" className="mt-3" variant="secondary" type="submit">
                            POST
                        </Button>
                    </div>
                </Form>
            </div>
        </div>

    )
}

function mapStateToProps(state){
    return{
        posts: state.posts
    } 
}


export default connect(mapStateToProps)(AddPhoto)