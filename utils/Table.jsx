import React from "react";
import { Table } from "react-bootstrap";

function RenderTable({ data, borderd=true }) {
  const keys = Object?.keys(data[0]);
  return (
    <div className="p-2">
      <Table
        className="table table-borderless"
        striped={borderd}
        bordered={borderd}
        hover={borderd}
        variant={borderd ? "secondary" : ''}
      >
        <thead>
          <tr>
            {keys.map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <td key={key} className="fs-5">
                  {item[key] ? item[key] : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RenderTable;
