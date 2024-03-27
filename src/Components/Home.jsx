import React from "react";

const Home = () => {
  return (
    <div
      className="text-white w-full h-[100vh] bg-cover bg-center flex  justify-center "
      style={{ backgroundImage: "url('src/images/img/img11.png')" }}
    >
      <div className="flex items-center justify-center w-[940px] h-[37px] mt-[48px]  opacity-80   ">
        <div className="w-[620px] h-[32px] flex items-center justify-center gap-2  bg-cover  ">
          <img
            className="w-[80px]   center h-["
            src="src/images/icons/Vector.png"
            alt=""
          />

          <p className="text-5xl">iWeather </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
