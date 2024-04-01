import React from "react";

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

  console.log(weather);
  return (
    <div className="w-[1340px] mt-6 h-[840px] flex flex-col mx-auto gap-4  items-start bg-gray-500">
      <div className="grid  grid-row-2 gap-4">
        <div className="bg-gray-800 flex items-center rounded-xl justify-center p-1 w-[359px] h-[328px]   text-white">
          <div
            className="w-[335px] h-[304px] rounded-xl "
            style={{
              background: "url('src/images/img/img7.png')",
              backgroundSize: "cover",
            }}
          >
            <div className="w-[295px] h-[41px] mt-5 ml-5 flex gap-[2px] flex-col">
              <p className="font-bold  text-[16px]">
                {weather.city.name},<span> {weather.city.country}</span>
              </p>
              <p className="text-xs font-normal">
                <p>{formatDate(weather.list[0].dt)}</p>
              </p>
              <h4>
                {/* {weather.weather.map((data) => data.description).join(", ")} */}
              </h4>
              {/* <p>{weather[0].main.temp.toFixed(0)} C</p> */}

              {/* <p>{new Date(weather.dt * 1000).toLocaleDateString()}</p> */}
            </div>
          </div>
        </div>
        <div className="text-md mt-2 flex font-bold h-[292px] w-[359px] bg-gray-800">
          {/* <p> {weather[0].main.temp.toFixed(0)} C </p> */}
          {/* <p>{new Date(weather.dt * 1000).toLocaleDateString()}</p> */}
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
