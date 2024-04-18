import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePosition } from "use-position";
import Weather from "./Weather";
import debounce from "debounce-promise";
import ForecastWeather from "./ForecastWeather";
import AsyncSelect from "react-select/async";
import EventDetails from "./EventDetails";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [uvData, setUvData] = useState(null);
  const { latitude, longitude } = usePosition();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const getWeatherData = async (lat, lon) => {
    const key = import.meta.env.VITE_WEATHER_API;
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
      );
      setWeather(data);
    } catch (error) {
      console.log(error);
      console.log("Hava Durumu Verisi Alınamadı:", error);
    }
  };

  const handleCitySelect = (selectedOption) => {
    if (selectedOption) {
      const selectedCityName = selectedOption.label.split("-")[0].trim();
      setSelectedCity({
        name: selectedCityName,
        latitude: selectedOption.value.split(" ")[0],
        longitude: selectedOption.value.split(" ")[1],
      });
    }
  };

  const loadOptions = debounce(async (inputValue, callback) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=60000&namePrefix=${inputValue}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "b9d966832emshc05489e89f6a47bp18669bjsn2e32fecf6cfc",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );

      const options = response.data.data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name || "Şehir İsmi"} - ${
          city.countryCode || "Ülke Kodu"
        }`,
      }));

      callback(options);
    } catch (error) {
      console.error("Şehir veri alırken hata oluştu:", error);
      callback([]);
    }
    setLoading(false);
  }, 400);

  const getUvData = async (lat, lon) => {
    const key = import.meta.env.VITE_WEATHER_API_1;

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${key}`
      );

      console.log("UV verisi alındı:", data);
      setUvData(data);
    } catch (error) {
      console.error("UV verisi alınamadı:", error);
    }
  };

  const fetchData = async (selectedCity) => {
    if (!selectedCity || selectedCity.trim() === "") {
      return;
    }

    setLoading(true);
    const key = import.meta.env.VITE_WEATHER_API_2;

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${key}&units=metric`
      );
      setWeatherData(data);
      setSelectedCity({
        name: "Istanbul",
        latitude,
        longitude,
      });
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 404) {
        alert("Lütfen geçerli bir şehir adı girin.");
      } else {
        alert("Hava durumu verileri alınamadı.");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (latitude && longitude) {
      getWeatherData(latitude, longitude);
      getUvData(latitude, longitude);
      setSelectedCity({
        name: "Istanbul",
        latitude,
        longitude,
      });
    }
    fetchData();
  }, [latitude, longitude]);

  const handleLocationChange = async (selectedOption) => {
    if (selectedOption) {
      const selectedCityName = selectedOption.label.split("-")[0].trim();
      setCity(selectedCityName);

      try {
        await fetchData(selectedCityName);
        handleCitySelect(selectedOption);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    }
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
      <div className="mt-[36px] opacity-80">
        <div className="flex items-center justify-center gap-2">
          <img className="w-[65px]" src="src/images/icons/Vector.png" alt="" />
          <p className="text-5xl">iWeather</p>
        </div>
      </div>
      {(!latitude || !longitude) && (
        <div className="flex flex-col items-center justify-center mt-52 gap-2">
          <p className="text-2xl font-bold">
            Welcome to <span className="text-blue-light">TypeWeather</span>
          </p>
          <p className="text-xl text-gray-300 font-normal">
            Choose a location to see the weather forecast
          </p>
          <div className="flex items-center justify-end mt-8">
            <div>
              <AsyncSelect
                debounceTimeout={1000}
                loadOptions={loadOptions}
                placeholder="Search location"
                onChange={handleLocationChange}
                value={search}
                isLoading={loading}
              />
            </div>
            {loading && (
              <div className="spinner absolute mr-5">
                <img
                  src="src/images/img/12.png"
                  className="w-[32px] h-[32px] animate-spin animate-infinite"
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div>
        <Weather weather={weather} uvData={uvData} weatherData={weatherData} />
        <ForecastWeather weatherData={weatherData} />
        <EventDetails selectedCity={selectedCity} />
      </div>

      {latitude && longitude && (
        <div className="flex items-center absolute right-0 mr-16 justify-end mt-8">
          <div>
            <AsyncSelect
              className="select"
              debounceTimeout={1000}
              loadOptions={loadOptions}
              placeholder="Search location"
              onChange={handleLocationChange}
              value={search}
              isLoading={loading}
            />
          </div>
          {loading && (
            <div className="spinner absolute mr-5">
              <img
                src="src/images/img/12.png"
                className="w-[32px] h-[32px] animate-spin animate-infinite"
                alt=""
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
