import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGeolocated } from "react-geolocated";
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
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const getWeatherData = async (lat, lon) => {
    const key = "d16e0fdb04c783725d72d62dbcf2cdeb";
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
      );
      setWeather(data);
    } catch (error) {
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
  }, 450);

  const getUvData = async (lat, lon) => {
    const key = "2aa0acfd5af988d38859e9da0d1a82b3";

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

  const fetchData = async (selectedCityName) => {
    if (!selectedCityName || selectedCityName.trim() === "") {
      return;
    }

    setLoading(true);
    const key = "a20fe70bfed32fb8b78981b8e25b5027";

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCityName}&appid=${key}&units=metric`
      );
      setWeatherData(data);
      setSelectedCity({
        name: selectedCityName,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    } catch (error) {
      console.log(error.message);
      if (error.response && error.response.status === 404) {
        alert("Lütfen geçerli bir şehir adı girin.");
      } else {
        alert("Hava durumu verileri alınamadı.");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      getWeatherData(coords.latitude, coords.longitude);
      getUvData(coords.latitude, coords.longitude);
      setSelectedCity({
        name: "Istanbul", // Varsayılan olarak İstanbul seçildi
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
    fetchData();
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);

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
      className={`text-white flex-col w-full bg-gray-900 h-[100vh] bg-cover bg-center flex ${
        coords ? "bg-gray-900" : ""
      }`}
    >
      <div className="mt-[36px] opacity-80">
        <div className="flex items-center justify-center gap-2">
          <img className="w-[65px]" src="/images/icons/Vector.png" alt="" />
          <p className="text-3xl lg:text-4xl xl:text-5xl">iWeather</p>
        </div>
      </div>

      {!selectedCity &&
        (!coords || (isGeolocationAvailable && !isGeolocationEnabled)) && (
          <div className="flex flex-col items-center justify-center mt-28 gap-2">
            <p className="text-text-base font-bold md:text-2xl">
              Welcome to <span className="text-blue-light">TypeWeather</span>
            </p>
            <p className="text-base md:text-xl text-gray-300 font-normal">
              Choose a location to see the weather forecast
            </p>
            <div className="flex items-center justify-end mt-8">
              <div className="w-72 sm:w-96">
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
                    src="/images/img/12.png"
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

      {(selectedCity || coords) && (
        <div className="flex items-center absolute right-0 p-4 mr-4 xl:mr-16 justify-end mt-[68px] 2xl:mt-8">
          <div className="w-72 sm:w-80">
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
                src="/images/img/12.png"
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
