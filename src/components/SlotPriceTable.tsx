import moment from "moment";
import React, { useEffect, useState } from "react";
import EditSlotForm from "./EditSlotForm";
import {
  deleteSlotPriceTable,
  getOverlap,
  addSlotPriceTable,
} from "../methods/method_types";

const SlotPriceTable = () => {
  const rows: {
    id: number;
    startTime: any;
    endTime: any;
    create_at: any;
    update_at: any;
    amount: number;
  }[] = [];

  const [tableData, setTableData] = useState(rows);
  const [istoggle, setIsToggle] = useState(false);
  const [itemId, setItemId] = useState(0);
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    amount: 0,
  });
  const [checked, setChecked] = useState(false);
  const [oldTableData, setOldTableData] = useState(rows);

  const getSlotPriceTable = async () => {
    try {
      const res = await fetch("http://localhost:5000/slotPrice");
      setTableData((await res.json()).data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSlotPriceTable();
  }, []);

  const handleUpdate = (id: number) => {
    setItemId(id);
    setIsToggle(!istoggle);
  };

  const handleDelete = async (id: number) => {
    const res = await deleteSlotPriceTable(id);
    if (res) setTableData(tableData.filter((item) => item.id !== id));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    var flag = false;
    var obj = {
      startTime: new Date(formData.startTime),
      endTime: new Date(formData.endTime),
    };

    if (obj.endTime.toDateString() === obj.startTime.toDateString()) {
      tableData.forEach((item) => {
        var obj1 = {
          startTime: new Date(item.startTime),
          endTime: new Date(item.endTime),
        };
        if (getOverlap(obj, obj1) !== 0) flag = true;
      });
      if (!flag) {
        const res = await addSlotPriceTable(formData);
        if (res) {
          getSlotPriceTable();
          setFormData({
            startTime: "",
            endTime: "",
            amount: 0,
          });
        }
      } else {
        alert("TIME SLOT OVERLAPPING");
        setFormData({
          startTime: "",
          endTime: "",
          amount: 0,
        });
      }
    } else {
      alert("SELECT SLOT IN SAME DATE");
      setFormData({
        startTime: "",
        endTime: "",
        amount: 0,
      });
    }
  };

  const toggleForm = () => {
    setChecked(false);
    getSlotPriceTable();
    setIsToggle(!istoggle);
  };

  const handleChange = (event: any) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSort = () => {
    if (!checked) {
      setChecked(!checked);
      setOldTableData(tableData);

      var tempArr = tableData.map((obj) => ({
        ...obj,
        startTime: new Date(obj.startTime),
      }));

      tempArr.sort(
        (objA, objB) => Number(objA.startTime) - Number(objB.startTime)
      );
      var tempArr1 = tempArr.map((obj) => ({
        ...obj,
        startTime: obj.startTime.toISOString(),
      }));

      setTableData(tempArr1);
    } else {
      setTableData(oldTableData);
      setChecked(!checked);
    }
  };
  return (
    <>
      {!istoggle ? (
        <>
          <form className="form-slotPrice" onSubmit={handleSubmit}>
            <div>
              <label>START TIME</label>
              <input
                type="datetime-local"
                value={formData.startTime}
                name="startTime"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label>END TIME</label>
              <input
                type="datetime-local"
                value={formData.endTime}
                name="endTime"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label>Amount</label>
              <input
                type="number"
                value={formData.amount}
                name="amount"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <button type="submit">ADD NEW SLOT</button>
            </div>
          </form>
        </>
      ) : (
        <EditSlotForm
          id={itemId}
          tableData={tableData}
          toggleForm={toggleForm}
        />
      )}
      <div>
        <div className="sort">
          <label>SORT BY DATE</label>
          <input type="checkbox" checked={checked} onChange={handleSort} />
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th>ID</th>
              <th>START TIME</th>
              <th>END TIME</th>
              <th>CREATED AT</th>
              <th>UPDATED AT</th>
              <th>AMOUNT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 &&
              tableData.map((item: any) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{new Date(item.startTime).toLocaleString()}</td>
                    <td>{new Date(item.endTime).toLocaleString()}</td>
                    <td>{new Date(item.create_at).toLocaleString()}</td>
                    <td>{new Date(item.update_at).toLocaleString()}</td>
                    <td> {item.amount}</td>
                    <td>
                      <button
                        style={{
                          backgroundColor: "rgb(135,206,250)",
                          border: "none",
                        }}
                        onClick={() => handleUpdate(item.id)}
                      >
                        UPDATE
                      </button>
                      &nbsp; &nbsp; &nbsp;
                      <button
                        style={{
                          backgroundColor: "rgb(135,206,250)",
                          border: "none",
                        }}
                        onClick={() => handleDelete(item.id)}
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

export default SlotPriceTable;
