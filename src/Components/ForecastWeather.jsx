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

  const getWeatherIcon = (
    isNight,
    weatherDescription,
    minTemperature,
    maxTemperature
  ) => {
    const lowerDescription = weatherDescription.toLowerCase();

    if (isNight) {
      // Gece için ikonlar
      if (lowerDescription.includes("clear sky")) {
        return "src/images/icons/sun.png";
      } else if (lowerDescription.includes("few clouds")) {
        return "src/images/icons/icon2.png";
      } else if (lowerDescription.includes("scattered clouds")) {
        return "src/images/icons/night-clouds.png";
      } else if (lowerDescription.includes("broken clouds")) {
        return "src/images/icons/night-cloud.png";
      } else if (lowerDescription.includes("overcast clouds")) {
        return "src/images/icons/sun-little-cloud.png";
      } else if (lowerDescription.includes("rain")) {
        return "src/images/icons/night-rain.png";
      } else if (lowerDescription.includes("heavy rain")) {
        return "src/images/icons/night-rain.png";
      } else if (lowerDescription.includes("thunderstorm")) {
        return "src/images/icons/Thunder.png";
      } else if (lowerDescription.includes("snow")) {
        return "src/images/icons/Lsnow.png";
      } else if (lowerDescription.includes("light rain")) {
        return "src/images/icons/rain.png";
      } else if (lowerDescription.includes("shower rain")) {
        return "src/images/icons/rain.png";
      } else if (lowerDescription.includes("moderate rain")) {
        return "src/images/icons/rain-sun.png";
      } else if (lowerDescription.includes("heavy shower rain")) {
        return "src/images/icons/rain-sun.png";
      } else if (lowerDescription.includes("thunderstorm with heavy rain")) {
        return "src/images/icons/Turnado.png";
      } else if (lowerDescription.includes("cold")) {
        return "src/images/icons/Lsnow.png";
      } else {
        return "src/images/icons/sun.png"; // Diğer durumlar için varsayılan gündüz ikonu
      }
    } else {
      // Gündüz için ikonlar
      if (lowerDescription.includes("clear sky")) {
        return "src/images/icons/sun.png";
      } else if (lowerDescription.includes("few clouds")) {
        // Sıcaklık aralığına göre ikon seçimi
        if (maxTemperature >= 25) {
          return "src/images/icons/sun.png"; // 25 dereceden büyükse güneş ikonu
        } else if (maxTemperature >= 20 && maxTemperature < 25) {
          return "src/images/icons/sun-little-cloud.png"; // 20-25 arasıysa bulutlu güneş ikonu
        } else {
          return "src/images/icons/cloud.png"; // Diğer durumlar için bulut ikonu
        }
      } else if (lowerDescription.includes("scattered clouds")) {
        return "src/images/icons/cloud-sun.png";
      } else if (lowerDescription.includes("broken clouds")) {
        return "src/images/icons/cloud-sun.png";
      } else if (lowerDescription.includes("overcast clouds")) {
        return "src/images/icons/sun-little-cloud.png";
      } else if (lowerDescription.includes("rain")) {
        return "src/images/icons/rain.png";
      } else if (lowerDescription.includes("heavy rain")) {
        return "src/images/icons/rain.png";
      } else if (lowerDescription.includes("thunderstorm")) {
        return "src/images/icons/Thunder.png";
      } else if (lowerDescription.includes("snow")) {
        return "src/images/icons/Lsnow.png";
      } else if (lowerDescription.includes("light rain")) {
        return "src/images/icons/rain.png";
      } else if (lowerDescription.includes("shower rain")) {
        return "src/images/icons/rain";
      } else if (lowerDescription.includes("moderate rain")) {
        return "src/images/icons/rain-sun.png";
      } else if (lowerDescription.includes("heavy shower rain")) {
        return "src/images/icons/rain-sun.png";
      } else if (lowerDescription.includes("thunderstorm with heavy rain")) {
        return "src/images/icons/Turnado.png";
      } else if (lowerDescription.includes("cold")) {
        return "src/images/icons/Lsnow.png";
      } else {
        return "src/images/icons/sun.png"; // Diğer durumlar için varsayılan gündüz ikonu
      }
    }
  };

  // Weather verileri ve ikon yolunu almak için kullanım
  const currentHour = new Date().getHours();
  const isNight = currentHour < 6 || currentHour >= 20;
  const minTemperature = weatherData.list[0].main.temp_min;
  const maxTemperature = weatherData.list[0].main.temp_max;
  const weatherDescription = weatherData.list[0].weather[0].description;

  const iconPath = getWeatherIcon(
    isNight,
    weatherDescription,
    minTemperature,
    maxTemperature
  );

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
  const visibilityInMeters = weatherData.list[0].visibility;
  const firstTwoDigits = visibilityInMeters.toString().slice(0, 2);
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

                <div className="absolute  bottom-0 mb-4 flex flex-col gap-4 p-1 ">
                  <p className="font-extrabold text-5xl ">
                    {weatherData.list[0].main.temp.toFixed(0)}ºc
                  </p>
                  <div className="flex flex-col ">
                    <p className="font-bold text-[16px] text-white">
                      {weatherData.list[0].main.temp_min.toFixed(0)}ºc
                      <span>
                        {" "}
                        / {weatherData.list[0].main.temp_max.toFixed(0)}ºc
                      </span>
                    </p>

                    <p className="text-sm font-normal ">
                      {capitalizeFirstLetter(
                        weatherData.list[0].weather[0].description
                      )}
                    </p>
                  </div>
                </div>
                <div className="w-80 h-80 mt-20 ml-40    ">
                  <img
                    className="w-[130px]   animate-spin-pulse ease-in-out"
                    src={iconPath}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex font-bold h-[292px] flex-col gap-2 py-1 px-4 rounded-xl w-[359px] bg-gray-800">
            <div className="">
              <div className="flex justify-between border-b border-b-gray-700 py-4 h-[56px]  ">
                <div className="flex gap-3 ">
                  <ThermometerSimple size={24} />

                  <p className="font-bold text-blue-thin ">Thermal sensation</p>
                </div>
                <div>
                  <p className="font-bold">
                    {" "}
                    {weatherData.list[0].main.feels_like.toFixed(0)}ºc
                  </p>
                </div>
              </div>
              <div className="flex  justify-between border-b border-b-gray-700 py-4 h-[56px] ">
                <div className="flex gap-3 ">
                  <CloudRain size={24} />

                  <p className="font-bold text-blue-thin ">
                    Probability of rain
                  </p>
                </div>
                <div> {weatherData.list[0].pop}%</div>
              </div>
              <div className="flex  justify-between border-b border-b-gray-700 py-4 h-[56px] ">
                <div className="flex gap-3 ">
                  <Wind size={24} />

                  <p className="font-bold text-blue-thin ">Wind speed</p>
                </div>
                <div>
                  <p>{Math.floor(weatherData.list[0].wind.speed)} km/h</p>
                </div>
              </div>
              <div className="flex  justify-between border-b border-b-gray-700 py-4  h-[56px]">
                <div className="flex gap-3 ">
                  <Drop size={24} />

                  <p className="font-bold text-blue-thin ">Air humidity</p>
                </div>
                <div>
                  {" "}
                  <p>{weatherData.list[0].main.humidity}%</p>
                </div>
              </div>
              <div className="flex  justify-between  py-4  h-[56px]">
                <div className="flex gap-3 ">
                  <Sun size={24} />

                  <p className="font-bold text-blue-thin ">Visibility </p>
                </div>
                <p>{firstTwoDigits} km</p>
              </div>
            </div>
          </div>
          <div className="  flex  h-[176px] w-[359px] rounded-xl bg-gray-800 items-center justify-center">
            <div className="ml-3 flex">
              <div className="w-[67px] h-[152px]  flex  flex-col  items-center justify-center gap-1">
                <p className="font-bold text-[14px] text-blue-thin">
                  {daysOfWeek[currentDayIndex].slice(0, 3)}
                </p>
                <div className="w-[56px] h-[56px] flex justify-center items-center">
                  <img
                    className="animate-spin-pulse ease-in-out"
                    src={iconPath}
                    alt=""
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-1100  text-[14px]">
                    {weatherData.list[0].main.temp_min.toFixed(0)}ºc
                  </p>
                  <p className="font-bold text-gray-400 text-[14px]">
                    {weatherData.list[0].main.temp_max.toFixed(0)}ºc
                  </p>
                </div>
              </div>
              <div className="w-[67px] h-[152px] flex  flex-col  items-center justify-center gap-1">
                <p className="font-bold text-[14px] text-blue-thin">
                  {daysOfWeek[oneDay].slice(0, 3)}
                </p>
                <div className="w-[56px] h-[56px] flex justify-center items-center">
                  <img
                    className="animate-spin-pulse ease-in-out"
                    src={iconPath}
                    alt=""
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-1100  text-[14px]">
                    {weatherData.list[1].main.temp_min.toFixed(0)}ºc
                  </p>
                  <p className="font-bold text-gray-400 text-[14px]">
                    {weatherData.list[1].main.temp_max.toFixed(0)}ºc
                  </p>
                </div>
              </div>
              <div className="w-[67px] h-[152px] flex  flex-col  items-center justify-center gap-1">
                <p className="font-bold text-[14px] text-blue-thin">
                  {daysOfWeek[twoDay].slice(0, 3)}
                </p>
                <div className="w-[56px] h-[56px] flex justify-center items-center">
                  <img
                    className="animate-spin-pulse ease-in-out"
                    src={iconPath}
                    alt=""
                  />
                </div>

                <div>
                  <p className="font-bold text-gray-1100  text-[14px]">
                    {weatherData.list[2].main.temp_min.toFixed(0)}ºc
                  </p>
                  <p className="font-bold text-gray-400 text-[14px]">
                    {weatherData.list[2].main.temp_max.toFixed(0)}ºc
                  </p>
                </div>
              </div>
              <div className="w-[67px] h-[152px] flex  flex-col  items-center justify-center gap-1">
                <p className="font-bold text-[14px] text-blue-thin">
                  {daysOfWeek[threeDay].slice(0, 3)}
                </p>
                <div className="w-[56px] h-[56px] flex justify-center items-center">
                  <img
                    className=" animate-spin-pulse ease-in-out"
                    src={iconPath}
                    alt=""
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-1100  text-[14px]">
                    {weatherData.list[3].main.temp_min.toFixed(0)}ºc
                  </p>
                  <p className="font-bold text-gray-400 text-[14px]">
                    {weatherData.list[3].main.temp_max.toFixed(0)}ºc
                  </p>
                </div>
              </div>
              <div className="w-[67px] h-[152px] flex  flex-col  items-center justify-center gap-1">
                <p className="font-bold text-[14px] text-blue-thin">
                  {daysOfWeek[fourDay].slice(0, 3)}
                </p>
                <div className="w-[56px] h-[56px] flex justify-center items-center">
                  <img
                    className=" animate-spin-pulse ease-in-out"
                    src={iconPath}
                    alt=""
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-1100  text-[14px]">
                    {weatherData.list[4].main.temp_min.toFixed(0)}ºc
                  </p>
                  <p className="font-bold text-gray-400 text-[14px]">
                    {weatherData.list[4].main.temp_max.toFixed(0)}ºc
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default ForecastWeather;
