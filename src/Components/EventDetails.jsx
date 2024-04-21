import React, { useEffect, useState } from "react";
import axios from "axios";
import { LiaStarSolid } from "react-icons/lia";

const EventDetails = ({ selectedCity }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const key = "48f9d9feb7msh825c349e9db881dp17b87ejsn32b9451ceebd";
      if (selectedCity && selectedCity.latitude && selectedCity.longitude) {
        const options = {
          method: "GET",
          url: "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng",
          params: {
            latitude: selectedCity.latitude,
            longitude: selectedCity.longitude,
            limit: "18",
            distance: "100",
          },
          headers: {
            "X-RapidAPI-Key": key,
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        };

        try {
          const response = await axios.request(options);
          console.log(response.data);

          const filteredRestaurants = response.data.data.filter(
            (restaurant) => restaurant.photo?.images?.large?.url
          );

          setRestaurants(filteredRestaurants);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching restaurants:", error);
          setLoading(false);
        }
      }
    };

    fetchRestaurants();
  }, [selectedCity]);

  return (
    <div className=" 2xl:relative  xl:relative lg:relative md:relative bottom-[830px] left-[400px]  xl:left-[550px] ml-4 2xl:ml-0 2xl:left-[650px]  ">
      {loading ? (
        <div className="spinner absolute mr-5">
          <img
            src="/images/img/12.png"
            className="w-[32px] h-[32px] animate-spin animate-infinite"
            alt=""
          />
          <p>Restaurant loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3  gap-5 text-white  absolute">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="flex font-bold h-[270px]  cursor-pointer flex-col gap-2 py-1 px-4 w-[350px] rounded-xl bg-gray-800"
            >
              <img
                className="h-[210px] w-[350px] rounded-md  transition-all duration-500 ease-out transform hover:scale-95"
                src={
                  restaurant.photo?.images?.large?.url ||
                  "src/images/icons/burger2.webp"
                }
                alt=""
              />

              <div>
                <div>
                  <h3 className="font-bold absolute">{restaurant.name}</h3>
                </div>

                <div className="flex items-center gap-2 justify-end">
                  <p className="">
                    <LiaStarSolid className="text-red" />
                  </p>

                  <p className="">{restaurant.rating || "Not available"}</p>
                </div>
                <div className="">{restaurant.phone}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventDetails;
