import React from "react";
import Home from "./Components/Home";
import "./App.css";

import "./index.css";
const App = () => {
  return (
    <div
      className="global-background font-nunito  text-white flex-col h-[1100px] overflow-x-hidden  bg-cover bg-center flex"
      style={{ backgroundImage: "url('/images/img/img11.png')" }}
    >
      <Home />
    </div>
  );
};

export default App;
