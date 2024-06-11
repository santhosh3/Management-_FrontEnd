import React, { useEffect } from "react";
import ProjectNav from "../../../utils/Navbar";
import CreateRole from "./CreateRole";
import { useSelector, useDispatch } from "react-redux";
import Roles from "./Roles";
import {
  selectAllRoles,
  getRoleError,
  getRoleStatus,
  fetchRoles,
} from "./roleSlice";

function RoleList() {
  const dispatch = useDispatch();

  const roleStatus = useSelector(getRoleStatus);
  const error = useSelector(getRoleError);

  useEffect(() => {
    if (roleStatus === "idle") {
      dispatch(fetchRoles());
    }
  }, [roleStatus, dispatch]);

  let content;
  if (roleStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (roleStatus === "succeeded") {
    content = [
      <ProjectNav key={0} />,
      <CreateRole key={1} />,
      <Roles key={2} />,
    ];
  } else if (roleStatus === "failed") {
    content = <p>{error}</p>;
  }
  return content;
}

export default RoleList;
