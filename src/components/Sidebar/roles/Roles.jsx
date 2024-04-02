import React, { useState, useContext, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Trello } from "../../../context/Context";
import * as API from "../../../../API";
import Loader from "../../Loader";
import DeleteRoles from "./DeleteRoles";
import CreateRole from "./CreateRole";
import EditRole from "./EditRoles";

function Roles() {
  const {roleState,roleDispatch } = useContext(Trello);

  async function getRoles() {
    try {
      roleDispatch({ type: "FETCH_ROLE_REQUEST" });
      const { status, data } = await API.getRoles();
      console.log(data)
      if (status) {
        roleDispatch({ type: "FETCH_ROLE_SUCCESS", payload: data });
      } else {
        roleDispatch({ type: "FETCH_ROLE_FAILURE", payload: data });
      }
    } catch (error) {
      roleDispatch({ type: "FETCH_ROLE_FAILURE", payload: error.message });
    }
  }

  useEffect(() => {
    getRoles();
  }, []);

  const { loading, role, error } = roleState;
  console.log(role , "333333")
  if (loading) <Loader />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  console.log(role);

  return (
    <div style={{ minHeight: "93vh", width: "100%", padding: "1%" }}>
      <div className="container-projects">
        <div>
          <h3>Roles</h3>
        </div>
        <div>
          <CreateRole />
        </div>
      </div>
      <Table
        style={{ marginTop: "1%" }}
        striped
        bordered
        hover
        variant="secondary"
      >
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Users</th>
            <th>RoleId</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(role).map((item, index) => (
            <tr key={item.id}>
              <td className="fs-5">{index + 1}</td>
              <td className="fs-5">{item.name}</td>
              <td className="fs-5">
                {Object.values(item.users).map((ele) => ele.name).join(" ,")}
              </td>
              <td className="fs-5">{item.roleId}</td>
              <td className="fs-5">
                <EditRole role={item} /> <DeleteRoles roleId={item.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Roles;
