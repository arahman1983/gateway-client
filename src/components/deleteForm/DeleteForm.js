import {Modal, Button} from 'react-bootstrap'

export default function DeleteForm({deleteFn, show, onHideHandler}) {
  return (
    <Modal show={show} onHide={onHideHandler} >
      <Modal.Body>
        <h4 className="text-center">Are you sure you want to delete this Item ?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHideHandler}>No don't delete this Item</Button>
        <Button variant="danger" onClick={deleteFn} > Yes delete this Item </Button>
      </Modal.Footer>
    </Modal>
  )
 }