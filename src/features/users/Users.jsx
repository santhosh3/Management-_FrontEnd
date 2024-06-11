import React from "react";
import "./Users.css";
import UserTable from "../../../utils/Table";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import AddMember from "./AddProjects";
import { useSelector } from "react-redux";
import { selectAllUsers } from "./userSlice";
import { selectAllRoles } from "../roles/roleSlice";

function Users() {
  let roles = useSelector(selectAllRoles);
  roles = Object.groupBy(roles, ({ id }) => id);

  const modifyData = useSelector(selectAllUsers).map((item, index) => ({
    id: index + 1,
    Name: item.name,
    email: item.email,
    image: item.image,
    role: roles?.[item?.roleId]?.[0]?.name,
    Projects: item?.BoardsInvolved?.map((x, index) => (
      <Container key={x?.id}>
        <Link className="text-decoration-none text-black" to={`/${x?.id}/list`}>
          {`${x?.name}${
            item.BoardsInvolved.length !== index + 1 ? ", " : ". "
          }`}
        </Link>
      </Container>
    )),
    Action: (
      <div className="Action-container">
        <EditUser key={item.id} userId={item.id} />
        <DeleteUser key={item.id} userId={item.id} />
        <AddMember key={item.id} userId={item.id} />
      </div>
    ),
  }));

  return <UserTable data={modifyData} />;
}

export default Users;
