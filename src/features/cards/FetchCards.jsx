import React from "react";
import { selectAllStories } from "./storiesSlice";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import './Cards.css'


function FetchCards() {
  const stories = useSelector(selectAllStories);

  let lists = {
    1: "To-Do",
    2: "Doing",
    3: "Done",
    4: "Finished"
  };
  let contentObj = {
    "To-Do": [],
    Doing: [],
    Done: [],
    Finished: []
  };
  const object = stories.reduce((acc = {}, el) => {
    const status = lists[el.status];
    acc[status] ? acc[status].push(el) : (acc[status] = [el]);
    return acc;
  }, {});
  let mainCode = Object.entries({ ...contentObj, ...object }).map(
    (item, index) => (
      <Card
        key={index}
        border="gray"
        className="p-1 m-3 text-white rounded-3 fs-5"
        style={{ width: "20rem", background: "rgb(16,18,4)" }}
      >
        <Card.Header as="h5">{item[0]}</Card.Header>
        <Card.Body
          style={{
            maxHeight: "22rem",
            overflowY: "scroll",
            overflow: "hidden",
          }}
        >
          {Array.isArray(item[1]) || item[1].length > 0 || item[1] !== undefined
            ? item[1].map((el) => (
                <CollectStories stories={el}/>
              ))
            : null}
        </Card.Body>
      </Card>
    )
  );
  return <div className="list-container">{mainCode}</div>;
}

function CollectStories({story}) {
  return (
   <div>
     kk
   </div>
  )
}
export default FetchCards;
