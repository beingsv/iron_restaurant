import { useRef, useState } from "react";
import signImg from "../Assets/signImg.jpg";
import { checkUserValidate } from "../Utils/userValidate";

import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "../Utils/firebase";

const SignIn = () => {

  const navigate = useNavigate();

  const [isRegistered, setIsRegistered] = useState(false);

  const [validationError, setValidationError] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSignIn = () => {
    const result = checkUserValidate(
      email.current.value,
      password.current.value
    );
    setValidationError(result);

    if (result !== null) return;

    if (isRegistered === true) {
      //Sign Up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
          navigate("/home");
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setValidationError(errorCode + " : " + errorMessage);
        });
    } else {
      //SignIn
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setValidationError(errorCode + " : " + errorMessage);
        });
    }
  };

  return (
    <div className="w-[100%] pt-10 bg-[#f5f5f5] h-[100vh]">
      <div className="pt-2 flex justify-center items-center">
        <div className="w-[65%] h-[80vh] bg-white rounded-[40px] py-8 flex">
          <div className="w-[50%] h-full items-center justify-center flex border-r">
            <img className="w-[60%]" src={signImg} alt="SignInIMG" />
          </div>

          <div className="w-[50%] h-full items-center justify-center flex flex-col">
            <div className="text-3xl py-6 font-bold text-center pt-16">
              {isRegistered ? <h1>Sign Up</h1> : <h1>Sign In</h1>}
            </div>
            <div className="items-center justify-center flex w-[100%]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="w-[100%] p-8 flex flex-col justify-center items-center gap-12"
              >
                <div className="w-[100%] flex flex-col justify-center items-center gap-6">
                  {isRegistered && (
                    <input
                      ref={name}
                      className=" w-[70%] border-2 rounded-[25px] p-2"
                      type="text"
                      placeholder="Name"
                    ></input>
                  )}

                  <input
                    ref={email}
                    className=" w-[70%] border-2 rounded-[25px] p-2"
                    type="text"
                    placeholder="Email"
                  ></input>

                  <input
                    ref={password}
                    className=" w-[70%] border-2 rounded-[25px] p-2"
                    type="password"
                    placeholder="Password"
                  ></input>

                  <p className="text-red-500 text-sm font-bold">
                    {validationError}
                  </p>
                </div>

                <div className="flex justify-center gap-6 flex-col">
                  <button
                    // type="submit"
                    className="bg-[#7e57c2] text-white px-4 py-1 rounded-md hover:bg-[#5e35b1] hover:text-white"
                    onClick={() => {
                      handleSignIn();
                    }}
                  >
                    {isRegistered ? "Sign Up" : "Sign In"}
                  </button>

                  <div onClick={() => setIsRegistered(!isRegistered)}>
                    {isRegistered ? (
                      <p className="text-[#7e57c2] font-bold text-sm cursor-pointer hover:text-[#5e35b1] hover:underline">
                        Already have an account? Sign In
                      </p>
                    ) : (
                      <p className="text-[#7e57c2] font-bold text-sm cursor-pointer hover:text-[#5e35b1] hover:underline">
                        Not Register? Sign Up Now
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
