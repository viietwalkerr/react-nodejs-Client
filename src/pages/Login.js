import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import { useHistory/*, Redirect */} from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const {setAuthState} = useContext(AuthContext);

    let history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("accessToken")){
            history.push("/");
        }
    })

    const login = () => {
        const data = {username: username, password: password}; //creating an object
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            console.log(response.data)
            if (response.data.error){
                alert(response.data.error);
            } else {
                // sessionStorage.setItem("accessToken", response.data);
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({ 
                    username: response.data.username, 
                    id: response.data.id, 
                    status: true 
                });
                history.push("/");
            } 
            
        });
    };

    return (
        
        // <div>
            <div className="background">
                <main>
                    <div className="formBox">
                        <h2>Login</h2>
                        <p>Please enter your login details</p>
                
                        {/* <div> */}
                            <form>
                            <div className="textbox">
                                <i className="fas fa-user"></i>
                                <span className="icon">
                                    <FaIcons.FaUserAlt />
                                </span>
                                <input 
                                    type='text' 
                                    placeholder='Username' 
                                    onChange={(event) => {
                                        setUsername(event.target.value)
                                    }}
                                />
                            </div>
                            <div className="textbox">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                                <span className="icon">
                                    <FaIcons.FaLock />
                                </span>
                                <input 
                                    type='password' 
                                    placeholder='Password' 
                                    onChange={(event) => {
                                        setPassword(event.target.value)
                                    }}
                                />
                            </div>
                            <button type='submit' className="rainbowButton" onClick={login}>
                                <span>Sign In</span></button>
                                
                            </form>
                        {/* </div> */}
                    </div>
                </main>
            </div>
        // </div>
        
    );
}

export default Login
