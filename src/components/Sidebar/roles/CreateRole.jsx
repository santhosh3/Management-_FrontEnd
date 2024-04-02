import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Trello } from "../../../context/Context";
import * as API from "../../../../API";

function CreateRole() {
  const { roleDispatch } = useContext(Trello);
  const [role, setRole] = useState({
    name: "",
    roleId: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function CreateRole(e) {
    e.preventDefault();
    try {
      let { status, data } = await API.createRole(role);
      if (status) {
        roleDispatch({ type: "CREATE_ROLE", payload: data });
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
      <Button variant="primary" onClick={handleShow}>
        Create Role
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form autoComplete="false" onSubmit={CreateRole}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required={true}
                onChange={(e) => setRole({ ...role, name: e.target.value })}
                placeholder="rolename"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>RoleId</Form.Label>
              <Form.Control
                type="text"
                required={true}
                onChange={(e) => setRole({ ...role, roleId: e.target.value })}
                placeholder="roleId"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Permissions</Form.Label>
              <input
                type="checkbox"
                onChange={(e) => setRole({ ...role, roleId: e.target.value })}
                value="Bike"
                placeholder="roleId"
                autoFocus
              />
              <label for="vehicle1">View</label><br></br>
              <input
                type="checkbox"
                onChange={(e) => setRole({ ...role, roleId: e.target.value })}
                value="Bike"
                placeholder="roleId"
                autoFocus
              />
              <label for="vehicle1">Create</label><br></br>
              <input
                type="checkbox"
                onChange={(e) => setRole({ ...role, roleId: e.target.value })}
                value="Bike"
                placeholder="roleId"
                autoFocus
              />
              <label for="vehicle1">Edit</label><br></br>
              <input
                type="checkbox"
                onChange={(e) => setRole({ ...role, roleId: e.target.value })}
                value="Bike"
                placeholder="roleId"
                autoFocus
              />
              <label for="vehicle1">Delete</label><br></br>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary" onClick={handleClose}>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateRole;
