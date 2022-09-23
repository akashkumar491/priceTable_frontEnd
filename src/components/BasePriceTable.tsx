import React, { useEffect, useState } from "react";

const BasePriceTable = () => {
  const rows: {}[] = [];

  const [tableData, setTableData] = useState(rows);

  const getBasePriceTable = async () => {
    const res = await fetch("http://localhost:5000/basePrice");

    // const table = (await res.json()).data;
    // var x = JSON.parse(JSON.stringify(table));
    //console.log(x, "6767");

    //console.log(table, "8989");

    setTableData((await res.json()).data);
    // console.log(tableData, "666");
  };

  const handleSubmit = () => {
    // event.preventDefault();
  };

  useEffect(() => {
    getBasePriceTable();
  }, []);

  console.log(tableData, "111");

  const handleUpdate = () => {};
  const handleDelete = () => {};
  return (
    <>
      <form className="form-basePrice" onSubmit={handleSubmit}>
        <label>Enter Amount</label>
        <input type="number" />
        <button type="submit">SUBMIT</button>
      </form>
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
                    <td>{item.amount}</td>
                    <td> {item.amount}</td>
                    <td>{item.create_at}</td>
                    <td>{item.update_at}</td>
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
