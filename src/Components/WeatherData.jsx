import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  console.log(import.meta.env.VITE_WEATHER_API);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon=${location}&exclude={part}&appid=${
            import.meta.env.VITE_WEATHER_API
          }`
        );
        setWeatherData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  });

  return <div>WeatherData</div>;
};

export default WeatherData;
