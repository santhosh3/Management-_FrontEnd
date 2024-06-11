import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdOutlineGroupAdd } from "react-icons/md";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserById, updateProjectToUser } from "./userSlice";
import { Form } from "react-bootstrap";
import { selectAllProjects } from "../projects/projectSlice";
import "./Users.css";

function AddMember({ userId }) {
  const [show, setShow] = useState(false);
  let Allprojects = useSelector(selectAllProjects);
  const dispatch = useDispatch();
  const handleShow = () => setShow(true);
  const data = useSelector((state) => selectUserById(state, userId));
  const projects = data?.BoardsInvolved?.map((item, index) => ({
    id: item?.id,
    name: item?.name,
    present: true,
    button: <>&#10060;</>,
  }));
  let [project, setProject] = React.useState(projects);

  function handleClose() {
    try {
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProjects(id) {
    setProject(
      project?.map((item) =>
        item?.id === id
          ? { ...item, present: false, button: <>&#10006;</> }
          : item
      )
    );
  }

  Allprojects = Allprojects.map((el) => {
    let data = project?.find((x) => x?.id === el?.id);
    if (data) {
      return { ...el, present: !data.present };
    } else {
      return { ...el, present: true };
    }
  });

  const body = (
    <div className="container-projects">
      {project?.map((item, index) => (
        <>
          {item.present && (
            <div className="container-project">
              {item?.name}
              <span
                className="delete-icon"
                onClick={() => removeProjects(item.id)}
              >
                {" "}
                {item?.button}{" "}
              </span>
            </div>
          )}
        </>
      ))}
    </div>
  );

  const [selectProject, setSelectProject] = React.useState([]);
  const [text, setText] = useState("");

  function handleSave(e) {
    e.preventDefault();
    try {
      const projects = project
        ?.filter((el) => el.present === true)
        ?.map((el) => el?.id);
      dispatch(updateProjectToUser({ userId, projects })).unwrap();
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  }

  function selectText(e) {
    setText(e.target.value);
    if (e.target.value.length === 0) {
      setSelectProject([]);
    } else {
      setSelectProject(
        Allprojects.filter(
          (item) =>
            item.present === true &&
            item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      );
    }
  }

  let selectedValue = (val) => {
    let find = project?.find((x) => x.id == val.id);
    if (find) {
      let data = project.map((item) =>
        item.id === val.id
          ? { ...item, present: true, button: <>&#10060;</> }
          : item
      );
      setProject(data);
      setText("");
      setSelectProject([]);
    } else {
      setProject([
        ...project,
        { ...val, present: true, button: <>&#10060;</> },
      ]);
      setText("");
      setSelectProject([]);
    }
  };

  let form = (
    <div>
      <Form.Control
        type="text"
        placeholder="Add Projects"
        value={text}
        onChange={(e) => selectText(e)}
      />
      <div className="drop-down-maincontainer">
        {selectProject.map((item, index) => (
          <div
            key={index}
            className="drop-down-container"
            onClick={() => selectedValue(item)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="delete-user-button" onClick={handleShow}>
        <MdOutlineGroupAdd />
      </div>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add/Remove Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body}
          {form}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="success" onClick={(e) => handleSave(e)}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddMember;
