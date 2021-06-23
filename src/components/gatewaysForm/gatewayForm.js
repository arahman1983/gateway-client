import {Modal, Button} from 'react-bootstrap'

export default function GatewayForm({edit, show, onHideHandler}) {
  return (
    <Modal show={show} onHide={onHideHandler} >
      <Modal.Header closeButton>
        <Modal.Title> Add Gateway </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHideHandler}>Cancel</Button>
        <Button variant="primary">
          { edit ? "Edit Gateway" : "Add Gateway" }
        </Button>
      </Modal.Footer>
    </Modal>
  )
 }