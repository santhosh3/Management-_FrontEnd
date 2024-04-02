import React, { useEffect, useState, useContext } from "react";
import * as API from "../../../API";
import { Trello } from "../../context/Context";
import Board from "./Board";
import "./style.css";
import Modal from "./Modal";
import Loader from "../Loader";
import Navbar from "../Navbar";
import { Button } from "react-bootstrap";
import { FaAngleDown } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { FaAngleUp } from "react-icons/fa";

function Boards() {
  const { boardState, boardDispatch } = useContext(Trello);
  const [edit, setEdit] = useState(boardState.board);
  
  const fetchData = async () => {
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
  };
  useEffect(() => {
    fetchData();
  }, [boardDispatch]);

  const { loading, board, error } = boardState;

  if (loading) return <Loader />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  function EditMembers(id) {
    let data = edit.map((item) => {
      if (item.id === id || item.arrow === true) {
        return { ...item, arrow: !item.arrow };
      }
      return { ...item, arrow: item.arrow };
    });
    setEdit(data);
  }


  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="container-projects">
        <div>
          <h3>Projects</h3>
        </div>
        <div>
          <Modal />
        </div>
      </div>
      <div className="boards">
        {/* <div className="workplace">
          <div className="fl">
            {board
              .sort((a, b) => a.id - b.id)
              .map((board, index) => (
                <div className="subboard">
                  <button
                    className="addMembers"
                    onClick={() => EditMembers(board.id)}
                  >
                    <div>{board.name}</div>
                    <div>
                      {edit.find((x) => x.id == board.id)?.arrow ? (
                        <FaAngleUp />
                      ) : (
                        <FaAngleDown />
                      )}
                    </div>
                  </button>
                  {edit.find((x) => x.id == board.id)?.arrow && (
                    <div>
                      <div>
                       <BsPeopleFill /> Members
                      </div>
                      <div></div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div> */}
        <div className="container-board">
          {board
            .sort((a, b) => a.id - b.id)
            .map((board, index) => (
              <Board key={board.id} board={board} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Boards;
