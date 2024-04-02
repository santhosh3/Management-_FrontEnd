import React, { useState, useContext, useEffect } from "react";
import {Modal, Button, Image, Table } from "react-bootstrap";
import { Trello } from "../../../context/Context";
import * as API from "../../../../API";
import Loader from "../../Loader";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUsers";
import ShowImage from "./ShowImage";
import CreateUser from "./CreateUser";
import AddProjects from "./AddProject";

function Users() {
  const { userState,roleDispatch,roleState,userDispatch } = useContext(Trello);


  async function getRoles() {
    try {
      roleDispatch({ type: "FETCH_ROLE_REQUEST" });
      const { status, data } = await API.getRoles();
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


  async function getUsers() {
    try {
      userDispatch({ type: "FETCH_USER_REQUEST" });
      const { status, data } = await API.getUsers();
      if (status) {
        userDispatch({ type: "FETCH_USER_SUCCESS", payload: data });
      } else {
        userDispatch({ type: "FETCH_USER_FAILURE", payload: data });
      }
    } catch (error) {
      userDispatch({ type: "FETCH_USER_FAILURE", payload: error.message });
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const { loading, user, error } = userState;

  if (loading) <Loader />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div style={{minHeight:"93vh", width:"100%"}}>
      <div className="container-projects">
        <div>
          <h3>Users</h3>
        </div>
        <div>
          <CreateUser roleState={roleState}/>
        </div>
      </div>
      <div style={{padding:"1%"}}>
      <Table style={{ marginTop: "1%"}} striped bordered hover variant="secondary">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Image</th>
            <th>RoleId</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user.sort((a,b) => a.id-b.id).map((item, index) => (
            <tr key={item.id}>
              <td className="fs-5">{index+1}</td>
              <td className="fs-5">{item.name}</td>
              <td className="fs-5">{item.email}</td>
              <td className="fs-5">
                <ShowImage image={item.image}/>
                {/* <Image onClick={() => console.log("Hello")} src={item.image} width={100} height={100} alt={item.name}/> */}
              </td>
              <td className="fs-5">{item.role.name}</td>
              <td className="fs-5">
                <EditUser userData={item} roleState={roleState}/> {" "}
                <DeleteUser userId={item.id} /> {" "}
                <AddProjects userId={item.id}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
}

export default Users;


