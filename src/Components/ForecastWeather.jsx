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

  const getWeatherIconsForFiveDays = (weatherData) => {
    const dayIcons = [
      "src/images/icons/sun.png",
      "src/images/icons/sun-little-cloud.png",
      "src/images/icons/cloud-sun.png",
      "src/images/icons/rain.png",
      "src/images/icons/snow.png",
    ];

    const nightIcons = [
      "src/images/icons/night-sun.png",
      "src/images/icons/night-clouds.png",
      "src/images/icons/night-cloud.png",
      "src/images/icons/night-rain.png",
      "src/images/icons/snow.png",
    ];

    const icons = [];

    // 5 günlük hava durumu verilerini döngü ile kontrol et
    for (let i = 0; i < 5; i++) {
      const weatherDescription = weatherData.list[i].weather[0].description;
      const currentHour = new Date(weatherData.list[i]).getHours();
      const isNight = currentHour < 6 || currentHour >= 20;

      let iconPath = "src/images/icons/sun-little-cloud.png"; // Varsayılan simge

      if (isNight) {
        // Gece için simgeler
        if (weatherDescription.includes("clear sky")) {
          iconPath = nightIcons[0];
        } else if (weatherDescription.includes("few clouds")) {
          iconPath = nightIcons[1];
        } else if (weatherDescription.includes("scattered clouds")) {
          iconPath = nightIcons[2];
        } else if (weatherDescription.includes("rain")) {
          iconPath = nightIcons[3];
        } else if (weatherDescription.includes("snow")) {
          iconPath = nightIcons[4];
        }
      } else {
        // Gündüz için simgeler
        if (weatherDescription.includes("clear sky")) {
          iconPath = dayIcons[0];
        } else if (weatherDescription.includes("few clouds")) {
          iconPath = dayIcons[1];
        } else if (weatherDescription.includes("scattered clouds")) {
          iconPath = dayIcons[2];
        } else if (weatherDescription.includes("rain")) {
          iconPath = dayIcons[3];
        } else if (weatherDescription.includes("snow")) {
          iconPath = dayIcons[4];
        }
      }

      // İkon ve hava durumu açıklamasını bir nesne olarak ekle
      icons.push({ iconPath, weatherDescription });
    }

    return icons;
  };

  // Örnek kullanım: 5 günlük hava durumu verilerinden ikonları almak
  const weatherIcons = getWeatherIconsForFiveDays(weatherData);
  console.log(weatherIcons);

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
                    src={weatherIcons[0].iconPath} // İlk gün için ikon yolunu al
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
                    src={weatherIcons[1].iconPath} // İlk gün için ikon yolunu al
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
                    src={weatherIcons[0].iconPath} // İlk gün için ikon yolunu al
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
                    src={weatherIcons[2].iconPath} // İlk gün için ikon yolunu al
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
                    src={weatherIcons[3].iconPath} // İlk gün için ikon yolunu al
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
                    src={weatherIcons[4].iconPath} // İlk gün için ikon yolunu al
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
