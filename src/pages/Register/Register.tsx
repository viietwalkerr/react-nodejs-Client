import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { baseUrl } from '../../helpers/const';
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import FormComponent from '../../components/Layout/FormComponent';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Auth';
import { useDispatch } from 'react-redux';
import { UserSignupData } from "../../types/userType";
import Page from '../../components/Layout/Common/Page/Page';
import "./Register.scss";

const Register: React.FC = ({ 

    
}) => {

    // axios.defaults.withCredentials = true;
    const { createUserAccount } = bindActionCreators(actionCreators, useDispatch());

    let history = useHistory();
    const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
    };

    //validate input
    const validationSchema = Yup.object().shape({
        firstname: Yup.string(),
        lastname: Yup.string(),
        email: Yup.string().required("You must input an email!"),
        username: Yup.string().min(3).max(15).required("You must input a username!"),
        password: Yup.string().min(4).max(20).required("You must input a password!"),
    });

    const onSubmit = (data: UserSignupData) => {
        createUserAccount(data);
        history.push("/login");
    };

    return (
        <div className="Register">
            <Page>
                <FormComponent 
                    onSubmit={(data: UserSignupData) => onSubmit(data)}
                    type="register"
                />
            </Page>
        </div> 
    )
};

export default Register;
