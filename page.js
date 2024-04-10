"use client"
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Browse from "./Browse";  
import AddVehicleForm from "./AddvehicleForm";  
import FetchApp from "./fetch";
function page() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Browse />} />  
        <Route path="/Add" element={<AddVehicleForm />} />  
        <Route path="/FetchApp" element={<FetchApp />} />  
        
      </Routes>
    </BrowserRouter>
  );
}

export default page;
