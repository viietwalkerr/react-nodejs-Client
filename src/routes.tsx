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


export const routes = [
    {
        path: "/home",
        exact: true,
        component: <Home />,
    },
    {
        path: "/createpost",
        exact: false,
        component: <CreatePost />,
    },
    {
        path: "/post/:id",
        exact: false,
        component: <Post />,
    },
    {
        path: "/login",
        exact: false,
        component: <Login />,
    },
    {
        path: "/logout",
        exact: false,
        component: <Logout />,
    },
    {
        path: "/register",
        exact: false,
        component: <Register />,
    },
    {
        path: "/success",
        exact: false,
        component: <Success />,
    },
    {
        path: "/profile/:id",
        exact: false,
        component: <Profile />,
    },
    {
        path: "/profile/:usernameInput",
        exact: false,
        component: <Profile />,
    },
    {
        path: "/settings",
        exact: false,
        component: <Settings />,
    },
    {
        path: "/changepassword",
        exact: false,
        component: <ChangePassword />,
    },
    {
        path: "/about",
        exact: false,
        component: <About />,
    },
    {
        path: "*",
        exact: true,
        component: <NotFound />,
    },    
]