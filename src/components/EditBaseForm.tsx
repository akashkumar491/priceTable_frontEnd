import React, { useState } from "react";
import { updateBasePriceTable } from "../methods/method_types";

type appProps = {
  table: { id: number; amount: number; create_at: any; update_at: any }[];
  toggleForm: (amount: number) => void;
};
const EditBaseForm = (props: appProps) => {
  const [amt, setAmt] = useState(props.table[0].amount);

  const handleUpdateSubmit = async (event: any) => {
    event.preventDefault();
    const res = await updateBasePriceTable(props.table[0].id, { amount: amt });
    if (res) props.toggleForm(amt);
  };

  return (
    <form className="form-basePrice" onSubmit={handleUpdateSubmit}>
      <label>Enter Amount</label>
      <input
        type="number"
        value={amt}
        onChange={(event) => setAmt(parseInt(event.target.value))}
      />
      <button type="submit">UPDATE</button>
    </form>
  );
};

export default EditBaseForm;
