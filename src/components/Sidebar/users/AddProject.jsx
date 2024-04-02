import { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Trello } from "../../../context/Context";
import * as API from "../../../../API";
import Select from "react-select";

function AddProjects({userId}) {
  const { id } = JSON.parse(localStorage.getItem("user"));
  const { boardState, userState, boardDispatch, userDispatch } =
    useContext(Trello);
  const [show, setShow] = useState(false);
  const [involved, setInvolved] = useState(null);
  const [board, setBoards] = useState([]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = async () => {
    await showBoards();
    await showProjects();
    setShow(true);
  };
 
  // Return all boards for dropDown
  async function showBoards() {
    if (boardState.board.length === 0) {
      try {
        boardDispatch({ type: "FETCH_BOARD_REQUEST" });
        let { status, data } = await API.getAllBoards();
        if (status) {
          boardDispatch({ type: "FETCH_BOARD_SUCCESS", payload: data });
        } else {
          boardDispatch({ type: "FETCH_BOARD_FAILURE", payload: data });
        }
      } catch (error) {
        boardDispatch({ type: "FETCH_BOARD_FAILURE", payload: error.message });
      }
    }
  }

  //showing projects for that perticular user
  async function showProjects() {
    try {
      const { status, data } = await API.BoardForUser(userId);
      if (status) {
        setInvolved([...data.BoardsInvolved.map((x) => x.board)]);
        setShow(!show);
      }
    } catch (error) {
      userDispatch({ type: "FETCH_USER_FAILURE", payload: error.message });
    }
  }

  let options = boardState.board.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const customStyles = "";

  function selectBoards(data) {
    setBoards({ boards: data });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (board.boards.length > 0) {
      try {
        let { status, data } = await API.BoardForUserUpdate(
          userId,
          board.boards.map((x) => x.value)
        );
        if (status) {
          console.log("Successfully added Projects");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <Button onClick={handleShow}>Add Project</Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Projects</Modal.Title>
        </Modal.Header>
        <div
          style={{
            margin: "1rem 1rem 0 1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {involved !== null && (
            <div style={{ display: "flex", flexDirection: "row", gap: "2%",flexWrap:"wrap" }}>
              {involved.map((x) => (
                <p
                  style={{
                    border: "1px solid black",
                    padding: "4px",
                    borderRadius: "5px",
                  }}
                >
                  {x.name}
                </p>
              ))}
            </div>
          )}
        </div>
        <Modal.Body>
          <Form onSubmit={handleSubmit} autoComplete="false">
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Select Projects</Form.Label>
              <Select
                defaultValue={
                  involved !== null &&
                  involved?.map((user) => ({
                    value: user.id,
                    label: user.name,
                  }))
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
                onChange={selectBoards}
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

export default AddProjects;
