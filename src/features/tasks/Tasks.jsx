import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskTable from "./TaskTable";
import ProjectNav from "../../../utils/Navbar";
import CreateTask from "./CreateTask";

import {
  selectAllTasks,
  getTaskError,
  getTaskStatus,
  fetchTasks,
} from "./taskSlice";

function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const taskStatus = useSelector(getTaskStatus);
  const taskError = useSelector(getTaskError);

  React.useEffect(() => {
    if (taskStatus === "idle") {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

  let content;
  if(taskStatus === "loading"){
    content = <p>"Loading..."</p>
  } else if (taskStatus === "succeeded") {
    content = [<ProjectNav key={0} />,<CreateTask key={2}/>, <TaskTable key={1}/>]
  } else if (taskStatus === "failed") {
    content = <p>{taskError}</p>
  }

  return content;
}

export default Tasks;
