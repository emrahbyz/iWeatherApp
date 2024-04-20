import React from "react";
import Home from "./Components/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div
      className="font-nunito  text-white flex-col h-[1100px] overflow-x-hidden  bg-cover bg-center flex"
      style={{ backgroundImage: "url('src/images/img/img11.png')" }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="test" element={<CitySuggestions />} /> */}
      </Routes>
    </div>
  );
};

export default App;
