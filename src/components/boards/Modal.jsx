import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Trello } from "../../context/Context";
import * as API from "../../../API";
import Select from "react-select";

function Example() {
  //const { id } = JSON.parse(localStorage.getItem("user"));
  console.log(localStorage.getItem("user"));
  const { userState, boardDispatch, userDispatch } = useContext(Trello);
  const [board, setBoard] = useState({ name: "", users: [], image: null });
  const [show, setShow] = useState(false);

  async function fetchUsers() {
    try {
      userDispatch({ type: "FETCH_USER_REQUEST" });
      const { status, data } = await API.getUsers();
      if (status) {
        userDispatch({ type: "FETCH_USER_SUCCESS", payload: data });
        setShow(!show);
      } else {
        userDispatch({ type: "FETCH_USER_FAILURE", payload: data });
      }
    } catch (error) {
      userDispatch({ type: "FETCH_USER_FAILURE", payload: error.message });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", board.name);
    // formData.append("userId", Number(id));
    board.users.map((item) => formData.append("userIds", item.value))
    if (board.image !== null) {
      console.log(board.image);
      formData.append("file", board.image);
    }
    try {
      const { status, data } = await API.createBoard(formData);
      if (status) {
        boardDispatch({ type: "CREATE BOARD", payload: data });
        setBoard({ name: "", image: null });
        setShow(!show);
      } else {
        boardDispatch({ type: "FETCH_BOARD_FAILURE", payload: data });
      }
    } catch (error) {
      boardDispatch({ type: "FETCH_BOARD_FAILURE", payload: data });
    }
  }

  // const options = [
  //   { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  //   { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  //   { value: "purple", label: "Purple", color: "#5243AA" },
  //   { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  //   { value: "orange", label: "Orange", color: "#FF8B00" },
  //   { value: "yellow", label: "Yellow", color: "#FFC400" },
  //   { value: "green", label: "Green", color: "#36B37E" },
  //   { value: "forest", label: "Forest", color: "#00875A" },
  //   { value: "slate", label: "Slate", color: "#253858" },
  //   { value: "silver", label: "Silver", color: "#666666" },
  // ];

  console.log(board)

  return (
    <>
      <Button variant="primary" onClick={fetchUsers}>
        Create Board
      </Button>

      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} autoComplete="false">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Board Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your ProjectName"
                required={true}
                onChange={(e) => setBoard({ ...board, name: e.target.value })}
                autoFocus
              />
            </Form.Group>
            {/* <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select Users</Form.Label>
              <Select
                defaultValue={userState.user
                  .map((user) => ({ value: user.id, label: user.name }))
                  .filter((user) => user.value === id)}
                isMulti
                name="colors"
                options={userState.user.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(e) => setBoard({ ...board, users: e })}
              />
            </Form.Group> */}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setBoard({ ...board, image: e.target.files[0] })
                }
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(!show)}>
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

export default Example;
