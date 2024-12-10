import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuDropdown from "./MenuDropdown";

const RestaurantMenu = () => {
  const [title, setTitle] = useState([]);
  const [carousels, setCarousels] = useState([]);
  const [menu, setMenu] = useState([]);
  const { restaurantId } = useParams();
  const [getIndex, setGetIndex] = useState(0);
  const [added, setAdded] = useState(false);



  const fetchMenu = async (lat, lon) => {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lon}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`
    );
    const json = await data.json();

    const titleData = json?.data?.cards[2]?.card?.card?.info;


    const carouselsData =
      json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) =>
          c.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.MenuCarousel"
      );
    

    const menuData =
      json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (m) =>
          m.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );

    setTitle(titleData);
    setCarousels(carouselsData);
    setMenu(menuData);
  };

  useEffect(() => {
    fetchMenu(30.7333148, 76.7794179);
  }, []);


  return (
    <div className="w-[50%] m-auto pt-8">
      { added && (
        <div className="text-center text-white fixed bottom-5 left-5 p-1 px-2 font-bold bg-[#7e57c2] rounded">
          <div className="">
          <p className="">Item Added to Cart...</p>
          </div>
        </div>
      )
      }

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold">{title?.name}</p>
          <p className="text-xs">{title?.cuisines?.join(", ")}</p>
          <p className="text-xs">{title?.areaName}</p>
        </div>
        <div className="flex flex-col justify-center border p-2 rounded-md">
          <p className="text-sm font-bold text-center text-[#7e57c2]">
            {title?.avgRatingString}
          </p>
          <p className="text-xs">{title?.totalRatingsString}</p>
        </div>
      </div>

      <div className="flex gap-4 pt-4 text-sm font-bold">
        <p>{title?.sla?.slaString.toLowerCase()}</p>
        <p>{title?.costForTwoMessage}</p>
      </div>

      {carousels && carousels[0]?.card?.card?.title == "Top Picks" ? (
        <div className="pt-10">
          <p className="text-xl font-bold">{carousels[0]?.card?.card?.title}</p>
          <div className="flex gap-4 pt-6 overflow-x-scroll no-scrollbar">
            {carousels[0]?.card?.card?.carousel?.map((item) => {
              const bgImg = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.dish?.info?.imageId}`;

              return (
                <div
                  key={item.bannerId}
                  className="rounded-2xl w-[360px] h-[400px] bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${bgImg})`,
                  }}
                >
                  <div
                    className={`w-[360px] h-[400px] flex flex-col justify-between p-4 pt-6 bg-cover bg-center rounded-2xl bg-gradient-to-b from-[#000000]`}
                  >
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {item?.dish?.info?.name}
                      </p>
                      <p className="pt-2 font-thin text-white">
                        {item?.dish?.info?.description}
                      </p>
                    </div>
                    <div>
                      <p className="text-md font-bold text-white bg-black px-2 py-1 w-fit rounded-full">
                        ₹ {item?.dish?.info?.price / 100 || item?.dish?.info?.defaultPrice / 100} 
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}

      {menu.length > 0 &&
        menu.map((item, index) => {
            return (
              <div className="pt-5" key={item.card.card.title}>
                <MenuDropdown 
                  item={item} 
                  isActive={index === getIndex ? true : false} 
                  setGetIndex={() => setGetIndex(index)}
                  setAdded={setAdded}
                  title={title}
                />
              </div>
            );
        })}

      <div></div>
    </div>
  );
};

export default RestaurantMenu;
