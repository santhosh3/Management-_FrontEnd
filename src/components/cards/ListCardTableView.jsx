import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import EditCardModal from "./EditCardModal";
import { Parser } from 'html-to-react';

function ListCardTableView({ list }) {
  const [dark,setDark] = React.useState(false);
  const issueType = {
    1: "Epic",
    2: "Story",
    3: "Task",
    4: "Bug",
  };
  return (
    <div className="p-2">
      <Button onClick={() => setDark(!dark)}>D/L</Button>
      <Table
        responsive
        className="mt-1"
        striped
        bordered
        hover
        variant={dark ? "dark" : "light"}
      >
        <thead>
          <tr>
            <th>Card</th>
            <th>Description</th>
            <th>CreatedBy</th>
            <th>AssignedBy</th>
            <th>FinishedBy</th>
            <th>ClosedBy</th>
            <th>AssignedTo</th>
            <th>Priority</th>
            <th>IssueType</th>
            <th>StartDate</th>
            <th>EndDate</th>
            <th>List</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(list).map((list) =>
            Object.values(list.card).map((card) => (
              <tr key={card.id}>
                <td className="fs-5">{card.name}</td>
                <td className="fs-5">{Parser().parse(card.description)}</td>
                <td className="fs-5">{card?.createdBy?.name ?? ""}</td>
                <td className="fs-5">{card?.assignedBy?.name ?? ""}</td>
                <td className="fs-5">{card?.finishedBy?.name ?? ""}</td>
                <td className="fs-5">{card?.closedBy?.name ?? ""}</td>
                <td className="fs-5">{card?.assignedTo?.name ?? ""}</td>
                <td className="fs-5">{card?.priority ?? ""}</td>
                <td className="fs-5">
                  {card?.issueType ? issueType[card?.issueType] : ""}
                </td>
                <td style={{ fontSize: "12px" }}>
                  {card?.startDate
                    ? new Date(card.startDate).toISOString().substring(0, 10)
                    : ""}
                </td>
                <td style={{ fontSize: "12px" }}>
                  {card?.endDate
                    ? new Date(card.endDate).toISOString().substring(0, 10)
                    : ""}
                </td>
                <td className="fs-5">{list.name}</td>
                <td>
                  <EditCardModal card={card} table={true} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default ListCardTableView;
