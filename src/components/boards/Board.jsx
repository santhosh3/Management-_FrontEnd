import React from "react";
import { Card } from "react-bootstrap";
import defImage from "../../assets/defImage.jpeg";
import { Link } from "react-router-dom";

function Board({ board }) {
  let {id,name,image} = board
  let photo = image ?? defImage 
  return (
    <Link to={`${id}/list`}>
     <Card style={{ width: "15rem" }}>
      <Card.Img
        variant="top"
        src={photo}
        alt="Trello Board"
        style={{ width: "100%", height: "10rem" }}
      />
      <Card.Body className="p-2 position-absolute bottom-0 w-100 text-center">
        <Card.Title className="text-white fs-4">{name}</Card.Title>
      </Card.Body>
    </Card>
    </Link>
  );
}

export default Board;
