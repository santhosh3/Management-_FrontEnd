import React from "react";
import defImage from "../../assets/defImage.webp";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import {selectAllProjects} from "./projectSlice";
import { useSelector } from "react-redux";
import "./Project.css"


function Project() {
  const data = useSelector(selectAllProjects);
  return <div className="container-boards">
    {
      data.map((item, index) => (
        <Board board={item} key={item.id}/>
      ))
    }
  </div>;
}

function Board({ board }) {
  let { id, name, image } = board;
  let photo = image ?? defImage;

  return (
    <Link to={`/card/${id}`}>
      <Card className="container-board">
        <Card.Img
          variant="top"
          src={photo}
          alt="Trello Board"
          style={{ width: "100%", height: "10rem", borderRadius:"12px" }}
        />
        <Card.Body className="p-2 position-absolute bottom-0 w-100 text-center">
          <Card.Title className="text-white fs-4">{name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default Project;
