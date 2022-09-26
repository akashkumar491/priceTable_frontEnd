import React, { useEffect, useState } from "react";
import moment from "moment";
import { getOverlap, updateSlotPriceTable } from "../methods/method_types";

type appProps = {
  id: number;
  tableData: {
    id: number;
    startTime: any;
    endTime: any;
    create_at: any;
    update_at: any;
    amount: number;
  }[];
  toggleForm: () => void;
};

const EditSlotForm = (props: appProps) => {
  const [updateItem, setUpdateItem] = useState({
    startTime: "",
    endTime: "",
    amount: 0,
  });

  const getUpdateItem = () => {
    var arr = props.tableData.filter((item) => item.id === props.id);
    setUpdateItem((prev) => ({
      ...prev,
      startTime: moment(new Date(arr[0].startTime)).format("YYYY-MM-DDTkk:mm"),
      endTime: moment(new Date(arr[0].endTime)).format("YYYY-MM-DDTkk:mm"),
      amount: arr[0].amount,
    }));
  };

  const handleChange = (event: any) => {
    setUpdateItem((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // const updateSlotPriceTable = async (updateObj: any) => {
  //   var alteredObj = {
  //     startTime: moment(new Date(updateObj.startTime)).format(
  //       "YYYY-MM-DD HH:mm:ss"
  //     ),
  //     endTime: moment(new Date(updateObj.endTime)).format(
  //       "YYYY-MM-DD HH:mm:ss"
  //     ),
  //     amount: updateObj.amount,
  //   };

  //   try {
  //     const res = await fetch(
  //       `http://localhost:5000/updateSlotPrice/${props.id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(alteredObj),
  //       }
  //     );

  //     props.toggleForm();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    var flag = false;
    var obj = {
      startTime: new Date(updateItem.startTime),
      endTime: new Date(updateItem.endTime),
    };

    if (obj.endTime.toDateString() === obj.startTime.toDateString()) {
      props.tableData.forEach((item) => {
        var obj1 = {
          startTime: new Date(item.startTime),
          endTime: new Date(item.endTime),
        };

        if (item.id !== props.id) if (getOverlap(obj, obj1) !== 0) flag = true;
      });

      if (!flag) {
        const res = await updateSlotPriceTable(props.id, updateItem);
        if (res) props.toggleForm();
      } else alert("SLOT IS OVERLAPPING");
    } else {
      alert("SELECT SLOT IN SAME DATE ");
    }
  };

  useEffect(() => {
    getUpdateItem();
  }, []);
  return (
    <form className="form-slotPrice" onSubmit={handleSubmit}>
      <div>
        <label>START TIME</label>
        <input
          type="datetime-local"
          value={updateItem.startTime}
          name="startTime"
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <label>END TIME</label>
        <input
          type="datetime-local"
          value={updateItem.endTime}
          onChange={handleChange}
          name="endTime"
        ></input>
      </div>
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={updateItem.amount}
          name="amount"
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <button type="submit">UPDATE</button>
      </div>
    </form>
  );
};

export default EditSlotForm;
