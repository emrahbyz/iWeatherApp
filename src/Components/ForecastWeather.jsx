import React from "react";
import {
  IconContext,
  ThermometerSimple,
  CloudRain,
  Wind,
  Drop,
  Sun,
} from "phosphor-react";

const ForecastWeather = ({ weatherData }) => {
  if (!weatherData) {
    return <p>Yükleniyor...</p>;
  }

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDayIndex = new Date().getDay();
  const oneDay = (currentDayIndex + 1) % 7;
  const twoDay = (currentDayIndex + 2) % 7;
  const threeDay = (currentDayIndex + 3) % 7;
  const fourDay = (currentDayIndex + 4) % 7;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <IconContext.Provider
      value={{
        color: "#3B3B54",
        size: 24,
      }}
    >
      <div className="w-[1340px] mt-6 h-[840px] flex flex-col mx-auto   items-start bg-gray-500 ">
        <div className="grid  grid-row-2 gap-2">
          <div className="bg-gray-800 flex items-center rounded-xl justify-center p-1 w-[359px] h-[328px]   ">
            <div
              className="w-[335px] h-[304px] rounded-xl relative "
              style={{
                background: "url('src/images/img/img7.png')",
                backgroundSize: "cover",
              }}
            >
              <div className="w-[295px] h-[41px] mt-5 ml-5 flex gap-[2px] flex-col  ">
                <p className="font-bold  text-[16px]">
                  {weatherData.city.name},
                  <span> {weatherData.city.country}</span>
                </p>

                <p className="text-xs font-normal">
                  {formatDate(weatherData.list[0].dt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default ForecastWeather;
