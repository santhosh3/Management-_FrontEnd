// import { Routes, Route, useNavigate } from "react-router-dom";
// import { useState, useContext, useEffect } from "react";
// import Boards from "./components/boards/Boards";
// import Lists from "./components/lists/Lists";
// import Dashboard from "./components/Sidebar/Dashboard";
// import Roles from "./components/Sidebar/roles/Roles";
// import Users from "./components/Sidebar/users/Users";
// import Navbar from "./components/Navbar";
// import { Trello } from "./context/Context";
// import Login from "./login/Login";
// import "./App.css";

// function App() {
//   const navigate = useNavigate();
//   const {login,loginDispatch} = useContext(Trello);
//   const [checkToken, setCheckToken] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       setCheckToken(true);
//     } else {
//       navigate("/login");
//     }
//   }, [checkToken]);

//   console.log(checkToken);

//   return (
//     <div>
//       <Routes>
//         {checkToken ? (
//           <>
//             <Route
//               exact
//               path="/"
//               element={[<Navbar setCheckToken={setCheckToken} />, <Boards />]}
//             ></Route>
//             <Route
//               exect
//               path="/role"
//               element={[<Navbar setCheckToken={setCheckToken} />, <Roles />]}
//             />
//             <Route
//               exect
//               path="/user"
//               element={[<Navbar setCheckToken={setCheckToken} />, <Users />]}
//             />
//             <Route
//               exect
//               path="/dashboard"
//               element={[
//                 <Navbar setCheckToken={setCheckToken} />,
//                 <Dashboard />,
//               ]}
//             />
//             <Route
//               exact
//               path="/:boardId/list"
//               element={[<Navbar />, <Lists />]}
//             ></Route>
//           </>
//         ) : (
//           <>
//             <Route
//               exact
//               path="/login"
//               element={<Login setCheckToken={setCheckToken} />}
//             ></Route>
//           </>
//         )}
//         <Route />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import Boards from "./components/boards/Boards";
import Lists from "./components/lists/Lists";
import Dashboard from "./components/Sidebar/Dashboard";
import Roles from "./components/Sidebar/roles/Roles";
import Users from "./components/Sidebar/users/Users";
import Navbar from "./components/Navbar";
import { Trello } from "./context/Context";
import Login from "./login/Login";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const { login, loginDispatch } = useContext(Trello);

  let path = new URL(window.location.href).pathname
  
  useEffect(() => {
    if(!login.status){
      const token = localStorage?.getItem("token");
      const user = localStorage?.getItem("user");    
      if(token !== null && user !== null){
      loginDispatch({
          type: "LOGIN_USER",
          payload: { token: JSON.parse(token), user: JSON.parse(user) },
      });
      navigate(path);
    } else navigate("/login");
   }
  },[login, loginDispatch])

  return (
    <div>
      <Routes>
        {login.status ? (
          <>
            <Route
              exact
              path="/"
              element={[<Navbar/>, <Boards />]}
            ></Route>
            <Route
              exect
              path="/role"
              element={[<Navbar/>, <Roles />]}
            />
            <Route
              exect
              path="/user"
              element={[<Navbar/>, <Users />]}
            />
            <Route
              exect
              path="/dashboard"
              element={[
                <Navbar/>,
                <Dashboard />,
              ]}
            />
            <Route
              exact
              path="/:boardId/list"
              element={[<Navbar />, <Lists />]}
            ></Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route
              exact
              path="/login"
              element={<Login />}
            ></Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
        <Route />
      </Routes>
    </div>
  );
}

export default App;
