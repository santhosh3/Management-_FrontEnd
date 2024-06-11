import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Project from "./Project";
import CreateProject from "./CreateProject";
import ProjectNav from "../../../utils/Navbar";
import {
  selectProjectIds,
  getProjectStatus,
  getProjectError,
  fetchProjects,
  selectAllProjects,
} from "./projectSlice";


let ProjectsList = () => {
  const dispatch = useDispatch();

  const projects = useSelector(selectAllProjects);
  const projectStatus = useSelector(getProjectStatus);
  const error = useSelector(getProjectError);

  useEffect(() => {
    if (projectStatus === "idle") {
      dispatch(fetchProjects());
    }
  }, [projectStatus, dispatch]);

  let content;
  if (projectStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (projectStatus === "succeeded") {
    content = [
      <ProjectNav key={0} />,
      <CreateProject key={1} />,
      <Project key={2} />,
    ];
  } else if (projectStatus === "failed") {
    content = <p>{error}</p>;
  }

  return <div>{content}</div>;
};

ProjectsList = React.memo(ProjectsList);
export default ProjectsList;
