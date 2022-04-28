import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { SidebarData } from './SidebarData';
import './Sidebar.scss';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

interface SidebarProps {
    sidebar: boolean;
    onClick: any;
}

const Sidebar: React.FC<SidebarProps> = ({
    sidebar = false,
    onClick,


}) => {

    const SidebarData = [
        {
            title: 'Home',
            path: '/Home',
            icon: <AiIcons.AiFillHome />,
            cName: 'nav-text',
        },
        {
            title: 'About',
            path: '/About',
            icon: <AiIcons.AiFillInfoCircle />,
            cName: 'nav-text',
        },
        {
            title: 'Settings',
            path: '/Settings',
            icon: <AiIcons.AiFillSetting />,
            cName: 'nav-text',
        },
        {
            title: 'Profile',
            path: '/Profile',
            icon: <AiIcons.AiFillProfile />,
            cName: 'nav-text',
        },
        {
            title: 'What is this?',
            path: '/404NotFound',
            icon: <AiIcons.AiOutlineQuestion />,
            cName: 'nav-text',
        },
    ]
    return (
        <nav className={sidebar ? 'sidenav active' : 'sidenav'}>
            <ul className='sidenav-items' onClick={onClick}>
                <li className='sidenav-toggle'>
                    <NavLink  to="#" className="menu-bars">
                        <AiIcons.AiOutlineClose className="menu-cross" />
                    </NavLink>
                </li>
                {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <NavLink className={(navData) => navData.isActive ? '="sideNavActive' : ""} to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Sidebar;
