import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Trello } from "../../context/Context";
import * as API from "../../../API";

function AddListModal({boardId, buttonName_create, list_data}) {
  let userId = JSON.parse(localStorage?.getItem("user")).id;
  const [show, setShow] = useState(false);
  const [disabled,setDisabled] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { listState, listDispatch } = useContext(Trello);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setDisabled(true)
      let { status, data } = await API.createList(boardId,e.target.name.value,userId);
      if (status) {
        listDispatch({ type: "CREATE_LIST", payload: data });
        setDisabled(false)
        handleClose();
      } else {
        listDispatch({ type: "FETCH_LIST_FAILURE", payload: data });
        setDisabled(false)
        handleClose();
      }
    } catch (error) {
        listDispatch({ type: "FETCH_LIST_FAILURE", payload: data });
        setDisabled(false)
        handleClose();
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
       {buttonName_create}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} autoComplete={false}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter List Title..."
                required={true}
                name="name"
                autoFocus
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" disabled={disabled} type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddListModal;
