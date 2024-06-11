import React from "react";
import Tasktable from "../../../utils/Table";
import { useSelector } from "react-redux";
import { selectAllTasks } from "./taskSlice";
import EditTasks from "./EditTasks";
import DeleteTask from "./DeleteTasks";
import AddEffort from "./AddEffort";

function TaskTable() {
  const tasks = useSelector(selectAllTasks);

  const modifyData = tasks.map((item, index) => ({
    id: index + 1,
    Task: item?.name,
    Description: item?.description,
    Story: item?.Card?.name,
    EstimatedTime: item?.estimatedTime,
    CostTime: "",
    LeftTime: "",
    Action: (
      <div className="Action-container">
        <EditTasks key={item.id} taskId={item?.id} />
        <DeleteTask key={item.id} taskId={item?.id} />
        <AddEffort key={item.id} taskId={item?.id}/>
      </div>
    ),
  }));
  return <Tasktable data={modifyData} />;
}

export default TaskTable;
