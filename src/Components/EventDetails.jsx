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
            distance: "2",
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
    <div className=" absolute bottom-[750px] left-[650px] right-0">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-5  text-blue-light mb-72 absolute">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="flex font-bold h-[220px] flex-col gap-2 py-1 px-4 rounded-xl w-[280px] bg-gray-800"
            >
              <h3 className="font-bold">{restaurant.name}</h3>
              <p>
                <span className="text-slate-500">Address:</span>
                <span className="float-right">
                  {restaurant.address || "Not available"}
                </span>
              </p>
              <p>
                <span className="text-slate-500">Phone:</span>
                <a
                  href={`tel:${restaurant.phone}`}
                  className="float-right text-blue-400"
                >
                  {restaurant.phone || "Not available"}
                </a>
              </p>
              <p>
                <span className="text-slate-500">Rating:</span>
                <span className="float-right">
                  {restaurant.rating || "Not available"}
                </span>
              </p>
              <p>
                <a
                  href={restaurant.website}
                  className="text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventDetails;
