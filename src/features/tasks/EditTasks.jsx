import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTaskById } from "./taskSlice";
import { MdEdit } from "react-icons/md";
import CreateTaskModal from "../../../utils/Modal";
import { createTask as EditTask } from "../../FormValues";
import CreateForm from "../../../utils/FormBody";
import { Row } from "react-bootstrap";
import {
  selectAllUsers,
  fetchUsers,
  getUserError,
  getUserStatus,
} from "../users/userSlice";
import { editTaskFetch } from "./taskSlice";

function EditTasks({ taskId }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => selectTaskById(state, taskId));
  const [modalShow, setModalShow] = React.useState(false);
  const [task, setTask] = React.useState(null);

  const openModal = () => {
    setTask({
      id: data.id,
      name: data.name,
      image: data.image,
      file: null,
      description: data.description,
      closedById: data?.closedBy?.id ?? null,
      assignedById: data?.assignedBy?.id ?? null,
      assignedToId: data?.assignedTo?.id ?? null,
      finishedById: data?.finishedBy?.id ?? null,
    });
    setModalShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(task);
      const formData = new FormData();
      formData.append("name", task?.name);
      formData.append("description", task?.description);
      task?.closedById !== null &&
        formData.append("closedById", task?.closedById);
      task?.assignedById !== null &&
        formData.append("assignedById", task?.assignedById);
      task?.assignedToId !== null &&
        formData.append("assignedToId", task?.assignedToId);
      task?.finishedById !== null &&
        formData.append("finishedById", task?.finishedById);
      if (task?.file !== null) {
        formData.append("file", task?.file);
      }
      dispatch(editTaskFetch(taskId,formData)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setModalShow(false);
    }
  };

  const users = useSelector(selectAllUsers);
  const userStatus = useSelector(getUserStatus);
  const error = useSelector(getUserError);

  React.useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  let content;
  if (userStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (userStatus === "succeeded") {
    let userOptions = users?.map((role) => ({
      value: role.id,
      label: role.name,
    }));
    let index = 0;
    let body = (
      <>
        {[3, 3, 1].map((size, rowIndex) => (
          <Row key={rowIndex} className="mb-2">
            {EditTask([{ value: "", label: "" }], userOptions)
              .filter((x) => x.id !== 1 && x.id !== 7)
              .slice(index, index + size)
              .map((item, itemIndex) => {
                index += itemIndex < size ? 1 : 0;
                return (
                  <CreateForm
                    key={index}
                    form={item}
                    project={task}
                    setProject={setTask}
                  />
                );
              })}
          </Row>
        ))}
      </>
    );
    content = (
      <CreateTaskModal
        icon={[<MdEdit />, "edit-user-button"]}
        title="Edit Task"
        size="xl"
        show={modalShow}
        open={openModal}
        body={body}
        handlesubmit={handleSubmit}
        onHide={() => setModalShow(false)}
      />
    );
  } else if (userStatus === "failure") {
    content = <p>{[error, projectError]}</p>;
  }
  return content;
}

export default EditTasks;
