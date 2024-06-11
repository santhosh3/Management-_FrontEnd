import React from "react";
import "./Login.css";
import { Button, Form, ToastContainer, Toast } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logUser } from "./loginSlice";

function Login({ updateUser }) {
  const dispatch = useDispatch();
  const [login, setLogin] = React.useState({ email: "", password: "" });
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:3002/auth/login",
        login
      );
      dispatch(logUser(response.data))
      updateUser(response?.data?.token);
      setLogin({ email: "", password: "" });
    } catch (error) {
      setError(error.response?.data?.response?.message);
      setLogin({ email: "", password: "" });
    }
  }

  return (
    <div className="login_container">
      <div className="modal_container">
        <p className="fs-2">LOGIN</p>
        <Form className="form_container" onSubmit={handleSubmit}>
          <Form.Group className="input" controlId="formGroupEmail">
            <input
              className="inputg"
              autoComplete="off"
              type="email"
              value={login.email}
              placeholder="Enter email"
              required={true}
              onChange={(e) => {
                setError("");
                setLogin({ ...login, email: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="input" controlId="formGroupPassword">
            <input
              className="inputg"
              autoComplete="off"
              type="password"
              value={login.password}
              placeholder="Password"
              required={true}
              onChange={(e) => {
                setError("");
                setLogin({ ...login, password: e.target.value });
              }}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
          {error.length > 0 && (
            <ToastContainer
              position="top-end"
              className="p-3"
              style={{ zIndex: 1 }}
              delay={3000}
              autohide
            >
              <Toast bg={"Danger".toLowerCase()}>
                <Toast.Body className={"text-white"}>
                  <strong>{error}</strong>
                </Toast.Body>
              </Toast>
            </ToastContainer>
          )}
        </Form>
      </div>
    </div>
  );
}

export default Login;
