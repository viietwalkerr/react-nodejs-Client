import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from "formik";
import { useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import Cookies from 'js-cookie';
import FormComponent from '../../components/Layout/FormComponent';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { LoginData } from '../../types/userType';
import { ApplicationState } from '../../store';
import "./Login.scss";
import Page from '../../components/Layout/Common/Page/Page';

const Login: React.FC = ({}) => {

    let navigate = useNavigate();
    const { loginUser } = bindActionCreators(actionCreators, useDispatch());
    const isAuthenticated = useSelector(
        (state: ApplicationState) => state.auth?.isAuthenticated
    );

    useEffect(() => {
        if (isAuthenticated) {
            const loginInitialisation = async () => {
                navigate("/home");
            };
            loginInitialisation();
        }
    }, [isAuthenticated]);
    // axios.defaults.withCredentials = true;

    // new stuff
    const loginSubmit = (data: LoginData) => {
        console.log("TEST2: ", data);
        loginUser(data);
    };

    return (
        <div className="login">
            <Page>
                
                <FormComponent 
                    onSubmit={
                        (data: LoginData) => loginSubmit(data)
                    }
                    type="Login"
                />
            </Page>
        </div>
    );
}

export default Login
