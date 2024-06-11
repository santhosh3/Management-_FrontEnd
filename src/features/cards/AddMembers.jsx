import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { selectAllUsers } from "../users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAllStories } from "./storiesSlice";
import { selectProjectById } from "../projects/projectSlice";
import { Button, Modal, Form } from "react-bootstrap";
import { updateUserToProject } from "../projects/projectSlice";

function AddMembers() {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  let projectUsers = useSelector((state) =>
    selectProjectById(state, projectId)
  );
  const userState = useSelector(selectAllUsers);

  const users = projectUsers?.peopleInvolved?.map((item, index) => ({
    id: item?.id,
    name: item?.name,
    present: true,
    button: <>&#10060;</>,
  }));
  const [user, setUser] = useState(users);

  async function removeUsers(id) {
    setUser(
      user?.map((item) =>
        item?.id === id ? { ...item, present: false } : item
      )
    );
  }

  projectUsers = userState.map((el) => {
    let data = user?.find((x) => x?.id === el?.id);
    if (data) {
      return { ...el, present: !data.present };
    } else {
      return { ...el, present: true };
    }
  });

  const body = (
    <div className="container-projects">
      {user?.map((item, index) => (
        <>
          {item.present && (
            <div className="container-project">
              {item?.name}
              <span
                className="delete-icon"
                onClick={() => removeUsers(item.id)}
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

  const [selectUser, setSelectUser] = React.useState([]);
  const [text, setText] = useState("");

  function selectText(e) {
    setText(e.target.value);
    if (e.target.value.length === 0) {
      setSelectUser([]);
    } else {
      setSelectUser(
        projectUsers.filter(
          (item) =>
            item.present === true &&
            item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      );
    }
  }

  function selectedValue(val) {
    let find = user?.find((x) => x.id == val.id);
    if (find) {
      let data = user.map((item) =>
        item.id === val.id
          ? { ...item, present: true, button: <>&#10060;</> }
          : item
      );
      setUser(data);
      setText("");
      setSelectUser([]);
    } else {
      setUser([...user, { ...val, present: true, button: <>&#10060;</> }]);
      setText("");
      setSelectUser([]);
    }
  }

  function handleSave(e) {
    try {
      const userIds = user
        ?.filter((el) => el.present === true)
        ?.map((el) => el?.id);
      console.log(projectId,users)
      dispatch(updateUserToProject({ projectId,userIds })).unwrap();
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  }

  const form = (
    <div>
      <Form.Control
        type="text"
        placeholder="Add Members"
        value={text}
        onChange={(e) => selectText(e)}
      />
      <div className="drop-down-maincontainer">
        {selectUser.map((item, index) => (
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

  let modal = (
    <>
      <Button className="delete-user-button" onClick={handleShow}>
        Add Member
      </Button>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add/Remove Members</Modal.Title>
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

  return modal;
}

export default AddMembers;
