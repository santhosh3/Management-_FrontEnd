import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import * as API from "../../../../API";
import { Trello } from "../../../context/Context";

function EditUser({ userData, roleState }) {
  const { userDispatch } = useContext(Trello);
  const { id, name, email, password, role, image } = userData;
  const [show, setShow] = useState(false);
  console.log(role.id,role.name)
  const [user, setUser] = useState({
    name,
    email,
    password,
    role,
    image,
    file: null,
    roleId: role?.id
  });
  const handleClose = () => {
    setUser({ name, email, password, role, image, file: null });
    setShow(false);
  };
  const handleShow = () => setShow(true);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("roleId", user.roleId);
    if (user.file !== null) {
      formData.append("file", user.file);
    }
    try {
      let { status, data } = await API.updateUser(userData.id, formData);
      if (status) {
        userDispatch({ type: "UPDATE_USER", payload: data });
        //setUser({...user});
        setShow(false);
      } else {
        userDispatch({ type: "FETCH_USER_FAILURE", payload: data });
        setUser({ name, email, password, role, image, file: null });
        setShow(false);
      }
    } catch (error) {
      userDispatch({ type: "FETCH_USER_FAILURE", payload: error.message });
      setShow(false);
    }
  }

  function roleOptions() {
    return roleState.role.map((item) => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });
  }

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form autoComplete="false" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="username"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                className="form-control"
                aria-label="Floating label select example"
                value={user.roleId}
                onChange={(e) => setUser({ ...user, roleId: e.target.value })}
              >
                <option>----</option>
                {
                  roleState.role.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    )
                  )
                }
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>User Profile</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setUser({ ...user, file: e.target.files[0] })}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditUser;
