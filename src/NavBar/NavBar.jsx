import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useInternetStatus from "../Utils/useInternetStatus";

import { useSelector } from "react-redux";

import { signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";

const NavBar = () => {
  const [loginButton, setLoginButton] = useState("Login");
  const status = useInternetStatus();

  const cartItems = useSelector((store) => store.cart.items);
  const user = useSelector((store) => store.user);

  console.log(user);
  const navigate = useNavigate();
  const handlLogin = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    if(user) {
      setLoginButton("Logout");
    }
    else {
      setLoginButton("Login");
    }

  }, [loginButton, user]);

  return (
    <>
      <div className="px-8 py-2 shadow-lg border-t">
        <nav className="flex justify-between items-center">
          <section className="flex items-center gap-4">
            <img className="w-9" src="/resturantLogo.svg" alt="logo" />
            <h1 className="text-xl">Iron Resturant</h1>
          </section>

          <section>
            <ul className="flex gap-6 items-center">
              <li className="text-[#7e57c2] border px-2 py-1 rounded-2xl">
                {status ? "🟢 Online" : "🔴 Offline"}
              </li>

              <li className="text-[#7e57c2] hover:bg-[#7e57c2] hover:text-white px-2 py-1 rounded-2xl">
                <NavLink to={user ? "/home" : "/"}>Home</NavLink>
              </li>
              <li className="text-[#7e57c2] hover:bg-[#7e57c2] hover:text-white px-2 py-1 rounded-2xl">
                <NavLink to="/about">About</NavLink>
              </li>
              <li className="text-[#7e57c2] hover:bg-[#7e57c2] hover:text-white px-2 py-1 rounded-2xl">
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li className="text-[#7e57c2] hover:bg-[#7e57c2] hover:text-white px-2 py-1 rounded-2xl">
                <NavLink to={user ? "/cart" : "/"}>Cart ({cartItems.length})</NavLink>
              </li>
              <li>
                <button
                  className="bg-[#7e57c2] text-white px-4 py-1 rounded-2xl hover:bg-[#5e35b1]"
                  onClick={() => handlLogin()}
                >
                  {loginButton}
                </button>
              </li>
            </ul>
          </section>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
