import React, {useEffect, useState, useContext } from 'react';
// import { Nav, Form, FormControl, NavDropdown, Badge } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
// import { SidebarData} from './SidebarData';
import './Navbar.scss';
// import { IconContext } from 'react-icons';
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios';
import { baseUrl } from '../../helpers/const';
import Cookies from 'js-cookie';
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Auth';



const Navbar: React.FC = ({}) => {
    const [sidebar, setSidebar] = useState(false);
    const { authState } = useContext(AuthContext); 
    const { setAuthState} = useContext(AuthContext);


    const isAuthenticated = useSelector(
        (state: ApplicationState) => state.auth?.accessToken
    );

    const { logoutUser } = bindActionCreators(actionCreators, useDispatch());

    // useEffect(() => {
    //     // axios.get(
    //     //     baseUrl + "auth/token",
    //     //     // 'http://localhost:3001/auth/token', 
    //     //     {
    //     //         headers: { accessToken: localStorage.getItem("accessToken")
    //     //     }
    //     // }, [])
    //     // .then((response) => {
    //     //     if (response.data.error) {
    //     //         // setAuthState({...authState, status: false});
    //     //     } else {
    //     //         setAuthState({
    //     //             username: response.data.username,
    //     //             id: response.data.id,
    //     //             status: true,
    //     //         });
    //     //     }
    //     // })
    //     if (!Cookies.get("access-token")){
    //         setAuthState({...authState, status: false});
    //     } else {
    //         setAuthState({...authState, status: true});
    //     }
    // }, []);

    function logout() {

        // axios.get(baseUrl + "auth/logout").then((response) => {
        //     Cookies.remove("access-token");
        //     document.cookie = "access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        //     console.log(response);
        //     setAuthState({...authState, status: false});
        // })

        // localStorage.removeItem("accessToken");
        // setAuthState({...authState, status: false});
        
        // authState(
        //     {
        //         username: "",
        //         id: 0,
        //         status: false,
        //     });
        logoutUser();
    }

    function showSidebar() {
        setSidebar(!sidebar)
    };

    const TopNavItems = () => {
        // if (!authState.status) {
            if (!isAuthenticated) {
            return (
                <>
                    <NavLink activeClassName="topNavActive" to="/home">Home</NavLink>
                    <NavLink activeClassName="topNavActive" to="/about">About</NavLink>
                </>
            );
        } else {
            return (
                <>
                    <NavLink activeClassName="topNavActive" to="/home">Home</NavLink>
                    <NavLink activeClassName="topNavActive" to="/about">About</NavLink>        
                    <NavLink activeClassName="topNavActive" to="/createpost">Create Post</NavLink>
                </>
            );
        }
    };

    const TopNavProfile = () => {
        // if (!authState.status) {
        if (!isAuthenticated) {
            return (
                <>
                    <NavLink activeClassName="topNavActive" to="/login">Login</NavLink>
                    <NavLink activeClassName="topNavActive" to="/register">Register</NavLink>
                </>
            );
        } else {
            return (
                <>
                    <NavLink activeClassName="topNavActive" to={`/profile/${authState.username}`}>{authState.username}</NavLink>    
                    <NavLink activeClassName="topNavActive" to="/settings">Settings</NavLink>
                    <NavLink activeClassName="topNavActive" to="/logout" onClick={logout}>Logout</NavLink>
                </>
            );
        }
    };

    return (
        <>
            {/* change color, add styles */}
            <div className="navbar">
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars className="menu-bars" onClick={showSidebar} />
                </Link>
                <div className='topnav-items'>
                    {TopNavItems()}
                    {/* <Form className="form-center">
                    <FormControl type="text" placeholder="Search" className=""></FormControl>
                    </Form> */}
                </div>
                <div className="topnav-profile">
                    {TopNavProfile()}
                </div>
            </div>
            <Sidebar sidebar={sidebar} onClick={showSidebar}/>
        </>
    )
}

export default Navbar
