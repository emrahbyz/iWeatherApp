import React from "react";
import Home from "./Components/Home";
import "./App.css";

import "./index.css";
const App = () => {
  return (
    <div className="global-background font-nunito bg-gray-600  text-white flex-col h-[1100px] overflow-x-hidden  bg-cover bg-center flex">
      <Home />
    </div>
  );
};

export default App;
