import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, restaurantDetails } from "../Utils/cartSlice";

const MenuDropdown = ({ item, isActive, setGetIndex, setAdded, title }) => {
  
  const [menuCount, setMenuCount] = useState(0);
  // const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const handleMenuClick = () => {
    setGetIndex();
  };

  const handleAddItems = (item, title) => {
    dispatch(restaurantDetails(title));
    dispatch(addToCart(item));

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 3000);
  };

  useEffect(() => {
    setMenuCount(item?.card?.card?.itemCards?.length);
  }, [item]);

  if (item?.card?.card?.itemCards)
    return (
      <div>

        <div
          className="p-2 border rounded-md shadow flex justify-between items-center cursor-pointer"
          // onClick={() => setIsActive(!isActive)}
          onClick={handleMenuClick}
        >
          <p className="text-md font-bold">
            {item?.card?.card?.title} (<span>{menuCount}</span>){" "}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="14"
            viewBox="0 0 448 512"
          >
            <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
          </svg>
        </div>
        {isActive && (
          <div className="bg-gray-50">
            {item?.card?.card?.itemCards?.map((item) => (
              <div
                className="p-2 pb-4 border-b hover:cursor-pointer hover:bg-gray-100 "
                key={item?.card?.info?.id}
              >
                <div className="flex justify-between items-center">
                  <div className="w-[80%]">
                    <p className="text-normal font-semibold">
                      {item?.card?.info?.name}
                    </p>
                    <p className="text-sm font-medium">
                      ₹{" "}
                      {item?.card?.info?.price / 100 ||
                        item?.card?.info?.defaultPrice / 100}
                    </p>
                    <p className="text-xs text-gray-500 font-light">
                      {item?.card?.info?.description}
                    </p>
                  </div>
                  <div className="">
                    <div className="absolute mt-20 ml-6">
                      <button
                        className="bg-[#7e57c2] hover:bg-[#5e35b1] text-white px-4 py-1 rounded-md text-sm"
                        onClick={() => handleAddItems(item, title)}
                      >
                        Add
                      </button>
                    </div>
                    <img
                      className="w-[110px] h-[95px] rounded-lg"
                      src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
                        item?.card?.info?.imageId
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
};

export default MenuDropdown;
