import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { deleteUser } from "./userSlice";
import DeleteModal from "../../../utils/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {selectUserById} from "./userSlice"

function DeleteUser({ userId }) {
  const dispatch = useDispatch();
  const data = useSelector(state => selectUserById(state, userId))
  const [modalShow, setModalShow] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
    } catch (error) {
      console.log(error);
    } finally {
      setModalShow(false);
    }
  };
  const removeRole = (
    <DeleteModal
      icon={[<AiFillDelete />, "delete-user-button"]}
      variant="danger"
      saveButton="delete"
      title="Delete User"
      size="md"
      show={modalShow}
      open={() => setModalShow(true)}
      body={
        <Modal.Body className="fs-4 text-center">
          Are you sure you want to delete User? <strong>{data?.name}</strong>
        </Modal.Body>
      }
      handlesubmit={handleSubmit}
      onHide={() => setModalShow(false)}
    />
  );
  return removeRole;
}

export default DeleteUser;
