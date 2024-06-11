import React from "react";
import { Button } from "react-bootstrap";
import CreateBoard from "../../../utils/Modal";
import CreateForm from "../../../utils/FormBody";
import { useDispatch, useSelector } from "react-redux";
import { ProjectCreate } from "../../FormValues";
import { addNewProjects } from "./projectSlice";
import "./Project.css";

function CreateProject() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);
  const [project, setProject] = React.useState({ name: "", image: "" });
  const [addRequestStatus, setAddRequestStatus] = React.useState("idle");

  function closeModal() {
    setProject({ name: "", image: "" });
    setModalShow(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", project.name);
    if (project.image !== null) {
      formData.append("file", project.image);
    }
    try {
      console.log(project);
      dispatch(addNewProjects(formData)).unwrap();
      setProject({ name: "", image: "" });
    } catch (error) {
      console.log(error);
    } finally {
      setModalShow(false);
      setAddRequestStatus("idle");
    }
  };

  const body = (
    <React.Fragment>
      {ProjectCreate.map((item) => (
        <div key={item.id}>
          {<CreateForm form={item} project={project} setProject={setProject} />}
        </div>
      ))}
    </React.Fragment>
  );

  const createButton = (
    <CreateBoard
      title="Create Project"
      size="md"
      show={modalShow}
      open={() => setModalShow(true)}
      body={body}
      handlesubmit={handleSubmit}
      onHide={closeModal}
    />
  );

  return (
    <div className="container-create-Project">
      <div className="fs-3">Create Project</div>
      <div>{createButton}</div>
    </div>
  );
}

export default CreateProject;
