  import React, { useEffect } from 'react'
  import { BrowserRouter, Routes, Route} from 'react-router-dom'
  import NavBar from './NavBar/NavBar'
  import Home from './Pages/Home'
  import About from './Pages/About'
  import Error from './Pages/Error'
  import RestaurantMenu from './Pages/RestaurantMenu'
  import Cart from './Pages/Cart'
  import Contact from './Pages/Contact'
  import SignIn from './Pages/SignIn'
  import { useDispatch } from 'react-redux'

  import { onAuthStateChanged } from "firebase/auth";
  import { auth } from "./Utils/firebase";
  import { addUser, removeUser } from './Utils/userSlice'

  const RoutesDefined = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          const {uid, email, displayName} = user;
          dispatch(addUser({uid: uid, email: email, displayName: displayName}));
        } else {
          // User is signed out
          dispatch(removeUser());
        }
      });
    }, [])



    return (
      <>
          <BrowserRouter>
              <NavBar />
              <Routes>
                  <Route path='/' element= { <SignIn/> } />
                  <Route path='/home' element= { <Home/> } />
                  <Route path='/about' element= { <About/> } />
                  <Route path='/restaurant/:restaurantId' element= { <RestaurantMenu/> } />
                  <Route path='/cart' element= { <Cart/> } />
                  <Route path='/contact' element= { <Contact/> } />
                  <Route path='*' element= { <Error/> } />
              </Routes>
          </BrowserRouter>
      </>
    )
  }


  export default RoutesDefined