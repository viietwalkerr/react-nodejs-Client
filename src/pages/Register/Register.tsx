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


function Register() {

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
        // axios.post(baseUrl +"auth/register", data)
        // .then((response)=> {
        //     if (response.data.error){
        //         alert(response.data.error);
        //         console.log(response.data.error);
        //     } else {
        //         console.log(response);
        //         history.push("/success");
        //     }
        // });
        createUserAccount(data);
    };

    return (
        <div className="background">
            <main>
                {/* <Formik 
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    <Form netlify>
                        <div className="formBox">
                            <h2>Register</h2>
                            <p>Please enter your details</p>
                                <div className="textbox">
                                    <ErrorMessage name="firstname" component="span" />
                                    <span className="icon">
                                        <FaIcons.FaUser />
                                    </span>
                                    <Field 
                                        autoComplete="off"
                                        // id="inputCreatePost"
                                        className="inputField" 
                                        name="firstname" 
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className="textbox">
                                    <ErrorMessage name="lastname" component="span" />
                                    <span className="icon">
                                        <FaIcons.FaUserPlus />
                                    </span>
                                    <Field 
                                        autoComplete="off"
                                        // id="inputCreatePost"
                                        className="inputField" 
                                        name="lastname" 
                                        placeholder="Last Name"
                                    />
                                </div>
                                <div className="textbox">
                                    <ErrorMessage name="email" component="span" />
                                    <span className="icon">
                                        <AiIcons.AiFillMail />
                                    </span>
                                    <Field 
                                        autoComplete="off"
                                        // id="inputCreatePost"
                                        className="inputField" 
                                        name="email" 
                                        placeholder="Email Address"
                                    />
                                </div>
                                <div className="textbox">
                                    <ErrorMessage name="username" component="span" />
                                    <span className="icon">
                                        <FaIcons.FaUserTag />
                                    </span>
                                    <Field 
                                        autoComplete="off"
                                        // id="inputCreatePost"
                                        className="inputField" 
                                        name="username" 
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="textbox">
                                    <ErrorMessage name="password" component="span" />
                                    <span className="icon">
                                        <FaIcons.FaLock />
                                    </span>
                                    <Field 
                                        autoComplete="off"
                                        type="password"
                                        // id="inputCreatePost"
                                        className="inputField" 
                                        name="password" 
                                        placeholder="Password"
                                    />
                                </div> */}
                                    {/* <div className="textbox">
                                    <ErrorMessage name="confirmPassword" component="span" />
                                        <span className="icon">
                                            <FaIcons.FaLock />
                                        </span>    
                                    <Field 
                                            autocomplete="off"
                                            type="password"
                                            id="inputCreatePost"
                                            className="inputField" 
                                            name="confirmPassword" 
                                            placeholder="Confirm Password"
                                        />
                                    </div> */}
                            {/* <button type="submit" className="rainbowButton">
                                <span>Register</span>
                            </button>
                        </div>
                    </Form>
                </Formik> */}
                <FormComponent 
                    onSubmit={(data: UserSignupData) => onSubmit(data)}
                    type="register"
                />
            </main>
        </div> 
    )
}

export default Register
