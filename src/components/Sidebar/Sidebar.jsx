import React from 'react';
import { BrowserRouter as Link, NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Sidebar.scss';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

const Sidebar = ({
    sidebar = false,
    onClick,


}) => {
    return (
        <nav className={sidebar ? 'sidenav active' : 'sidenav'}>
            <ul className='sidenav-items' onClick={onClick}>
                <li className='sidenav-toggle'>
                    <Link to="#" className="menu-bars">
                        <AiIcons.AiOutlineClose className="menu-cross" />
                    </Link>
                </li>
                {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <NavLink activeClassName='="sideNavActive' to={item.path}>
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

export default Sidebar
