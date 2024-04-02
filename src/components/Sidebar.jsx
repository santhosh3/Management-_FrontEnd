import { useState } from "react";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { HiBars3 } from "react-icons/hi2";
import { FiAlignJustify } from "react-icons/fi";
import "./style.css";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";
import { Container } from "react-bootstrap";

function Sidebar() {
  const {id,name,image} = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="sideButton" onClick={handleShow}>
        <FiAlignJustify />
      </div>

      <Offcanvas width={250} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {`Hi ${name}`}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="sideNavContainer" style={{color:"black"}}>
            <div onClick={handleClose}>
              {" "}
              <Link
                to="/dashboard"
                className="fs-2"
                style={{ textDecoration: "none", color:"black"}}
              >
                DASHBOARD
              </Link>
            </div>
            <div onClick={handleClose}>
              <Link
                to="/role"
                className="fs-2"
                style={{ textDecoration: "none", color:"black"}}
              >
                ROLES
              </Link>
            </div>
            <div onClick={handleClose}>
              <Link
                to="/user"
                className="fs-2"
                style={{ textDecoration: "none", color:"black"}}
              >
                USERS
              </Link>
            </div>
            <div onClick={handleClose}>
              <Link to="/" className="fs-2" style={{ textDecoration: "none", color:"black"}}>
                BOARDS
              </Link>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
