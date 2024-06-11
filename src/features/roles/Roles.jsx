import React from "react";
import RoleTable from "../../../utils/Table";
import DeleteRole from "./deleteRole";
import EditRole from "./EditRole";
import "./Roles.css";
import { useSelector } from "react-redux";
import { selectAllRoles } from "./roleSlice";

function Roles() {
  const modifyData = useSelector(selectAllRoles).map((item, index) => ({
    id: index + 1,
    name: item.name,
    users: Object.values(item.users)
      .map((ele) => ele.name)
      .join(" ,"),
    roleId: item.roleId,
    Action: (
      <div className="Action-container">
        <DeleteRole key={item.id} role_id={item.id} />
        <EditRole key={item.id} role_id={item.id} />
      </div>
    ),
  }));

  const table = <RoleTable data={modifyData} />;

  return table;
}

export default Roles;
