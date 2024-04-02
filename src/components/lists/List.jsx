import React, {useContext} from "react";
import { Card } from "react-bootstrap";
import "./style.css";
import * as API from "../../../API";
import Modal from "../cards/AddCardListBoard";
// import CardDetails from "../cards/CardDetails";
import { useDrop } from "react-dnd";
import EditCardModal from "../cards/EditCardModal";
import { Trello } from "../../context/Context";

function List({ list, id, card }) {
  card = Object.values(card);

  const { listDispatch } = useContext(Trello);

  const [{isOver}, drop] = useDrop(() => ({
    accept : "task",
    drop : (item) => addItemToSection(item.card),
    collect : (monitor) => ({
      isOver : !!monitor.isOver()
    }),
  }));

  async function addItemToSection(cardData){
    if(cardData.listId !== list.id){
      let {status, data} = await API.updateCard(cardData.id, {"listId" : list.id});
      if(status){
        listDispatch({ type: "DELETE_CARD", payload: cardData });
        listDispatch({ type: "CREATE_CARD", payload: data });
      } 
    } 
  }


  return (
    <Card
      ref={drop}
      border="gray"
      className="p-1 m-3 text-white rounded-3 fs-5"
      style={{ width: "20rem", background: "rgb(16,18,4)" }}
    >
      <Card.Header as="h5">{list.name}</Card.Header>
      <Card.Body style={{ maxHeight: "22rem", overflowY: "scroll"}}>
        {Array.isArray(card) || card?.length > 0 || card !== undefined
          ? card.map((item) => (
              <div className="cards" key={item.id}>
                <EditCardModal card={item} table={false} />
              </div>
            ))
          : null}
        <Modal title={list.name} id={id} />
      </Card.Body>
    </Card>
  );
}

export default List;
