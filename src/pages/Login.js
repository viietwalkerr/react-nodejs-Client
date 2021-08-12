import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import { baseUrl } from '../helpers/const';
import * as FaIcons from 'react-icons/fa';

function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const { authState } = useContext(AuthContext);
    const {setAuthState} = useContext(AuthContext);
    const [loginStatus, setLoginStatus] = useState("");

    let history = useHistory();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        // if (localStorage.getItem("accessToken")){
        //     history.push("/");
        // }
        if (authState.status === true) {
            history.push("/");
        }
    });

    const login = () => {
        const data = {username: username, password: password}; //creating an object
        axios.post(baseUrl + "auth/login",  data
        )
        .then((response) => {
            console.log(response.data)
            if (response.data.error){
                alert(response.data.error);
                console.log(response.data.error);
            } else {
                setLoginStatus(response.data[0].username)
                // localStorage.setItem("accessToken", response.data.token);
                setAuthState({ 
                    username: response.data.username, 
                    id: response.data.id, 
                    status: true 
                });
                history.push("/about");
            }  
        });
    };

    return (
            <div className="background">
                <main>
                    <div className="formBox">
                        <h2>Login</h2>
                        <p>Please enter your login details</p>
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
                                    <span>Sign In</span>
                                </button>
                            </form>
                    </div>
                </main>
            </div>
    );
}

export default Login
