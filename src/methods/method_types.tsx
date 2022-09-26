import moment from "moment";

const deleteSlotPriceTable = async (id: number) => {
  console.log(id);
  try {
    const res = await fetch(`http://localhost:5000/deleteSlotPrice/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) return true;
  } catch (err) {
    console.log(err);
  }
};

const getOverlap = (a: any, b: any) => {
  return Math.max(
    0,
    Math.min(a.endTime.getTime(), b.endTime.getTime()) -
      Math.max(a.startTime.getTime(), b.startTime.getTime())
  );
};
const deleteBasePriceTable = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:5000/deleteBasePrice/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) return true;
  } catch (err) {
    console.log(err);
  }
};

const addBasePriceTable = async (obj: any) => {
  try {
    const res = await fetch("http://localhost:5000/addBasePrice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (res.status === 200) return true;
  } catch (err) {
    console.log(err);
  }
};

const updateBasePriceTable = async (id: number, obj: any) => {
  try {
    const res = await fetch(`http://localhost:5000/updateBasePrice/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (res.status === 200) return true;
  } catch (error) {
    console.log(error);
  }
};

const addSlotPriceTable = async (addObj: any) => {
  var alteredObj = {
    startTime: moment(new Date(addObj.startTime)).format("YYYY-MM-DD HH:mm:ss"),
    endTime: moment(new Date(addObj.endTime)).format("YYYY-MM-DD HH:mm:ss"),
    amount: addObj.amount,
  };
  try {
    const res = await fetch("http://localhost:5000/addSlotPrice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alteredObj),
    });
    if (res.status === 200) return true;
    // getSlotPriceTable();
    // setFormData({
    //   startTime: "",
    //   endTime: "",
    //   amount: 0,
    // });
  } catch (err) {
    console.log(err);
  }
};

const updateSlotPriceTable = async (id: number, updateObj: any) => {
  var alteredObj = {
    startTime: moment(new Date(updateObj.startTime)).format(
      "YYYY-MM-DD HH:mm:ss"
    ),
    endTime: moment(new Date(updateObj.endTime)).format("YYYY-MM-DD HH:mm:ss"),
    amount: updateObj.amount,
  };

  try {
    const res = await fetch(`http://localhost:5000/updateSlotPrice/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alteredObj),
    });

    if (res.status === 200) return true;
    // props.toggleForm();
  } catch (error) {
    console.log(error);
  }
};

export {
  deleteSlotPriceTable,
  getOverlap,
  deleteBasePriceTable,
  addBasePriceTable,
  updateBasePriceTable,
  addSlotPriceTable,
  updateSlotPriceTable,
};
