import React from "react";
import Home from "./Components/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Weather from "./Components/Weather";
import Test from "./Components/Test";

const App = () => {
  return (
    <div
      className="font-nunito  text-white flex-col w-full    bg-cover bg-center flex h-[100vh]"
      style={{ backgroundImage: "url('src/images/img/img11.png')" }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="test" element={<Test />} />
      </Routes>
    </div>
  );
};

export default App;
