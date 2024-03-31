import React from "react";

const Weather = ({ weather }) => {
  if (!weather) {
    return <p>Yükleniyor...</p>;
  }

  console.log(weather);
  return (
    <div className=" ">
      <div className="h-[100vh] mt-6 bg-gray-900  ">
        <h3> {weather.name} </h3>
        <h4> {weather.weather.map((data) => data.description).join(", ")} </h4>
        <p> {weather.main.temp.toFixed(0)} C </p>
        <p>{new Date(weather.dt * 1000).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Weather;
