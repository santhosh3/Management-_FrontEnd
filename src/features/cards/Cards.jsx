import React from "react";
import { getStoryError, getStoryStatus, fetchStories } from "./storiesSlice";
import { fetchProjects, getProjectStatus } from "../projects/projectSlice";
import { fetchUsers, getUserStatus, selectAllUsers } from "../users/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./Cards.css";
import FetchCards from "./FetchCards";
import Navbar from "../../../utils/Navbar";
import DownNav from "./DownNav";

function Cards() {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const storyStatus = useSelector(getStoryStatus);
  const error = useSelector(getStoryError);

  const projectStatus = useSelector(getProjectStatus);

  const userStatus = useSelector(getUserStatus);

  React.useEffect(() => {
    dispatch(fetchStories(projectId));
    if (projectStatus === "idle") {
      dispatch(fetchProjects());
    }
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [projectId, projectStatus, userStatus]);

  let content;
  if (storyStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (storyStatus === "succeeded") {
    content = [<Navbar key={0} />, <DownNav key={2} />, <FetchCards key={1} />];
  } else if (storyStatus === "failed") {
    content = <p>{error}</p>;
  }

  return content;
}

export default Cards;
