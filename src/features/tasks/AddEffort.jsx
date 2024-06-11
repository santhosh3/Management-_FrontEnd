import React from "react";
import { useSelector } from "react-redux";
import EffortTaskModal from "../../../utils/Modal";
import { selectTaskById } from "./taskSlice";
import { TbClock2 } from "react-icons/tb";
import { Modal } from "react-bootstrap";
import EffortTable from "../../../utils/Table";
import "./Tasks.css";

function AddEffort({ taskId }) {
  const data = useSelector((state) => selectTaskById(state, taskId));
  const [modalShow, setModalShow] = React.useState(false);
  const [data1, setData] = React.useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
    } catch (error) {
      console.log(error);
    } finally {
      setModalShow(false);
    }
  };

  const today = new Date();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(today.getDate() - 2);
  const formattedDate = threeDaysAgo.toISOString().split("T")[0];
  let elementsForEffort = [
    {
      date: (
        <input
        //  className="type_number"
          min={formattedDate}
          max={today.toISOString().split("T")[0]}
          type="date"
          onChange={(e) =>
            setData({
              ...data1,
              workedDate: new Date(e.target.value).toISOString(),
            })
          }
          defaultValue={today.toISOString().split("T")[0]}
        />
      ),
      cost: (
        <input
         // className="type_number"
          onChange={(e) => setData({ ...data1, costTime: e.target.value })}
          type="number"
          min={0}
        />
      ),
      note: (
        <textarea
          cols={30}
          onChange={(e) => setData({ ...data1, description: e.target.value })}
          rows={3}
        />
      ),
    },
  ];


  const body = <EffortTable data={elementsForEffort} borderd={false} />;
  const content = (
    <EffortTaskModal
      icon={[<TbClock2 />, "delete-user-button"]}
      title={data.name}
      size="lg"
      show={modalShow}
      open={() => setModalShow(true)}
      body={body}
      handlesubmit={handleSubmit}
      onHide={() => setModalShow(false)}
    />
  );
  return content;
}

export default AddEffort;
