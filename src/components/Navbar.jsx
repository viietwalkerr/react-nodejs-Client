import React, {useEffect, useState, useContext } from 'react';
// import { Nav, Form, FormControl, NavDropdown, Badge } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
import { BrowserRouter as Link, NavLink } from 'react-router-dom';
// import { SidebarData} from './SidebarData';
import './Navbar.scss';
// import { IconContext } from 'react-icons';
import { AuthContext } from '../helpers/AuthContext';
import axios from 'axios';
import { baseUrl } from '../helpers/const';
import Cookies from 'js-cookie';
import Sidebar from "./Sidebar";



function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const { authState } = useContext(AuthContext); 
    const { setAuthState} = useContext(AuthContext);



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

        axios.get(baseUrl + "auth/logout").then((response) => {
            Cookies.remove("access-token");
            document.cookie = "access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            console.log(response);
            setAuthState({...authState, status: false});
        })

        // localStorage.removeItem("accessToken");
        // setAuthState({...authState, status: false});
        
        // authState(
        //     {
        //         username: "",
        //         id: 0,
        //         status: false,
        //     });
    }

    function showSidebar() {
        setSidebar(!sidebar)
    };

    const TopNavItems = () => {
        if (!authState.status) {
            return (
                <>
                    <NavLink activeClassName="topNavActive" to="/">Home</NavLink>
                    <NavLink activeClassName="topNavActive" to="/about">About</NavLink>
                </>
            );
        } else {
            return (
                <>
                    <NavLink activeClassName="topNavActive" to="/">Home</NavLink>
                    <NavLink activeClassName="topNavActive" to="/about">About</NavLink>        
                    <NavLink activeClassName="topNavActive" to="/createpost">Create Post</NavLink>
                </>
            );
        }
    };

    const TopNavProfile = () => {
        if (!authState.status) {
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
                    {/* {!authState.status ? (
                        <>
                            <NavLink activeClassName="topNavActive" to="/">Home</NavLink>
                            <NavLink activeClassName="topNavActive" to="/about">About</NavLink>
                        </>
                    ): (
                        <>
                            <NavLink activeClassName="topNavActive" to="/">Home</NavLink>
                            <NavLink activeClassName="topNavActive" to="/about">About</NavLink>
                            
                            <NavLink activeClassName="topNavActive" to="/createpost">Create Post</NavLink>
                        </>
                    )} */}
                    {TopNavItems()}
                    
                    {/* <Form className="form-center">
                    <FormControl type="text" placeholder="Search" className=""></FormControl>
                    </Form> */}
                    
                </div>
                <div className="topnav-profile">
                {/* {!authState.status ? (
                    <>
                    
                        
                        <NavLink activeClassName="topNavActive" to="/login">Login</NavLink>
                        <NavLink activeClassName="topNavActive" to="/register">Register</NavLink>
                    </>
                    ) : (
                    <>
                        <NavLink activeClassName="topNavActive" to={`/profile/${authState.username}`}>{authState.username}</NavLink>
                        
                        <NavLink activeClassName="topNavActive" to="/settings">Settings</NavLink>
                        <NavLink activeClassName="topNavActive" to="/logout" onClick={logout}>Logout</NavLink>
                    </>
                    )} */}
                    {TopNavProfile()}
                    
                </div>
                
                </div>
                {/* <SideNav sidebar={this.state.sidebar}/> */}
                {/* Start of Sidebar */}
                {/* <nav className={sidebar ? 'sidenav active' : 'sidenav'}>
                <ul className='sidenav-items' onClick={showSidebar}>
                    <li className="sidenav-toggle">
                    <Link to="#" className='menu-bars'>
                        <AiIcons.AiOutlineClose className="menu-cross"/>
                    </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                        <NavLink activeClassName="sideNavActive" to={item.path} >
                            {item.icon}
                            <span>{item.title}</span>
                        </NavLink>
                        </li>
                    )
                    })}
                </ul>
                </nav> */}
                <Sidebar sidebar={sidebar} onClick={showSidebar}/>
            
        </>
    )
}
    


// class SideNav extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activePath: props.pathname,
//       sidebar: props.sidebar
//       // setSidebar: false
//     }

//   }
//   showSidebar() {
//     // setSidebar(!sidebar)
//     if (this.sidebar === false) {
//       this.props.setState({
//         sidebar: true
//       });
//     } else {
//       this.props.setState({
//         sidebar: false
//       });
//     }
//   }

//   // showSidebar() {
//   //   this.setState(state => ({
//   //      sidebar: !state.sidebar
//   //   }));
//   // }

//   render () {
//     // const { activePath} = this.state;
//     // const [sidebar, setSidebar] = useState(false)
//     // const showSidebar = () => setSidebar(!sidebar)
//     return (
//       <nav className={this.props.sidebar ? 'nav-menu active' : 'nav-menu'}>
//           <ul className='nav-menu-items' onClick={this.showSidebar}>
//             <li className="navbar-toggle">
//               <Link to="#" className='menu-bars'>
//                 <AiIcons.AiOutlineClose />
//               </Link>
//             </li>
//             {SidebarData.map((item, index) => {
//               return (
//                 <li key={index} className={item.cName}>
//                   <Link to={item.path} active={item.path === this.activePath}>
//                     {item.icon}
//                     <span>{item.title}</span>
//                   </Link>
//                 </li>
//               )
//             })}
//           </ul>
//         </nav>
//     )
//   }
// }


export default Navbar
