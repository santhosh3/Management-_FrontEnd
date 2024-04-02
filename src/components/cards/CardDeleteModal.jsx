import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as API from "../../../API";
import { Trello } from "../../context/Context";

function DeleteCard({ setStyle, cardId, setShowCard, cardName }) {
  let { listState, listDispatch } = useContext(Trello);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function showPopUp() {
    setStyle({
      opacity: "0.1",
      filter: "blur(20px)",
      WebkitFilter: "blur(20px)",
    });
    handleShow();
  }

  function closePopUp() {
    setStyle(null);
    handleClose();
  }

  async function deleteCard() {
    try {
      let { status, data } = await API.deleteCard(cardId);
      if (status) {
        listDispatch({ type: "DELETE_CARD", payload: data });
        setShowCard(false);
        closePopUp();
      } else {
        listDispatch({ type: "FETCH_LIST_FAILURE", payload: data });
        closePopUp();
      }
    } catch (error) {
      listDispatch({ type: "FETCH_LIST_FAILURE", payload: error.message });
      console.log(error.message);
    }
  }

  return (
    <>
      <Button variant="danger" onClick={showPopUp}>
        Delete
      </Button>

      <Modal
        centered
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={closePopUp}
      >
        <Modal.Title className="text-center font-size-2rem">
          Delete Card
        </Modal.Title>
        <Modal.Body className="fs-4 text-center">
          Are you sure you want to delete your card? 
          <div className="fw-bolder">
          {cardName}
          </div>
        </Modal.Body>
        <Modal.Footer position="middle-center">
          <Button variant="secondary" onClick={closePopUp}>
            No
          </Button>
          <Button variant="success" onClick={deleteCard}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteCard;
