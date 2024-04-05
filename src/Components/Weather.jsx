// import React from "react";
// import {
//   IconContext,
//   ThermometerSimple,
//   CloudRain,
//   Wind,
//   Drop,
//   Sun,
// } from "phosphor-react";

// const Weather = ({ weather, uvData, weatherData }) => {
//   if (!weather) {
//     return <p>Yükleniyor...</p>;
//   }
//   if (!uvData) {
//     return <p>UV verisi yükleniyor...</p>;
//   }

//   console.log(weather.data);
//   const daysOfWeek = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   const currentDayIndex = new Date().getDay();
//   const oneDay = (currentDayIndex + 1) % 7;
//   const twoDay = (currentDayIndex + 2) % 7;
//   const threeDay = (currentDayIndex + 3) % 7;
//   const fourDay = (currentDayIndex + 4) % 7;

//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp * 1000);
//     const options = {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     };
//     return date.toLocaleDateString("en-US", options);
//   };
//   function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
//   }

//   console.log(weather);
//   return (
//     <IconContext.Provider
//       value={{
//         color: "#3B3B54",
//         size: 24,
//       }}
//     >
//       <div className="w-[1340px] mt-6 h-[840px] flex flex-col mx-auto   items-start bg-gray-500 ">
//         <div className="grid  grid-row-2 gap-2">
//           <div className="bg-gray-800 flex items-center rounded-xl justify-center p-1 w-[359px] h-[328px]   ">
//             <div
//               className="w-[335px] h-[304px] rounded-xl relative "
//               style={{
//                 background: "url('src/images/img/img7.png')",
//                 backgroundSize: "cover",
//               }}
//             >
//               <div className="w-[295px] h-[41px] mt-5 ml-5 flex gap-[2px] flex-col  ">
//                 <p className="font-bold  text-[16px]">
//                   {weather.city.name}
//                   <span> {weather.city.country}</span>
//                 </p>

//                 <p className="text-xs font-normal">
//                   {formatDate(weather.list[0].dt)}
//                 </p>

//                 <div className="absolute  bottom-0 mb-4 flex flex-col gap-4 p-1 ">
//                   <p className="font-extrabold text-5xl ">
//                     {weather.list[0].main.temp.toFixed(0)}ºc
//                   </p>
//                   <div className="flex flex-col ">
//                     <p className="font-bold text-[16px] text-white">
//                       {weather.list[0].main.temp_min.toFixed(0)}ºc
//                       <span>
//                         {" "}
//                         / {weather.list[0].main.temp_max.toFixed(0)}ºc
//                       </span>
//                     </p>

//                     <p className="text-sm font-normal ">
//                       {capitalizeFirstLetter(
//                         weather.list[0].weather[0].description
//                       )}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="w-80 h-80 mt-20 ml-40    ">
//                   <img
//                     className="w-[130px]   animate-spin-pulse ease-in-out"
//                     src="src/images/icons/icon7.png"
//                     alt=""
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex font-bold h-[292px] flex-col gap-2 py-1 px-4 rounded-xl w-[359px] bg-gray-800">
//             <div className="">
//               <div className="flex justify-between border-b border-b-gray-700 py-4 h-[56px]  ">
//                 <div className="flex gap-3 ">
//                   <ThermometerSimple size={24} />

//                   <p className="font-bold text-blue-thin ">Thermal sensation</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">
//                     {" "}
//                     {weather.list[0].main.feels_like.toFixed(0)}ºc
//                   </p>
//                 </div>
//               </div>
//               <div className="flex  justify-between border-b border-b-gray-700 py-4 h-[56px] ">
//                 <div className="flex gap-3 ">
//                   <CloudRain size={24} />

//                   <p className="font-bold text-blue-thin ">
//                     Probability of rain
//                   </p>
//                 </div>
//                 <div> {weather.list[0].pop}%</div>
//               </div>
//               <div className="flex  justify-between border-b border-b-gray-700 py-4 h-[56px] ">
//                 <div className="flex gap-3 ">
//                   <Wind size={24} />

//                   <p className="font-bold text-blue-thin ">Wind speed</p>
//                 </div>
//                 <div>
//                   <p>{Math.floor(weather.list[0].wind.speed)} km/h</p>
//                 </div>
//               </div>
//               <div className="flex  justify-between border-b border-b-gray-700 py-4  h-[56px]">
//                 <div className="flex gap-3 ">
//                   <Drop size={24} />

//                   <p className="font-bold text-blue-thin ">Air humidity</p>
//                 </div>
//                 <div>
//                   {" "}
//                   <p>{weather.list[0].main.humidity}%</p>
//                 </div>
//               </div>
//               <div className="flex  justify-between  py-4  h-[56px]">
//                 <div className="flex gap-3 ">
//                   <Sun size={24} />

//                   <p className="font-bold text-blue-thin ">UV Index</p>
//                 </div>
//                 <div> {Math.floor(uvData?.value)} </div>
//               </div>
//             </div>
//           </div>
//           <div className="  flex  h-[176px] w-[359px] rounded-xl bg-gray-800 items-center justify-center">
//             <div className="ml-3 flex">
//               <div className="w-[67px] h-[152px]  flex  flex-col  items-center justify-center gap-1">
//                 <p className="font-bold text-[14px] text-blue-thin">
//                   {daysOfWeek[currentDayIndex].slice(0, 3)}
//                 </p>
//                 <div className="w-[56px] h-[56px] flex justify-center items-center">
//                   <img
//                     className="animate-spin-pulse ease-in-out"
//                     src="src/images/icons/sun clouds-1.png"
//                     alt=""
//                   />
//                 </div>
//                 <div>
//                   <p className="font-bold text-gray-1100  text-[14px]">
//                     {weather.list[0].main.temp_min.toFixed(0)}ºc
//                   </p>
//                   <p className="font-bold text-gray-400 text-[14px]">
//                     {weather.list[0].main.temp_max.toFixed(0)}ºc
//                   </p>
//                 </div>
//               </div>
//               <div className="w-[67px] h-[152px] flex  flex-col  items-center justify-center gap-1">
//                 <p className="font-bold text-[14px] text-blue-thin">
//                   {daysOfWeek[oneDay].slice(0, 3)}
//                 </p>
//                 <div className="w-[56px] h-[56px] flex justify-center items-center">
//                   <img
//                     className="animate-spin-pulse ease-in-out"
//                     src="src/images/icons/sun clouds.png"
//                     alt=""
//                   />
//                 </div>
//                 <div>
//                   <p className="font-bold text-gray-1100  text-[14px]">
//                     {weather.list[1].main.temp_min.toFixed(0)}ºc
//                   </p>
//                   <p className="font-bold text-gray-400 text-[14px]">
//                     {weather.list[1].main.temp_max.toFixed(0)}ºc
//                   </p>
//                 </div>
//               </div>
//               <div className="w-[67px] h-[152px] flex  flex-col  items-center justify-center gap-1">
//                 <p className="font-bold text-[14px] text-blue-thin">
//                   {daysOfWeek[twoDay].slice(0, 3)}
//                 </p>
//                 <div className="w-[56px] h-[56px] flex justify-center items-center">
//                   <img
//                     className="animate-spin-pulse ease-in-out"
//                     src="src/images/icons/Moon.png"
//                     alt=""
//                   />
//                 </div>

//                 <div>
//                   <p className="font-bold text-gray-1100  text-[14px]">
//                     {weather.list[2].main.temp_min.toFixed(0)}ºc
//                   </p>
//                   <p className="font-bold text-gray-400 text-[14px]">
//                     {weather.list[2].main.temp_max.toFixed(0)}ºc
//                   </p>
//                 </div>
//               </div>
//               <div className="w-[67px] h-[152px] flex  flex-col  items-center justify-center gap-1">
//                 <p className="font-bold text-[14px] text-blue-thin">
//                   {daysOfWeek[threeDay].slice(0, 3)}
//                 </p>
//                 <div className="w-[56px] h-[56px] flex justify-center items-center">
//                   <img
//                     className=" animate-spin-pulse ease-in-out"
//                     src="src/images/icons/Thunder.png"
//                     alt=""
//                   />
//                 </div>
//                 <div>
//                   <p className="font-bold text-gray-1100  text-[14px]">
//                     {weather.list[3].main.temp_min.toFixed(0)}ºc
//                   </p>
//                   <p className="font-bold text-gray-400 text-[14px]">
//                     {weather.list[3].main.temp_max.toFixed(0)}ºc
//                   </p>
//                 </div>
//               </div>
//               <div className="w-[67px] h-[152px] flex  flex-col  items-center justify-center gap-1">
//                 <p className="font-bold text-[14px] text-blue-thin">
//                   {daysOfWeek[fourDay].slice(0, 3)}
//                 </p>
//                 <div className="w-[56px] h-[56px] flex justify-center items-center">
//                   <img
//                     className=" animate-spin-pulse ease-in-out"
//                     src="src/images/icons/Group 8.png"
//                     alt=""
//                   />
//                 </div>
//                 <div>
//                   <p className="font-bold text-gray-1100  text-[14px]">
//                     {weather.list[4].main.temp_min.toFixed(0)}ºc
//                   </p>
//                   <p className="font-bold text-gray-400 text-[14px]">
//                     {weather.list[4].main.temp_max.toFixed(0)}ºc
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </IconContext.Provider>
//   );
// };

// export default Weather;
