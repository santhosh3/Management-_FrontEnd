import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import * as API from "../../../../API";
import { Trello } from "../../../context/Context";

function CreateUser({roleState}) {
  const { userDispatch } = useContext(Trello);
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    image: null,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setUser({ name: "", email: "", password: "", role: "", image: null });
    setShow(false);
  };
  const handleShow = () => setShow(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("roleId", user.role);
    if (user.image !== null) {
      formData.append("file", user.image);
    }
    try {
      let { status, data } = await API.createUser(formData);
      if (status) {
        console.log(data);
        userDispatch({ type: "CREATE_USER", payload: data });
        setUser({ name: "", email: "", password: "", role: "", image: null });
        setDisabled(false);
        handleClose();
      } else {
        userDispatch({ type: "FETCH_USER_FAILURE", payload: data });
        setDisabled(false);
        handleClose();
      }
    } catch (error) {
      userDispatch({ type: "FETCH_USER_FAILURE", payload: data });
      setDisabled(false);
      handleClose();
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
      <Button variant="primary" onClick={handleShow}>
        Create User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form autoComplete="false" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required={true}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="username"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                required={true}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required={true}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <select
                required={true}
                className="form-control"
                aria-label="Floating label select example"
                defaultValue=""
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="" disabled>
                  -- Select roles --
                </option>
                {roleOptions()}
              </select>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>User Profile</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setUser({ ...user, image: e.target.files[0] })}
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

export default CreateUser;
