import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ResCard from "./ResCard";
import Shimmer from "./Shimmer";
import useInternetStatus from "../Utils/useInternetStatus";

const Home = () => {
  const [listRestaurants, setListRestaurants] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [searchedRestaurant, setSearchedRestaurant] = useState([]);
  const status = useInternetStatus();

  // const loc = {
  //   chandighar : [25.319019905210304, 83.00316005945206],
  //   banglore: [12.97159999999999, 77.594566],
  //   varanasi: [25.319019905210304, 83.00316005945206],
  //   delhi: [25.319019905210304, 83.00316005945206]
  // }

  const fetchData = async (lat, lon) => {
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lon}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const json = await data.json();

    const resturant =
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;

    setListRestaurants(resturant);
    setSearchedRestaurant(resturant);
  };

  useEffect(() => {
    fetchData(30.7333148, 76.7794179);
  }, []);

  // if (listRestaurants.length === 0) {
  //   return (
  //     <Shimmer />
  //   )
  // }

  if (!status)
    return (
      <div className="flex justify-center">
        <h1 className="text-3xl text-gray-500 pt-40">
          You are Offline! Please Check Your Internet Connection.
        </h1>
      </div>
    );

  return listRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <>
      <h1 className="p-4 text-3xl font-bold">Resturants</h1>

      <div className="pt-4 px-8 flex justify-between">
        <button
          className="border px-2 p-1 bg-[#f1efef] text-black rounded-2xl hover:bg-[#7e57c2] hover:text-white"
          onClick={() => {
            const filteredRestaurants = listRestaurants.filter(
              (res) => res.info.avgRating > 4.2
            );
            setListRestaurants(filteredRestaurants);
          }}
        >
          Top Rated Resturants
        </button>

        <div className="flex gap-2">
          <input
            className="border px-2 p-1 bg-[#f1efef] text-black rounded-2xl hover:border-[#7e57c2] hover:text-black"
            placeholder="Search"
            value={searchedText}
            onChange={(e) => setSearchedText(e.target.value)}
          />

          <button
            className="border px-4 p-1 bg-[#7e57c2] text-white rounded-2xl hover:bg-[#5e35b1] hover:text-white"
            onClick={() => {
              const searchedCard = listRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchedText.toLowerCase())
              );
              setSearchedRestaurant(searchedCard);
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        {searchedRestaurant.map((res) => {
          return (
            <div
              key={res.info.id}
              className="w-[200px] overflow-hidden border rounded-lg m-5 hover:transition duration-300 hover:scale-105"
            >
              <Link key={res.info.id} to={`/restaurant/${res.info.id}`}>
                <ResCard res={res} />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
