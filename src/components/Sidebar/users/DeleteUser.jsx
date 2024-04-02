import React,{useContext,useState} from 'react'
import { Trello } from '../../../context/Context';
import { Button,Modal } from 'react-bootstrap';
import * as API from '../../../../API'

function DeleteUser({userId}) {

  const { userDispatch } = useContext(Trello);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function deleteUserById() {
    try {
      let { status, data } = await API.deleteUser(userId);
      if (status) {
        userDispatch({type: "DELETE_USER", payload : userId});
        handleClose()
      } else {
        userDispatch({type: "FETCH_USER_FAILURE", payload : data});
        handleClose()
      }
    } catch (error) {
        userDispatch({type: "FETCH_USER_FAILURE", payload : error.message});
        handleClose()
    }
  }

    return (
        <>
          <Button variant="danger" onClick={handleShow}>
            Delete
          </Button>
    
          <Modal
            centered
            aria-labelledby="contained-modal-title-vcenter"
            show={show}
            onHide={handleClose}
          >
            <Modal.Title className="text-center" style={{ fontSize: "2rem" }}>
              Delete User
            </Modal.Title>
            <Modal.Body className="fs-4 text-center">
              Are you sure you want to delete user?
            </Modal.Body>
            <Modal.Footer position="middle-center">
              <Button variant="secondary" onClick={handleClose}>
                No
              </Button>
              <Button variant="success" onClick={deleteUserById}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    
}

export default DeleteUser