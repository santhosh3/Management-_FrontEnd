import React from "react";
import { Modal } from "react-bootstrap";
import DeleteModal from "../../../utils/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteRole } from "./roleSlice";
import { AiFillDelete } from "react-icons/ai";
import { selectRoleById } from "./roleSlice";

function removeRole({ role_id }) {
  const dispatch = useDispatch();
  const data = useSelector(state => selectRoleById(state, role_id))
  const [modalShow, setModalShow] = React.useState(false);
  const [addRequestStatus, setAddRequestStatus] = React.useState("idle");
  const handleSubmit = (e) => {
    e.preventDefault();
    try {

    } catch (error) {
      console.log(error);
    } finally {
      setModalShow(false);
      setAddRequestStatus("idle");
    }
  };

  const removeRole = (
    <DeleteModal
      icon={[<AiFillDelete />, "delete-user-button"]}
      variant="danger"
      saveButton="delete"
      title="Delete Role"
      size="md"
      show={modalShow}
      open={() => setModalShow(true)}
      body={
        <Modal.Body className="fs-4 text-center">
          Are you sure you want to delete role? `{data?.name}`
        </Modal.Body>
      }
      handlesubmit={handleSubmit}
      onHide={() => setModalShow(false)}
    />
  );
  return removeRole;
}

export default removeRole;
