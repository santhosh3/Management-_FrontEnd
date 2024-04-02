import { useState,useContext } from "react";
import { Trello } from "../../../context/Context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import * as API from "../../../../API";


function EditRole({ role }) {
  const {id, name, roleId } = role;
  const { roleDispatch } = useContext(Trello);
  const [editRole, setEditRole] = useState({ name, roleId });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let { status, data } = await API.editRoles(id,editRole);
      if (status) {
        roleDispatch({ type: "UPDATE_ROLE", payload: data });
        setShow(false);
      } else {
        roleDispatch({ type: "FETCH_ROLE_FAILURE", payload: data });
        setShow(false);
      }
    } catch (error) {
      roleDispatch({ type: "FETCH_ROLE_FAILURE", payload: error.message });
      setShow(false);
    }
  }

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form autoComplete="false" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editRole.name}
                onChange={(e) =>
                  setEditRole({ ...editRole, name: e.target.value })
                }
                placeholder="rolename"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>RoleId</Form.Label>
              <Form.Control
                type="text"
                value={editRole.roleId}
                onChange={(e) =>
                  setEditRole({ ...editRole, roleId: e.target.value })
                }
                placeholder="roleId"
                autoFocus
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditRole;
