import React, { useEffect, useState } from "react";
import axios from "axios";
import { LiaStarSolid } from "react-icons/lia";

const EventDetails = ({ selectedCity }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (selectedCity && selectedCity.latitude && selectedCity.longitude) {
        const options = {
          method: "GET",
          url: "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng",
          params: {
            latitude: selectedCity.latitude,
            longitude: selectedCity.longitude,
            limit: "9",
            distance: "50",
          },
          headers: {
            "X-RapidAPI-Key":
              "2fdcdddb83mshb7c21400a84c70ap18be01jsn79b37922fc61",
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        };

        try {
          const response = await axios.request(options);
          console.log(response.data);

          const filteredRestaurants = response.data.data.filter(
            (restaurant) => restaurant.name
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
    <div className=" relative bottom-[830px] left-[650px] ">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-5  text-white absolute  ">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="flex font-bold h-[270px] flex-col gap-2  py-1 px-4 w-[350px] rounded-xl bg-gray-800"
            >
              <img
                className="h-[210px] w-[350px]  rounded-xl  "
                src={
                  restaurant.photo?.images?.large?.url ||
                  "src/images/icons/burger2.webp"
                }
                alt=""
              />

              <div className="h-[64px]">
                <div>
                  <h3 className="font-bold absolute">{restaurant.name}</h3>
                </div>

                <div className="flex items-center gap-2 justify-end mb-6  ">
                  <p className="">
                    <LiaStarSolid className="text-red" />
                  </p>

                  <p className=""> {restaurant.rating}</p>
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
