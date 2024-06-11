import React from "react";
import CreateTaskModal from "../../../utils/Modal";
import CreateForm from "../../../utils/FormBody";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../FormValues";
import {
  selectAllUsers,
  fetchUsers,
  getUserError,
  getUserStatus,
} from "../users/userSlice";
import {
  selectAllStories,
  fetchStories,
  getStoryError,
  getStoryStatus,
} from "../cards/storiesSlice";
import { createTaskFetch } from "./taskSlice";
import { Row } from "react-bootstrap";

function CreateTaskCop() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);
  const [task, setTask] = React.useState(null);

  async function handleShow() {
    setTask({
      name: "",
      description: "",
      image: null,
      story: "",
      closedById: "",
      assignedById: "",
      assignedToId: "",
      finishedById: "",
      estimatedTime: "",
    });
    setModalShow(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", task.name);
      task.description !== "" &&
        formData.append("description", task.description);
      task.assignedById !== "" &&
        formData.append("assignedById", task.assignedById);
      task.assignedToId !== "" &&
        formData.append("assignedToId", task.assignedToId);
      task.closedById !== "" && formData.append("closedById", task.closedById);
      task.finishedById !== "" &&
        formData.append("finishedById", task.finishedById);
      if (+task.estimatedTime > 0) {
        task.estimatedTime !== "" &&
          formData.append("estimatedTime", task.estimatedTime);
      }
      formData.append("cardId", task.story);
      if (task.image !== null) {
        formData.append("file", task.image);
      }
      dispatch(createTaskFetch(formData)).unwrap();
      setTask({
        name: "",
        description: "",
        image: null,
        story: "",
        closedById: "",
        assignedById: "",
        assignedToId: "",
        finishedById: "",
        estimatedTime: "",
      });
      // dispatch(createRole(role)).unwrap();
      // setRole({ name: "", roleId: "" });
    } catch (error) {
      console.log(error);
    } finally {
      setModalShow(false);
    }
  };

  const stories = useSelector(selectAllStories);
  const storyStatus = useSelector(getStoryStatus);
  const storyError = useSelector(getStoryError);

  const users = useSelector(selectAllUsers);
  const userStatus = useSelector(getUserStatus);
  const error = useSelector(getUserError);

  React.useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
    if (storyStatus === "idle") {
      dispatch(fetchStories());
    }
  }, [userStatus, storyStatus, dispatch]);

  let content;
  if (storyStatus === "loading" || userStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (storyStatus === "succeeded" && userStatus === "succeeded") {
    let projectsOptions = stories?.map((role) => ({
      value: role.id,
      label: role.name,
    }));
    let userOptions = users?.map((role) => ({
      value: role.id,
      label: role.name,
    }));
    let index = 0;
    let body = (
      <div>
        {[3, 3, 2, 1].map((size, rowIndex) => (
          <Row key={rowIndex} className="mb-2">
            {createTask(projectsOptions, userOptions)
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
      </div>
    );
    content = (
      <CreateTaskModal
        title="Create Task"
        size="xl"
        show={modalShow}
        open={handleShow}
        body={body}
        handlesubmit={handleSubmit}
        onHide={() => setModalShow(false)}
      />
    );
  } else {
    content = <p>{[error, storyError]}</p>;
  }

  return (
    <div className="container-create-Project">
      <div className="fs-3">Create Task</div>
      <div>{content}</div>
    </div>
  );
}

export default CreateTaskCop;
