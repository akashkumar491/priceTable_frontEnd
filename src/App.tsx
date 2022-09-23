import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasePriceTable from "./components/BasePriceTable";
import SlotPriceTable from "./components/SlotPriceTable";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="basePrice" element={<BasePriceTable />} />
        <Route path="slotPrice" element={<SlotPriceTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
