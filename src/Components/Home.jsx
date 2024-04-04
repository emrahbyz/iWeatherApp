import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePosition } from "use-position";
import Weather from "./Weather";
import AsyncSelect from "react-select/async";

const Home = ({ onSearchChange }) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [uvData, setUvData] = useState();
  const { latitude, longitude } = usePosition();
  const [loading, setLoading] = useState(false); // Yüklenme durumunu takip etmek için state
  const [search, SetSearch] = useState(null);

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

  const loadOptions = async (inputValue, callback) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=30000&namePrefix=${inputValue}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "b9d966832emshc05489e89f6a47bp18669bjsn2e32fecf6cfc",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );

      const options = response.data.data.map((city) => {
        // city.name ve city.countryCode değerlerini kontrol et
        const name = city.name || "Şehir İsmi";
        const countryCode = city.countryCode || "Ülke Kodu";

        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name || "Şehir İsmi"} ${
            city.countryCode || "Ülke Kodu"
          }`,
        };
      });

      callback(options); // Seçenekleri geri çağır
    } catch (error) {
      console.error("Şehir veri alırken hata oluştu:", error);
      // Hatayı uygun şekilde ele alın (örneğin, kullanıcıya hata mesajı gösterin)
      callback([]); // Daha fazla yüklemeyi engellemek için boş bir dizi döndürün
    }
    setLoading(false); // İstek tamamlandığında yükleme durumunu false yapın
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

  const handleLocationChange = (searchData) => {
    SetSearch(searchData);
    onSearchChange(searchData);
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
            <div>
              <AsyncSelect
                debounceTimeout={1000}
                loadOptions={loadOptions}
                placeholder="Search location"
                onChange={handleLocationChange}
                value={search}
                isLoading={loading} // isLoading prop'unu ekleyin
              />
            </div>

            {loading && (
              <div className="spinner absolute mr-5">
                <img
                  src="src/images/img/12.png"
                  className="w-[32px] h-[32px] animate-spin animate-infinite "
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div>
        <Weather weather={weather} uvData={uvData} />
      </div>

      {latitude && longitude && (
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
