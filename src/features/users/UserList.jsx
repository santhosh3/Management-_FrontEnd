import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProjectNav from "../../../utils/Navbar";
import Users from "./Users";
import CreateUser from "./CreateUser";
import {
  fetchProjects,
  getProjectStatus,
  getProjectError,
  selectAllProjects,
} from "../projects/projectSlice";

import {
  selectAllUsers,
  getUserError,
  getUserStatus,
  fetchUsers,
} from "./userSlice";

let UserList = () => {
  const dispatch = useDispatch();

  const userStatus = useSelector(getUserStatus);
  const error = useSelector(getUserError);

  const projectStatus = useSelector(getProjectStatus);
  const Projecterror = useSelector(getProjectError);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
    if (projectStatus === "idle") {
      dispatch(fetchProjects());
    }
  }, [userStatus,projectStatus, dispatch]);

  let content;
  if (userStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (userStatus === "succeeded") {
    content = [
      <ProjectNav key={0} />,
      <CreateUser key={1} />,
      <Users key={2} />,
    ];
  } else if (userStatus === "failed") {
    content = <p>{error}</p>;
  }

  return content;
};

export default UserList;
