import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Navbar2 from './components/Navbar2';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Profile from './pages/Profile';
import About from './pages/About';
import Settings from './pages/Settings';
import ChangePassword from './pages/ChangePassword';
import NotFound from './pages/NotFound';
import Test from './pages/Test';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from './helpers/const';


function scrollFunction()
{
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
  {
    document.getElementById("backToTopBtn").style.display = "block";
  }
  else
  {
    document.getElementById("backToTopBtn").style.display = "none";
  }
}

function topFunction()
{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}



function App() {
  //check login
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  ;

  useEffect(() => {
    // axios.get('http://localhost:3001/auth/token'||'https://react-nodejs-illumin8.herokuapp.com/auth/token', {
    axios.get(baseUrl +"auth/token", {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }, [])
    .then((response) => {
      //checks for errors for login state
      if (response.data.error) {
        setAuthState({...authState, status: false}); //only change 1 
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    });  
  },[]);

  

  window.onscroll = function() {scrollFunction()};

  return (
    <div className="App">
      <button onClick={topFunction} id="backToTopBtn" className="rainbowButton" title="Go to top">
        <span>Back to Top</span>
      </button>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar2 authState={authState} setAuthState={setAuthState}/>
          {/* <div className="navbar">
          <Link to="/createpost"> Create a Post </Link>
          <Link to="/"> Homepage </Link>
          </div> */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/profile/:usernameInput" component={Profile} />
            <Route path="/settings" component={Settings} />
            <Route path="/changepassword" component={ChangePassword} />
            {/* <Route path="/profile/" component={Profile} /> */}
            <Route path="/about" component={About} />
            <Route path="/test" component={Test} />
            <Route path="*" exact component={NotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
