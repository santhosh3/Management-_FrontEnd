import { useState, useContext } from "react";
import { Button, Modal, Popover, OverlayTrigger, Form } from "react-bootstrap";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Trello } from "../../context/Context";
import * as API from "../../../API";
import Select from "react-select";

const popoverHoverFocus = (
  <Popover id="popover-trigger-hover-focus" title="Popover top">
    <div style={{ padding: "0.3rem" }}>Add Members</div>
  </Popover>
);

function AddMembers({ boardId }) {
  const { id } = JSON.parse(localStorage.getItem("user"));
  const { userState, boardDispatch, userDispatch } = useContext(Trello);
  const [show, setShow] = useState(false);
  const [involved, setInvolved] = useState(null);
  const [users, setUsers] = useState([]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = async () => {
    await fetchUsers();
    await showUsers();
    setShow(true);
  };

  // Return all users for drop down
  async function fetchUsers() {
   if(userState.user.length === 0){
    try {
      userDispatch({ type: "FETCH_USER_REQUEST" });
      const { status, data } = await API.getUsers();
      if (status) {
        userDispatch({ type: "FETCH_USER_SUCCESS", payload: data });
        setShow(!show);
      } else {
        userDispatch({ type: "FETCH_USER_FAILURE", payload: data });
      }
    } catch (error) {
      userDispatch({ type: "FETCH_USER_FAILURE", payload: error.message });
    }
   }
  }

  async function showUsers() {
    try {
      const { status, data } = await API.UserForBoard(boardId);
      if(status) {
        setInvolved([...data.data.peopleInvolved.map((x) => x.user)]);
        setShow(!show);
      }
    } catch (error) {
      userDispatch({ type: "FETCH_USER_FAILURE", payload: error.message });
    }
  }

  let add = (
    <OverlayTrigger
      trigger={["focus", "hover"]}
      placement="right"
      overlay={popoverHoverFocus}
    >
      <button style={{ border: "none", background: "none" }}>
        <IoIosArrowDroprightCircle size={30} />
      </button>
    </OverlayTrigger>
  );

  let options = userState.user.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const customStyles = "";
  
  function selectUsers(data) {
    setUsers({ users: data });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(users.users.length > 0){
       try {
        let {status, data} = await API.UserForBoardUpdate(boardId,users.users.map(x => x.value));
        if(status) { 
          alert("Successfully added Users")
        } 
       } catch (error) {
        alert(error)
       }
    }
  }
  console.log(involved,userState.user);

  return (
    <>
      <div onClick={handleShow}>{add}</div>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Members</Modal.Title>
        </Modal.Header>
        <div style={{margin:"1rem 1rem 0 1rem", display: "flex", flexDirection: "column" }}>
          {involved !== null && (
            <div style={{display:"flex", flexDirection:"row", gap:"2%"}}>
              {involved.map((x) => (
                <p style={{ border: "1px solid black",padding:"4px",borderRadius:"5px" }}>{x.name}</p>
              ))}
            </div>
          )}
        </div>
        <Modal.Body>
          <Form onSubmit={handleSubmit} autoComplete="false">
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Select Users</Form.Label>
              <Select
                defaultValue= {
                  (involved !== null) && involved?.map((user) => ({ value: user.id, label: user.name }))
                }
                isMulti
                name="colors"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? "grey" : "black",
                  }),
                }}
                options={options}
                // components={{value}}
                // value={"d"}
                // classNames={{
                //     control: (state) =>
                //       state.isFocused ? 'border-red-600' : 'border-grey-300',
                //   }}

                // className="basic-multi-select"
                classNamePrefix="select"
                style={customStyles}
                // onChange={(e) => setUsers({ users: e })}
                onChange={selectUsers}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddMembers;
