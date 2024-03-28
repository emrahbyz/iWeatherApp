import React from "react";
import Home from "./Components/Home";
import "./App.css";
import WeatherData from "./Components/WeatherData";
const App = () => {
  return (
    <div className="font-nunito text-xl font-bold">
      <Home />
      <WeatherData />
    </div>
  );
};

export default App;
