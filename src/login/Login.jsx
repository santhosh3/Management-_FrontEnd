// import React, { useState } from "react";
// import { Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import "./style.css";
// import * as API from "../../API";

// function Login({ setCheckToken }) {
//   const navigate = useNavigate();
//   const [error, setError] = useState({
//     status: false,
//     error: "Wrong credentials",
//     color: "white",
//   });

//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const res = await API.loginUser(data);
//       if (res.status) {
//         localStorage.setItem("token", JSON.stringify(res.data.token));
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         setData({ email: "", password: "" });
//         setCheckToken(true);
//         navigate("/");
//       } else {
//         console.log(res);
//         setError({ ...error, status: true, color: "black" });
//       }
//     } catch (error) {
//       setError({ ...error, status: true, color: "black" });
//     }
//   }

//   return (
//     <div className="page">
//       <form className="cover" onSubmit={handleSubmit}>
//         <h1>Login</h1>
//         <input
//           type="email"
//           className="fs-5"
//           value={data.email}
//           autoComplete="false"
//           placeholder="email"
//           onChange={(e) => {
//             setData({ ...data, email: e.target.value });
//             setError({ ...error, status: false, color: "white" });
//           }}
//         />
//         <input
//           className="fs-5"
//           autoComplete="false"
//           value={data.password}
//           type="password"
//           placeholder="password"
//           onChange={(e) => {
//             setData({ ...data, password: e.target.value });
//             setError({ ...error, status: false, color: "white" });
//           }}
//         />
//         <Button
//           style={{ padding: "0.5rem 10rem" }}
//           className="fs-4"
//           type="submit"
//         >
//           Login
//         </Button>
//         <p style={{ color: error.color }}>
//           {error.status ? <>Wrong credentials</> : <>Wrong credentials</>}
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;


import React, { useState,useContext } from "react";
import { Button } from "react-bootstrap";
import { Trello } from "../context/Context";
import { useNavigate } from "react-router-dom";
import "./style.css";
import * as API from "../../API";

function Login({ setCheckToken }) {
  const navigate = useNavigate();
  const {login,loginDispatch} = useContext(Trello);
  const [error, setError] = useState({
    status: false,
    error: "Wrong credentials",
    color: "white",
  });

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  console.log(login, 'sdddssdsdsds', (!login.status && login.error !== null))
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await API.loginUser(data);
      if (res.status) {
        // localStorage.setItem("token", JSON.stringify(res.data.token));
        // localStorage.setItem("user", JSON.stringify(res.data.user));
        // setData({ email: "", password: "" });
        // setCheckToken(true);
        // navigate("/");
        loginDispatch({type:"LOGIN_USER", payload: res.data})
        navigate("/");
      } else {
        // console.log(res);
        // setError({ ...error, status: true, color: "black" });
        loginDispatch({type:"LOGIN_ERROR", payload: res.data})
      }
    } catch (error) {
      //setError({ ...error, status: true, color: "black" });
      loginDispatch({type:"LOGIN_ERROR", payload: res.data})
    }
  }

  return (
    <div className="page">
      <form className="cover" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          className="fs-5"
          value={data.email}
          autoComplete="false"
          placeholder="email"
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
            loginDispatch({type:"LOGOUT_USER"});
          }}
        />
        <input
          className="fs-5"
          autoComplete="false"
          value={data.password}
          type="password"
          placeholder="password"
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
            loginDispatch({type:"LOGOUT_USER"})
          }}
        />
        <Button
          style={{ padding: "0.5rem 10rem" }}
          className="fs-4"
          type="submit"
        >
          Login
        </Button>
        <p>
          {(!login.status && login.error !== null) && <>{JSON.parse(login.error).message}</>}
        </p>
      </form>
    </div>
  );
}

export default Login;

