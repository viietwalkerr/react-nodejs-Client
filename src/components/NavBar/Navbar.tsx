import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Auth';

const Navbar: React.FC = ({}) => {
    const [sidebar, setSidebar] = useState(false);
    const isAuthenticated = useSelector(
        (state: ApplicationState) => state.auth?.accessToken
    );
    const user = useSelector((state: ApplicationState) => state.user);
    const { logoutUser } = bindActionCreators(actionCreators, useDispatch());

    function logout() {
        logoutUser();
    }

    function showSidebar() {
        setSidebar(!sidebar)
    };

    const TopNavItems = () => {
        if (!isAuthenticated) {
            return (
                <>
                    <NavLink className={(navData) => navData.isActive ? "topNavActive" : ""} to="/home">Home</NavLink>
                    <NavLink className={(navData) => navData.isActive ? "topNavActive" : ""} to="/about">About</NavLink>
                </>
            );
        } else {
            return (
                <>
                    <NavLink className={(navData) => navData.isActive ? "topNavActive" : ""} to="/home">Home</NavLink>
                    <NavLink className={(navData) => navData.isActive ? "topNavActive" : ""} to="/about">About</NavLink>        
                    <NavLink className={(navData) => navData.isActive ? "topNavActive" : ""} to="/createpost">Create Post</NavLink>
                    <NavLink className={(navData) => navData.isActive ? "topNavActive" : ""} to="/chat">Chat</NavLink>
                </>
            );
        }
    };

    const TopNavProfile = () => {
        if (!isAuthenticated) {
            return (
                <>
                    <NavLink className={(navData) => navData.isActive ? "topNavActive" : ""} to="/login">Login</NavLink>
                    <NavLink className={(navData) => navData.isActive ? "topNavActive" : ""} to="/register">Register</NavLink>
                </>
            );
        } else {
            return (
                <>
                    <NavLink className={(navData) => navData.isActive ? "topNavActive" : ""} to={`/profile/${user?.userName}`}>{user?.userName}</NavLink>    
                    <NavLink className={(navData) => navData.isActive ? "topNavActive" : ""} to="/settings">Settings</NavLink>
                    <NavLink className={(navData) => navData.isActive ? "topNavActive" : ""} to="/logout" onClick={logout}>Logout</NavLink>
                </>
            );
        }
    };

    return (
        <>
            <div className="navbar">
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars className="menu-bars" onClick={showSidebar} />
                </Link>
                <div className='topnav-items'>
                    {TopNavItems()}
                </div>
                <div className="topnav-profile">
                    {TopNavProfile()}
                </div>
            </div>
            <Sidebar sidebar={sidebar} onClick={showSidebar}/>
        </>
    )
}

export default Navbar;