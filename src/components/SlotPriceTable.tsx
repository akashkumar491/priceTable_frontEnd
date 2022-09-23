import React from "react";

const SlotPriceTable = () => {
  return (
    <>
      <form className="form-slotPrice">
        <div>
          <label>START TIME</label>
          <input type="datetime-local"></input>
        </div>
        <div>
          <label>END TIME</label>
          <input type="datetime-local"></input>
        </div>
        <div>
          <label>Amount</label>
          <input type="number"></input>
        </div>
        <div>
          <button type="submit">SUBMIT</button>
        </div>
      </form>
      <div>
        <table className="tbl">
          <thead>
            <tr>
              <th>ID</th>
              <th>START TIME</th>
              <th>END TIME</th>
              <th>CREATED AT</th>
              <th>UPDATED AT</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default SlotPriceTable;
