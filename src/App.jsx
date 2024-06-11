import { useState, useEffect } from "react";
import "./App.css";
import ProjectsList from "./features/projects/ProjectsList";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import RoleList from "./features/roles/RoleList";
import Tasks from "./features/tasks/Tasks";
import UserList from "./features/users/UserList";
import { useSelector, useDispatch } from "react-redux";
import Login from "./features/login/Login";
import axios from "axios";
import { logUser } from "./features/login/loginSlice";
import Cards from "./features/cards/Cards";

function App() {
  let dispatch = useDispatch();
  let URL = "http://localhost:3002/auth/verify";
  let [update, setUpdate] = useState({
    isLoggedIn: false,
    user: null,
    isVerified: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get(URL, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data) {
            dispatch(logUser({ token, user: res.data }));
            updateUser(token);
          }
        } catch (e) {
          localStorage.removeItem("token");
          setUpdate({ isVerified: false });
        }
      } else {
        setUpdate({ isVerified: false });
      }
    };

    fetchData();
  }, []);

  function updateUser(token) {
    setUpdate({ isLoggedIn: true, isVerified: false });
    localStorage.setItem("token", token);
  }

  return (
    <div>
      {update.isVerified ? (
        "...Loading"
      ) : (
        <div>
          {update.isLoggedIn ? (
            <Routes>
              <Route exact path="/" element={[<ProjectsList />]} />
              <Route exact path="/role" element={[<RoleList />]} />
              <Route exact path="/user" element={[<UserList />]} />
              <Route exact path="/task" element={[<Tasks />]} />
              <Route exact path="/card/:projectId" element={[<Cards />]} />
              <Route exact path="*" element={<Navigate to="/" replace />} />
            </Routes>
          ) : (
            <Routes>
              <Route
                exact
                path="/login"
                element={[<Login updateUser={updateUser} />]}
              />
              <Route
                exact
                path="*"
                element={<Navigate to="/login" replace />}
              />
            </Routes>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
