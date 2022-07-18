import {React} from "react";
import {Modal, Button} from 'react-bootstrap'

export default function PopupEvent(props){
  
    function handleDeletePost(){
      props.onDelete()
    }

    return (
        <div>
            <Modal
            show = {props.show}
            onHide = {props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Delete Image
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                {props.info.description}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn btn-danger' onClick={handleDeletePost}>
                    Delete
                </Button>
                <Button variant="primary" onClick={props.onHide}>
                    Cancel
                </Button>
            </Modal.Footer>
            </Modal>
      </div>
    )
}