import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import DeleteTaskModal from "../../../utils/Modal";
import { selectTaskById } from "./taskSlice";
import { Modal } from "react-bootstrap";
import { deleteTaskById } from "./taskSlice";

function DeleteTasks({ taskId }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => selectTaskById(state, taskId));
  const [modalShow, setModalShow] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(deleteTaskById(taskId)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setModalShow(false);
    }
  };
  const content = (
    <DeleteTaskModal
      icon={[<AiFillDelete />, "delete-user-button"]}
      title="Delete task"
      size="md"
      show={modalShow}
      open={() => setModalShow(true)}
      body={
        <Modal.Body className="fs-4 text-center">
          Are you sure you want to delete Task? <strong>{data?.name}</strong>
        </Modal.Body>
      }
      handlesubmit={handleSubmit}
      onHide={() => setModalShow(false)}
    />
  );

  return content;
}

export default DeleteTasks;
