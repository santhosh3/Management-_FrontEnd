import React, { useState, useEffect, useContext } from "react";
import List from "./List";
import { Trello } from "../../context/Context";
import * as API from "../../../API";
import { useParams } from "react-router-dom";
import "./style.css";
import defImage from "../../assets/defImage.jpeg";
import AddListModal from "./Modal";
import { Button, Image, Popover, OverlayTrigger } from "react-bootstrap";
import Loader from "../Loader";
import ListCardTableView from "../cards/ListCardTableView";
import AddCardListTable from "../cards/AddCardListTable";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import AddMembers from "./AddMembers";
import { IoIosArrowDroprightCircle } from "react-icons/io";

// const popoverHoverFocus = (
//   <Popover id="popover-trigger-hover-focus" title="Popover top">
//     <div style={{ padding: "0.3rem" }}>Add Members/Edit Project</div>
//   </Popover>
// );

function Lists() {
  let { boardId } = useParams();
  let [view, Setview] = useState(false);
  let [sidebar, setSidebar] = useState(false);
  let [board, setBoard] = useState({
    name: "",
    image: "",
  });
  function setAddMembers() {
    setSidebar(!sidebar);
  }
  const { listState, listDispatch } = useContext(Trello);

  async function getListById(id) {
    try {
      listDispatch({ type: "FETCH_LIST_REQUEST" });
      let { status, data } = await API.getLists(id);
      if (status) {
        listDispatch({ type: "FETCH_LIST_SUCCESS", payload: data.list });
        setBoard({ name: data["name"], image: data["image"] });
      } else {
        listDispatch({ type: "FETCH_LIST_FAILURE", payload: data });
      }
    } catch (error) {
      listDispatch({ type: "FETCH_LIST_FAILURE", payload: error.message });
    }
  }

  useEffect(() => {
    getListById(boardId);
  }, [listDispatch]);

  const { loading, list, error } = listState;

  if (loading) return <Loader />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="wrap">
      <div style={{ width: "100%", height: "100%" }}>
        <Image
          className="image"
          alt=""
          src={board.image ?? defImage}
          style={{ width: "100%", height: "100%", objectFit: "repeat" }}
        />
      </div>
      <div className="list-wrapper">
        <div className="container-list">
          <div>
            <h3>{board.name}</h3>
          </div>
          <div>
            <h3>
              <Button onClick={() => Setview(true)}>Table View</Button>{" "}
              <Button onClick={() => Setview(false)}>Board View</Button>
            </h3>
          </div>
          <div>
            {!view ? (
              <AddListModal
                boardId={boardId}
                buttonName_create={"Add list"}
                list_data={list}
              />
            ) : (
              <div>
                <AddListModal
                  boardId={boardId}
                  buttonName_create={"Add list"}
                  list_data={list}
                />{" "}
                {"  "}
                <AddCardListTable list_data={list} />
              </div>
            )}
          </div>
        </div>
        {!view ? (
          <div
          // className={sidebar ? 'peopeClose' : 'projectAdd'}
          >
            {/* <div
              onClick={() => setAddMembers()}
              style={{ cursor: "pointer", width: "20%" }}
            > */}
              <AddMembers boardId={boardId}/>
            {/* </div> */}
            <div>
              <DndProvider backend={HTML5Backend}>
                <div className="list-container">
                  {Object.values(list).map((list, index) => (
                    <div key={index}>
                      <List list={list} id={list.id} card={list.card} />
                    </div>
                  ))}
                </div>
              </DndProvider>
            </div>
          </div>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <div>
              <ListCardTableView list={list} />
            </div>
          </DndProvider>
        )}
      </div>
    </div>
  );
}

export default Lists;
