import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePosition } from "use-position";
import Weather from "./Weather";

const Home = ({ onSearchChange }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [uvData, setUvData] = useState();
  const { latitude, longitude } = usePosition();
  const [loading, setLoading] = useState(false); // Yüklenme durumunu takip etmek için state
  const [search, setSearch] = useState(null);
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

  const getUvData = async (lat, lon) => {
    const key = import.meta.env.VITE_WEATHER_API_1;
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${key}`
      );
      setUvData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      getWeatherData(latitude, longitude);
      getUvData(latitude, longitude);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (city) {
        fetchData();
      }
    }, 1000); // 500 milisaniye bekleyin, ardından isteği gönderin

    return () => clearTimeout(delayTimer); // Önceki zamanlayıcıyı temizle
  }, [city]);

  const fetchData = async () => {
    const key = import.meta.env.VITE_WEATHER_API_2;

    try {
      setLoading(true); // İstek başladığında yüklenme durumunu true yap
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`
      );
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 404) {
        // API'den dönen hata durumunu kontrol ediyoruz
        // 404 hatası alındığında kullanıcıya uygun bir mesaj gösterebiliriz
        alert("Lütfen geçerli bir şehir adı girin.");
      }
    }
    setLoading(false);
  };
  const handleLocationChange = (event) => {
    const { value } = event.target;
    setCity(value);
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
              value={city}
              onChange={handleLocationChange}
            />
            {loading && <div className="spinner">test</div>}
          </div>
        </div>
      )}

      <div>
        <Weather weather={weather} uvData={uvData} />
      </div>

      {weatherData && latitude && longitude && (
        <div className="flex items-center absolute right-0 mr-12 justify-end mt-8">
          <input
            className="text-gray-1100 font-normal w-[450px] bg-gray-1000 h-[64px] px-5 rounded-lg border-none outline-none placeholder"
            type="text"
            placeholder="Search location"
            value={city}
            onChange={handleLocationChange}
          />
          {loading && (
            <div className="w-10 h-9 text-white">
              {" "}
              <p>test</p>
            </div> // Yükleme durumu true ise spinner göstergesi göster
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
