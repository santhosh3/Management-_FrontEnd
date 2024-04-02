import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Trello } from "../../context/Context";
import * as API from "../../../API";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Row, Col, Button } from "react-bootstrap";
import {modules,formats} from "./TextArea"
import "./style.css";

function CardModal({ title, id }) {
  const { userDispatch, userState } = useContext(Trello);
  const [card, setCard] = useState({
    name: "",
    description: "",
    image: null,
    createdById: "",
    closedById: "",
    assignedById: "",
    assignedToId: "",
    finishedById: "",
    issueType: "",
    priority: "",
    endDate: "",
    startDate: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [show, setShow] = useState(false);
  const { listDispatch } = useContext(Trello);

  const handleClose = () => {
    setCard({
      name: "",
      description: "",
      image: null,
      createdById: "",
      closedById: "",
      assignedById: "",
      assignedToId: "",
      finishedById: "",
      issueType: "",
      priority: "",
      endDate: "",
      startDate: "",
    });
    setShow(false);
  };
  const handleShow = () => setShow(true);

  async function getUsers() {
    if(userState.user.length === 0){
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
  }

  function handleShowUsers() {
    handleShow();
    getUsers();
  }

  const showUsersViaOptions = userState.user.map((user, index) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  async function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    const formData = new FormData();
    formData.append("name", card.name);
    formData.append("description", card.description);
    formData.append("listId", +id);
    card.priority !== "" && formData.append("priority", card.priority);
    card.createdById !== "" && formData.append("createdById", card.createdById);
    card.closedById !== "" && formData.append("closedById", card.closedById);
    card.assignedById !== "" &&
      formData.append("assignedById", card.assignedById);
    card.assignedToId !== "" &&
      formData.append("assignedToId", card.assignedToId);
    card.finishedById !== "" &&
      formData.append("finishedById", card.finishedById);
    card.issueType !== "" && formData.append("issueType", card.issueType);
    card.startDate !== "" &&
      formData.append("startDate", new Date(card.startDate).toISOString());
    card.endDate !== "" &&
      formData.append("endDate", new Date(card.endDate).toISOString());
    if (card.image !== null) {
      formData.append("file", card.image);
    }
    try {
      let { status, data } = await API.createCard(formData);
      if (status) {
        listDispatch({ type: "CREATE_CARD", payload: data });
        setCard({
          name: "",
          priority: "",
          description: "",
          image: null,
          createdById: "",
          closedById: "",
          assignedById: "",
          assignedToId: "",
          finishedById: "",
          issueType: "",
        });
        setDisabled(false);
        handleClose();
      } else {
        listDispatch({ type: "FETCH_LIST_FAILURE", payload: data });
        setDisabled(false);
      }
    } catch (error) {
      listDispatch({ type: "FETCH_LIST_FAILURE", payload: data });
      setDisabled(false);
    }
  }

 

  const handleProcedureContentChange = (content) => {
    console.log("content---->", content);
  };

  return (
    <>
      <button
        variant="success"
        // className="mt-2"
        className="addCard"
       // style={{ backgroundColor: "rgb(16,18,4)" }}
        onClick={() => handleShowUsers()}
      >
        + Add a card
      </button>

      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>Card Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a title of card"
                  required={true}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                  autoFocus
                />
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>CreatedBy</Form.Label>
                <Form.Select
                  className="form-control"
                  aria-label="Floating label select example"
                  defaultValue=""
                  onChange={(e) =>
                    setCard({ ...card, createdById: e.target.value })
                  }
                >
                  <option>----</option>
                  {showUsersViaOptions}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>AssignedBy</Form.Label>
                <Form.Select
                  className="form-control"
                  aria-label="Floating label select example"
                  defaultValue=""
                  onChange={(e) =>
                    setCard({ ...card, assignedById: e.target.value })
                  }
                >
                  <option>---</option>
                  {showUsersViaOptions}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>FinishedBy</Form.Label>
                <Form.Select
                  className="form-control"
                  aria-label="Floating label select example"
                  defaultValue=""
                  onChange={(e) =>
                    setCard({ ...card, finishedById: e.target.value })
                  }
                >
                  <option>----</option>
                  {showUsersViaOptions}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>ClosedBy</Form.Label>
                <Form.Select
                  className="form-control"
                  aria-label="Floating label select example"
                  defaultValue=""
                  onChange={(e) =>
                    setCard({ ...card, closedById: e.target.value })
                  }
                >
                  <option>----</option>
                  {showUsersViaOptions}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>AssignedTo</Form.Label>
                <Form.Select
                  className="form-control"
                  aria-label="Floating label select example"
                  defaultValue=""
                  onChange={(e) =>
                    setCard({ ...card, assignedToId: e.target.value })
                  }
                >
                  <option>----</option>
                  {showUsersViaOptions}
                </Form.Select>
              </Form.Group>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>StartDate</Form.Label>
                <Form.Control
                  type="date"
                  autoFocus
                  onChange={(e) =>
                    setCard({ ...card, startDate: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>EndDate</Form.Label>
                <Form.Control
                  type="date"
                  autoFocus
                  onChange={(e) =>
                    setCard({ ...card, endDate: e.target.value })
                  }
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFile">
                <Form.Label>File</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    setCard({ ...card, image: e.target.files[0] })
                  }
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formFile">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  defaultValue="----"
                  onChange={(e) =>
                    setCard({ ...card, priority: e.target.value })
                  }
                >
                  <option>----</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formFile">
                <Form.Label>Issue Type</Form.Label>
                <Form.Select
                  className="form-control"
                  aria-label="Floating label select example"
                  defaultValue=""
                  onChange={(e) =>
                    setCard({ ...card, issueType: e.target.value })
                  }
                >
                  <option>----</option>
                  <option value={1}>Epic</option>
                  <option value={2}>Story</option>
                  <option value={3}>Task</option>
                  <option value={4}>Bug</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Form.Group
              className="mb-5"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) =>
                  setCard({ ...card, description: e.target.value })
                }
              />
              {/* <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                placeholder="write your content ...."
                // onChange={handleProcedureContentChange}
                onChange={(e) =>
                  setCard({ ...card, description: e })
                }
                style={{ height: "100px"}}
              ></ReactQuill> */}
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" disabled={disabled} type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CardModal;
