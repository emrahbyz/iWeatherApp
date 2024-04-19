import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div className=" relative bottom-[840px] left-[650px] ">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-5  text-blue-light  absolute">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="flex font-bold h-[250px] flex-col gap-2   py-1 px-4 rounded-xl w-[290px] bg-gray-800"
            >
              <img
                className="h-[235px] w-[260px] absolute "
                src={
                  restaurant.photo?.images?.large?.url ||
                  "src/images/icons/food.avif"
                }
                alt=""
              />
              <h3 className="font-bold">{restaurant.name}</h3>

              <p>
                <span className="text-slate-500">Rating:</span>
                <span className="float-right">
                  {restaurant.rating || "Not available"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventDetails;
