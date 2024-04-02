import { useState, useContext } from "react";
import { Form, Modal, Button, Image, Row, Col } from "react-bootstrap";
import CardDeleteModal from "./CardDeleteModal";
import * as API from "../../../API";
import { Trello } from "../../context/Context";
import { useDrag } from "react-dnd";
import { Parser } from 'html-to-react';

function UpdateCard({ card, table }) {
  const {
    listDispatch,
    userState,
    userDispatch,
    listState,
    draged,
    dragDispatch,
  } = useContext(Trello);
  const [show, setShow] = useState(false);
  const [style, setStyle] = useState(null);
  const [dragCard, setDragCard] = useState(card);

  let [updateCard, setUpdateCard] = useState({
    id: card.id,
    name: card.name,
    description: card.description,
    image: card.image,
    issueType: card.issueType ?? "",
    priority: card?.priority ?? "",
    endDate: card?.endDate ?? "",
    startDate: card?.startDate ?? "",
    createdById: card?.createdBy?.id ?? "",
    assignedById: card?.assignedBy?.id ?? "",
    finishedById: card?.finishedBy?.id ?? "",
    closedById: card?.closedBy?.id ?? "",
    assignedToId: card?.assignedTo?.id ?? "",
    listId: card?.listId ?? "",
    listIdChanged: false,
    file: null,
  });

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

  const handleShow = () => setShow(true);
  function handleShowUsers() {
    setUpdateCard({
      id: card.id,
      name: card.name,
      description: card.description,
      image: card.image,
      issueType: card.issueType ?? "",
      priority: card?.priority ?? "",
      endDate: card?.endDate ?? "",
      startDate: card?.startDate ?? "",
      createdById: card?.createdBy?.id ?? "",
      assignedById: card?.assignedBy?.id ?? "",
      finishedById: card?.finishedBy?.id ?? "",
      closedById: card?.closedBy?.id ?? "",
      assignedToId: card?.assignedTo?.id ?? "",
      listId: card?.listId ?? "",
      listIdChanged: false,
      file: null,
    });
    handleShow();
    getUsers();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(updateCard.startDate);
    const formData = new FormData();
    formData.append("name", updateCard.name);
    formData.append("description", updateCard.description);
    updateCard.createdById !== "" &&
      formData.append("createdById", updateCard.createdById);
    updateCard.assignedById !== "" &&
      formData.append("assignedById", updateCard.assignedById);
    updateCard.finishedById !== "" &&
      formData.append("finishedById", updateCard.finishedById);
    updateCard.closedById !== "" &&
      formData.append("closedById", updateCard.closedById);
    updateCard.assignedToId !== "" &&
      formData.append("assignedToId", updateCard.assignedToId);
    updateCard.priority !== "" &&
      formData.append("priority", updateCard.priority);
    updateCard.issueType !== "" &&
      formData.append("issueType", updateCard.issueType);
    updateCard.startDate !== "" &&
      formData.append(
        "startDate",
        new Date(updateCard.startDate).toISOString()
      );
    updateCard.endDate !== "" &&
      formData.append("endDate", new Date(updateCard.endDate).toISOString());
    updateCard.listId !== "" && formData.append("listId", updateCard.listId);
    if (updateCard.file !== null) {
      formData.append("file", updateCard.file);
    }
    try {
      let { status, data } = await API.updateCard(card.id, formData);
      if (status) {
        listDispatch({ type: "UPDATE_CARD", payload: data });
        if (updateCard.listIdChanged) {
          listDispatch({ type: "DELETE_CARD", payload: card });
          listDispatch({ type: "CREATE_CARD", payload: data });
        }
        setShow(false);
      } else {
        listDispatch({ type: "FETCH_LIST_FAILURE", payload: data });
        setShow(false);
      }
    } catch (error) {
      listDispatch({ type: "FETCH_LIST_FAILURE", payload: error.message });
      setShow(false);
    }
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { card: dragCard },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  let opacity;
  isDragging
    ? (opacity = { opacity: "0.5", cursor: "pointer", borderRadius:"10%"})
    : (opacity = { opacity: "1", cursor: "pointer"});

  function onDrag() {
    if (isDragging && draged.status === false) {
      setDragCard(card);
    }
  }

  return (
    <>
      {table ? (
        <Button variant="dark" onClick={() => handleShowUsers()}>
          Edit
        </Button>
      ) : (
        <div
          draggable="true"
          onDrag={onDrag}
          ref={drag}
          style={opacity}
          onClick={() => handleShowUsers()}
        >
          {card.name} 
        </div>
      )}
      <Modal
        size="xl"
        centered={true}
        style={style}
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Edit Card Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Card Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={updateCard.name}
                  value={updateCard.name}
                  onChange={(e) =>
                    setUpdateCard({ ...updateCard, name: e.target.value })
                  }
                  autoFocus
                />
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>CreatedBy</Form.Label>
                <Form.Select
                  className="form-control"
                  aria-label="Floating label select example"
                  value={updateCard.createdById}
                  onChange={(e) =>
                    setUpdateCard({
                      ...updateCard,
                      createdById: e.target.value,
                    })
                  }
                >
                  <option>---</option>
                  {userState.user.map((user, index) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>AssignedBy</Form.Label>
                <Form.Select
                  className="form-control"
                  aria-label="Floating label select example"
                  value={updateCard.assignedById}
                  onChange={(e) =>
                    setUpdateCard({
                      ...updateCard,
                      assignedById: e.target.value,
                    })
                  }
                >
                  <option>---</option>
                  {userState.user.map((user, index) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>FinishedBy</Form.Label>
                <Form.Select
                  className="form-control"
                  aria-label="Floating label select example"
                  value={updateCard.finishedById}
                  onChange={(e) =>
                    setUpdateCard({
                      ...updateCard,
                      finishedById: e.target.value,
                    })
                  }
                >
                  <option>----</option>
                  {userState.user.map((user, index) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>ClosedBy</Form.Label>
                <Form.Select
                  className="form-control"
                  aria-label="Floating label select example"
                  value={updateCard.closedById}
                  onChange={(e) =>
                    setUpdateCard({ ...updateCard, closedById: e.target.value })
                  }
                >
                  <option>----</option>
                  {userState.user.map((user, index) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>AssignedTo</Form.Label>
                <Form.Select
                  className="form-control"
                  aria-label="Floating label select example"
                  value={updateCard.assignedToId}
                  onChange={(e) =>
                    setUpdateCard({
                      ...updateCard,
                      assignedToId: e.target.value,
                    })
                  }
                >
                  <option>-----</option>
                  {userState.user.map((user, index) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formFile" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    setUpdateCard({ ...updateCard, file: e.target.files[0] })
                  }
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formFile">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  value={updateCard.priority}
                  onChange={(e) =>
                    setUpdateCard({ ...updateCard, priority: e.target.value })
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
            </Row>

            <Row>
              <Form.Group as={Col} controlId="formFile">
                <Form.Label>Issue Type</Form.Label>
                <Form.Select
                  className="form-control"
                  aria-label="Floating label select example"
                  value={updateCard.issueType}
                  onChange={(e) =>
                    setUpdateCard({ ...updateCard, issueType: e.target.value })
                  }
                >
                  <option>----</option>
                  <option value={1}>Epic</option>
                  <option value={2}>Story</option>
                  <option value={3}>Task</option>
                  <option value={4}>Bug</option>
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
                  value={
                    updateCard.startDate !== ""
                      ? new Date(updateCard.startDate)
                          .toISOString()
                          .substring(0, 10)
                      : ""
                  }
                  onChange={(e) =>
                    setUpdateCard({ ...updateCard, startDate: e.target.value })
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
                  value={
                    updateCard.endDate !== ""
                      ? new Date(updateCard.endDate)
                          .toISOString()
                          .substring(0, 10)
                      : ""
                  }
                  onChange={(e) =>
                    setUpdateCard({ ...updateCard, endDate: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>SelectList</Form.Label>
                <Form.Select
                  className="form-control"
                  aria-label="Floating label select example"
                  value={updateCard.listId}
                  onChange={(e) =>
                    setUpdateCard({
                      ...updateCard,
                      listId: e.target.value,
                      listIdChanged: true,
                    })
                  }
                >
                  <option>----</option>
                  {Object.values(listState.list).map((list, index) => (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={
                  updateCard.description
                }
                onChange={(e) =>
                  setUpdateCard({ ...updateCard, description: e.target.value })
                }
                rows={4}
              />
            </Form.Group>
            {card.image !== null && (
              <Image src={card.image} alt="no Image" height={100} width={100} />
            )}
            <Modal.Footer
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <CardDeleteModal
                  setStyle={setStyle}
                  cardId={updateCard.id}
                  setShowCard={setShow}
                  cardName={updateCard.name}
                />
              </div>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </div>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateCard;
