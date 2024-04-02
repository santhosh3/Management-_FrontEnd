import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import * as API from "../../../../API";
import { Trello } from "../../../context/Context";

function DeleteRoles({roleId}) {
  const { roleDispatch } = useContext(Trello);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function deleteRole() {
    try {
      let { status, data } = await API.deleteRole(roleId);
      if (status) {
        roleDispatch({type: "DELETE_ROLE", payload : roleId});
        handleClose()
      } else {
        roleDispatch({type: "FETCH_ROLE_FAILURE", payload : data})
      }
    } catch (error) {
        roleDispatch({type: "FETCH_ROLE_FAILURE", payload : error.message})
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
          Delete Role
        </Modal.Title>
        <Modal.Body className="fs-4 text-center">
          Are you sure you want to delete role?
        </Modal.Body>
        <Modal.Footer position="middle-center">
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="success" onClick={deleteRole}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteRoles;
