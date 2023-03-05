import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { FC } from 'react';
import Navbar from './components/NavBar/Navbar';
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

const App: FC = (

  
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
          
            {routes.map(({ path, component }) => {
              return (
              <Route 
                path={path}
                element={component}
              />)
            })}
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
