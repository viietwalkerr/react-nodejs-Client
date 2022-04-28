import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect, FC } from 'react';
import Navbar from './components/NavBar/Navbar';
import Home from './pages/Home/Home';
import CreatePost from './pages/Post/CreatePost/CreatePost';
import Post from './pages/Post/Post';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import Register from './pages/Register/Register';
import Success from './pages/Success/Success';
import Profile from './pages/Profile/Profile';
import About from './pages/About/About';
import Settings from './pages/Settings/Settings';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import NotFound from './pages/NotFound/NotFound';
import RainbowButton from './components/Input/RainbowButton/RainbowButton';
import NeonButton from './components/Input/NeonButton/NeonButton';
import Footer from './components/Layout/Common/Footer/Footer';
import { routes } from "./routes";
import { useSelector } from 'react-redux';
import { ApplicationState } from './store';
import usePopulateInitialData from './hooks/usePopulateInitialData';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chat from './pages/Chat/Chat';

// axios.defaults.withCredentials = true;

// function scrollFunction()
// {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
//   {
//       document.getElementById("backToTopBtn").style.display = "block";
//   }
//   else
//   {
//     document.getElementById("backToTopBtn").style.display = "none";
//   }
// }

function topFunction()
{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const App = (

  
) => {
  // Check login

  const accessToken = useSelector(
    (state: ApplicationState) => state.auth?.accessToken
  );

  // window.onscroll = function() {scrollFunction()};

  usePopulateInitialData();

  return (
      <div className="App">
        <NeonButton onClick={topFunction} id="backToTopBtn" title="Back to Top" />
          <Navbar />
          <Routes>
          
            {/* {routes.map(({ path, component, exact }) => {
              console.log(path);
              <Route 
                path={path}
                exact={exact}
                component={component}
              />
            })} */}
            <Route path="/" element={<Navigate to="/home" />}/>
            <Route path="/home" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/success" element={<Success />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/:usernameInput" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        <Footer />
        <ToastContainer
          className="toastify"
          toastClassName="toast"
          bodyClassName="toast-body"
          progressClassName="toast-progress"
          position="bottom-right"
        />
    </div>
  );
}

export default App;
