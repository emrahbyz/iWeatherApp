import React, { useState } from "react";
import Home from "./Home";
import axios from "axios";

const CitySuggestions = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const handleLocationChange = async (searchData) => {
    setLoading(true); // İstek başladığında yüklenme durumunu true yap

    const key = import.meta.env.VITE_WEATHER_API_2;

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`
      );
      setCurrentWeather({ city: searchData.label, ...data });
      console.log(data);
    } catch (error) {
      console.log(error.message);
      if (error.response && error.response.status === 404) {
        alert("Lütfen geçerli bir şehir adı girin.");
      } else {
        alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <Home onSearchChange={handleLocationChange} />
      {loading && <p>Loading...</p>}
      {currentWeather && (
        <div>
          <h2>{currentWeather.city}</h2>
          {/* Diğer hava durumu verilerini burada kullanabilirsiniz */}
        </div>
      )}
    </div>
  );
};

export default CitySuggestions;
