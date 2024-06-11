import React from "react";
import { useSelector } from "react-redux";
import { selectProjectById } from "../projects/projectSlice";
import { Button } from "react-bootstrap";
import AddMember from "./AddMembers";
import { useParams } from "react-router-dom";
import './Cards.css'

function DownNav() {
  const {projectId} = useParams();
  const project = useSelector((state) => selectProjectById(state, projectId));

  return (
    <div className='main-container-button'>
      <div className="fs-3">{project?.name}</div>
      <div className="view-container">
        <Button>Board View</Button>
        <Button>Table View</Button>
      </div>
      <div>
        <AddMember />
      </div>
    </div>
  );
}

export default DownNav;
