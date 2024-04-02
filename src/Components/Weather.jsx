import React from "react";
import { Smiley, Heart, Horse } from "@phosphor-icons/react";
const Weather = ({ weather }) => {
  if (!weather) {
    return <p>Yükleniyor...</p>;
  }
  // const temperature = weatherData.main.temp.toFixed(0); // Sıcaklık değerini al ve ondalıklı kısmı temizle
  // console.log(temperature); // 279

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

  console.log(weather);
  return (
    <div className="w-[1340px] mt-6 h-[840px] flex flex-col mx-auto gap-4  items-start bg-gray-500 text-white">
      <div className="grid  grid-row-2 gap-4">
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
                {weather.city.name},<span> {weather.city.country}</span>
              </p>
              <p className="text-xs font-normal">
                <p>{formatDate(weather.list[0].dt)}</p>
              </p>
              <div className="absolute  bottom-0 mb-4 flex flex-col gap-4 p-1 ">
                <p className="font-extrabold text-5xl ">
                  {weather.list[0].main.temp.toFixed(0)}ºc
                </p>
                <div className="flex flex-col ">
                  <p className="font-bold text-[16px] text-white">
                    {weather.list[0].main.temp_min.toFixed(0)}ºc
                    <span> / {weather.list[0].main.temp_max.toFixed(0)}ºc</span>
                  </p>

                  <p className="text-sm font-normal ">
                    {capitalizeFirstLetter(
                      weather.list[0].weather[0].description
                    )}
                  </p>
                </div>
              </div>
              <div className="w-80 h-80 mt-20 ml-40    ">
                <img
                  className="w-[130px]   animate-spin-pulse ease-in-out"
                  src="src/images/icons/icon7.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-md mt-2 flex font-bold h-[292px] flex-col gap-3 p-3 rounded-xl w-[359px] bg-gray-800">
          {/* <p> {weather[0].main.temp.toFixed(0)} C </p> */}
          {/* <p>{new Date(weather.dt * 1000).toLocaleDateString()}</p> */}
          <p>
            <Smiley size={32} /> test
          </p>
        </div>
        <div className="text-md mt-2 flex font-bold h-[176px] w-[359px] bg-gray-800">
          {/* <p> {weather[0].main.temp.toFixed(0)} C </p> */}
          {/* <p>{new Date(weather.dt * 1000).toLocaleDateString()}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Weather;
