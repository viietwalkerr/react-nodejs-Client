import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as Yup from "yup";
import "./FormComponent.css";
import NeonButton from '../Input/NeonButton/NeonButton';
// import { NeonButton } from '../../components';

const initialValuesLogin = {
    username: "",
    password: "",
};

const initialValuesRegister = {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
}

const initialValuesCreatePost = {
    title: "",
    postText: "",
}

const validationSchemaRegister = Yup.object().shape({
    firstname: Yup.string(),
    lastname: Yup.string(),
    email: Yup.string().required("You must input an email!"),
    username: Yup.string().min(3).max(15).required("You must input a username!"),
    password: Yup.string().min(4).max(20).required("You must input a password!"),
});

const validationSchemaCreatePost = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required("You must input text for Post!"),
});

const FormComponent = ({
    onSubmit,
    type,
    title = type === "login" ? "Login" ? "register" : "Register" : "Create Post",
    description = type === "login" ? "Please enter your login details" ? "register" : "Please enter your details" : "",

}) => {
    return (
        <div className="formBox">
            <Formik 
                initialValues={type === "login" ? initialValuesLogin ? type === "register" : initialValuesRegister : initialValuesCreatePost}
                // onSubmit={loginSubmit}
                validationSchema={type === "register" ? validationSchemaRegister ? type === "create post" : validationSchemaCreatePost : undefined}
                onSubmit={onSubmit}
            >
                <Form>
                    {/* <div className="formBox"> */}
                        {/* <h2>Login Formik</h2> */}
                        {/* <h2>Login</h2> */}
                        <h2>{title}</h2>
                        {/* <p>Please enter your login details</p> */}
                        <p>{description}</p>
                        
                        {type === "login" ? (
                            <>
                                <div className="textbox">
                                    <span className="icon">
                                        <FaIcons.FaUserAlt />
                                    </span>
                                    <Field
                                        autoComplete="off"
                                        className="inputField"
                                        name="username"
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="textbox">
                                    <span className="icon">
                                        <FaIcons.FaLock />
                                    </span>
                                    <Field 
                                        autoComplete="off"
                                        className="inputField"
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                    />
                                </div>
                            </>
                        )
                        ? type === "register" : (
                            <>
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
                                </div>
                            </> 
                        ) : (
                            <>
                                <div className='textbox'>
                                <ErrorMessage name="post-" component="span" className="error"/>
                                    <span className='icon'>
                                        <FaIcons.FaInfo />
                                    </span>
                                    <Field 
                                        autoComplete="off"
                                        id=""
                                        className="inputField"
                                        name="title"
                                        placeholder="Title"
                                    />
                                </div>
                                <div className="textbox">
                                    <ErrorMessage name="post-" component="span" className="error"/>
                                        <br />
                                        <span className="icon">
                                            <FaIcons.FaRegEdit />
                                        </span>
                                        <Field 
                                            autoComplete="off"
                                            id=""
                                            className="inputField" 
                                            name="postText" 
                                            placeholder="Post"
                                        />
                                </div>
                            </>
                            )
                        }


                            {/* <button type="submit" className="rainbowButton">
                                <span>Submit</span>
                            </button> */}
                            <NeonButton 
                                type='submit'
                                title={type === "create post" ? "Create Post" : "Submit"}
                            />
                    {/* </div> */}
                </Form>
            </Formik>
        </div>
    )
}

export default FormComponent
