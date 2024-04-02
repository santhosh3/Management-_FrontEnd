import React, { useState } from "react";
import { ListGroup, Button,Card, Form, Row, Col, Toast } from "react-bootstrap";

function AddList() {
  const [showInput, setShowInput] = useState(false);

  if (!showInput) {
    return (
      <Button
        className="p-3 m-3 bg-secondary bg-gradient text-white rounded-3 fs-5"
        style={{ width: "18rem" }}
        onClick={() => setShowInput(!showInput)}
      > Add another list
      </Button>
    );
  }

  return (
    <Card className="m-3 bg-secondary bg-gradient text-white rounded-3 fs-5"
    style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Text>
        <Form.Control size="lg" type="text" placeholder="Enter List Title..." /></Card.Text>
        <Button className="" variant="success">Add List</Button>{' '}
        <Button variant="danger"  onClick={() => setShowInput(!showInput)}>X</Button>{' '}
      </Card.Body>
    </Card>
  );
}

export default AddList;
