import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePosition } from "use-position";
import Weather from "./Weather";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState();
  const { latitude, longitude } = usePosition();

  const getWeatherData = async (lat, lon) => {
    const key = import.meta.env.VITE_WEATHER_API;
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
      );
      setWeather(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    latitude && longitude && getWeatherData(latitude, longitude);
  }, [latitude, longitude]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${
            location.lat
          }&lon=${location.lon}&exclude=${location}&appid=${
            import.meta.env.VITE_WEATHER_API
          }`
        );

        setWeatherData(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    if (location) {
      fetchData();
    }
  }, [location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div
      className={`text-white flex-col w-full h-[100vh] bg-cover bg-center flex ${
        latitude && longitude ? "bg-gray-900" : ""
      }`}
      style={{
        backgroundImage: `url(${
          latitude && longitude ? "" : "src/images/img/img11.png"
        })`,
      }}
    >
      <div className=" mt-[36px]  opacity-80   ">
        <div className="flex items-center justify-center gap-2   ">
          <img className="w-[65px]" src="src/images/icons/Vector.png" alt="" />
          <p className="text-5xl">iWeather </p>
        </div>
      </div>
      {(!latitude || !longitude) && (
        <div className="flex flex-col items-center   justify-center mt-52 gap-2">
          <p className="text-2xl font-bold ">
            Welcome to <span className="text-blue-light">TypeWeather</span>
          </p>
          <p className="text-xl text-gray-300 font-normal">
            Choose a location to see the weather forecast
          </p>
          <div className="flex items-center justify-end mt-8">
            <input
              className="text-gray-1100 font-normal w-[450px] bg-gray-1000 h-[64px] px-5 rounded-lg border-none outline-none placeholder"
              type="text"
              placeholder="Search location"
              value={location}
              onChange={handleLocationChange}
            />
          </div>
        </div>
      )}
      {weatherData && <div>test</div>}
      {latitude && longitude && (
        <div className="flex items-center absolute right-0 mr-12 justify-end mt-8">
          <input
            className="text-gray-1100 font-normal w-[450px] bg-gray-1000 h-[64px] px-5 rounded-lg border-none outline-none placeholder"
            type="text"
            placeholder="Search location"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
      )}
      <div>
        <Weather weather={weather} />
      </div>
    </div>
  );
};

export default Home;
