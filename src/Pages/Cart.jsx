import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../Utils/cartSlice";

const Cart = () => {
  // const [resData, setResData] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [platformFee, setPlatformFee] = useState(8);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [addressDet, setAddressDet] = useState({});

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const addressRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const item = useSelector((store) => store.cart.items);
  const restaurantName = useSelector((store) => store.cart.restaurantDetails);

  const dispatch = useDispatch();

  const routeToHomePage = () => {
    window.location.href = "/home";
  };

  const decrementQualtity = (item) => {
    dispatch(decrementQuantity(item));
  };

  const incrementQualtity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const deliveryToNum = (restaurantName) => {
    const deliverString = restaurantName?.sla?.lastMileTravelString;
    setDeliveryCharge(parseFloat(deliverString));
  };

  const calTotal = (item) => {
    let total = 0;
    item.forEach((item) => {
      total +=
        (item?.card?.info?.price / 100 ||
          item?.card?.info?.defaultPrice / 100) * item.quantity;
    });
    setTotalPrice(total);
  };

  const handleProceedToPayment = (event) => {
    event.preventDefault();
    const addressDetails = {
      name: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      address: addressRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
    };
    setAddressDet(addressDetails);
  };

  useEffect(() => {
    if (restaurantName?.sla?.lastMileTravel <= 2.6) {
      setDeliveryFee(0);
    } else {
      setDeliveryFee(20);
    }

    calTotal(item);
    deliveryToNum(restaurantName);
  }, [restaurantName?.sla?.lastMileTravel, item]);

  console.log(addressDet);

  return (
    <div className="w-[100%] m-auto bg-[#f5f5f5] h-[100vh] pt-8">
      <div>
        <h1 className="flex justify-center text-3xl font-bold py-4">Cart</h1>
      </div>

      <div className="w-[75%] h-[80vh] m-auto flex justify-between bg-white p-2">
        <div className="w-[60%] border-2 rounded-md">
          <h2 className="text-center text-2xl font-bold py-4">
            Address Details
          </h2>
          <form className="p-4 flex flex-col gap-4 items-center">
            <input
              className=" w-[75%] border-b-2 rounded-md p-2"
              type="text"
              placeholder="First Name"
              ref={firstNameRef}
            ></input>

            <input
              className=" w-[75%] border-b-2 rounded-md p-2"
              type="text"
              placeholder="Last Name"
              ref={lastNameRef}
            ></input>

            <input
              className=" w-[75%]  border-b-2 rounded-md p-2"
              type="text"
              placeholder="Address"
              ref={addressRef}
            ></input>

            <input
              className=" w-[75%]  border-b-2 rounded-md p-2"
              type="email"
              placeholder="Email"
              ref={emailRef}
            ></input>

            <input
              className=" w-[75%]  border-b-2 rounded-md p-2"
              type="phone"
              placeholder="Phone Number"
              ref={phoneRef}
            ></input>

            <button
              className="bg-[#7e57c2] text-white px-4 py-1 rounded-md hover:bg-[#5e35b1] hover:text-white"
              onClick={() => handleProceedToPayment()}
            >
              Proceed to Payment
            </button>
          </form>
        </div>
        <div className="w-[37%]">
          <div>
            {item.length === 0 ? (
              <div className="h-[80vh] flex flex-col justify-center items-center">
                <p className="text-xl font-bold py-4 text-center ">
                  Cart is Empty
                </p>
                <button
                  onClick={routeToHomePage}
                  className="bg-[#7e57c2] text-white px-4 py-1 rounded-md hover:bg-[#5e35b1] hover:text-white"
                >
                  Add Items
                </button>
              </div>
            ) : (
              <div>
                <div className="p-4 flex gap-4">
                  <div className="w-[70px] h-[70px] overflow-hidden">
                    <img
                      className="w-[90%] h-[90%] rounded-md"
                      src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
                        restaurantName?.cloudinaryImageId
                      }
                    />
                  </div>
                  <div>
                    <p className="text-md font-bold">{restaurantName?.name}</p>
                    <p className="text-sm">
                      {restaurantName?.areaName}, {restaurantName?.city}
                    </p>
                    <div className="border-b-4 border-[#b1b1b1] pt-2 rounded"></div>
                  </div>
                </div>
                {item.map((item) => {
                  return (
                    <div key={item?.card?.info?.id}>
                      <div className="flex justify-between items-center px-4 py-2">
                        <p className="text-normal w-[60%] text-sm font-medium">
                          {item?.card?.info?.name}
                        </p>
                        <p className="text-sm font-medium">
                          ₹{" "}
                          {item?.card?.info?.price / 100 ||
                            item?.card?.info?.defaultPrice / 100}
                        </p>
                        <div className="flex gap-3 h-[30px] border rounded px-3 items-center">
                          <button
                            onClick={() => decrementQualtity(item.card.info.id)}
                            className="hover:text-[#7e57c2] "
                          >
                            -
                          </button>
                          <p>{item?.quantity}</p>
                          <button
                            onClick={() => incrementQualtity(item.card.info.id)}
                            className="hover:text-[#7e57c2]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="p-4">
                  <p className="text-sm font-bold">Bill Details</p>
                  <div className="flex justify-between items-center text-gray-500 text-xs pt-2">
                    <p className="">Item Total</p>
                    <p>₹ {totalPrice}</p>
                  </div>
                  <div className="flex justify-between items-center text-gray-500 text-xs pt-2">
                    <p>
                      Delivery Fee | {restaurantName?.sla?.lastMileTravelString}
                    </p>
                    <p>₹ {deliveryFee}</p>
                  </div>
                  <div className="flex justify-between items-center text-gray-500 text-xs pt-2">
                    <p>Platform Fee</p>
                    <p>₹ {platformFee}</p>
                  </div>
                  <div className="border-b-[1px] border-[#b1b1b1] pt-2"></div>
                  <div className="flex justify-between items-center text-black text-xs pt-2">
                    <p className="text-sm font-bold">Grand Total</p>
                    <p>₹ {totalPrice + deliveryFee + platformFee}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
