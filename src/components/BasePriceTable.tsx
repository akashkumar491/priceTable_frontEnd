import React, { useEffect, useState } from "react";
import EditBaseForm from "./EditBaseForm";
import {
  deleteBasePriceTable,
  addBasePriceTable,
} from "../methods/method_types";

const BasePriceTable = () => {
  const rows: { id: number; amount: number; create_at: any; update_at: any }[] =
    [];

  const [tableData, setTableData] = useState(rows);
  const [istoggle, setIsToggle] = useState(false);
  const [amt, setAmt] = useState("");

  const getBasePriceTable = async () => {
    try {
      const res = await fetch("http://localhost:5000/basePrice");
      setTableData((await res.json()).data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const res = await addBasePriceTable({ amount: amt });
    if (res) {
      getBasePriceTable();
      setAmt("");
    }
  };

  useEffect(() => {
    getBasePriceTable();
  }, []);

  const handleUpdate = () => {
    setIsToggle(!istoggle);
  };

  const toggleForm = (e: number) => {
    getBasePriceTable();
    setIsToggle(!istoggle);
  };

  const handleDelete = async () => {
    const res = await deleteBasePriceTable(tableData[0].id);
    if (res) setTableData(rows);
  };
  return (
    <>
      {!istoggle ? (
        <form className="form-basePrice" onSubmit={handleSubmit}>
          <label>Enter Amount</label>
          <input
            type="number"
            value={amt}
            onChange={(event) => setAmt(event.target.value)}
          />
          <button type="submit" disabled={tableData.length > 0}>
            ADD AMOUNT
          </button>
        </form>
      ) : (
        <EditBaseForm table={tableData} toggleForm={toggleForm} />
      )}
      <div>
        <table className="tbl">
          <thead>
            <tr>
              <th>ID</th>
              <th>AMOUNT</th>
              <th>CREATED AT</th>
              <th>UPDATED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 &&
              tableData.map((item: any) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td> {item.amount}</td>
                    <td>{new Date(item.create_at).toLocaleString()}</td>
                    <td>{new Date(item.update_at).toLocaleString()}</td>
                    <td>
                      <button
                        style={{
                          backgroundColor: "rgb(135,206,250)",
                          border: "none",
                        }}
                        onClick={() => handleUpdate()}
                      >
                        UPDATE
                      </button>
                      &nbsp; &nbsp; &nbsp;
                      <button
                        style={{
                          backgroundColor: "rgb(135,206,250)",
                          border: "none",
                        }}
                        onClick={() => handleDelete()}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BasePriceTable;
