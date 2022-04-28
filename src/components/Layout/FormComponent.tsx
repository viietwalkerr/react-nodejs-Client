import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as Yup from "yup";
import "./FormComponent.scss";
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

const initialValuesChangePassword = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
}

const validationSchemaLogin = Yup.object().shape({
    username: Yup.string().required("Please enter a username"),
    password: Yup.string().required('Please enter a password'),
})

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

const validationSchemaChangePassword = Yup.object().shape({
    oldPassword: Yup.string().required('Required'),
    newPassword: Yup.string().required('Required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], "Password does not match!").required('Required'),
})

interface FormComponentProps {
    onSubmit?: any;
    type?: "Login" | "Register" | "Create Post" | "Change Password";
    title?: string;
    description?: string;
}

const FormComponent: React.FC<FormComponentProps> = ({
    onSubmit,
    type,
    title = type,
    description = type === "Login" ? "Please enter your login details" 
        : type === "Register" ? "Please enter your details" 
        : "",

}) => {

    const loginForm = () => {
        return (
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
    }

    const registerForm = () => {
        return (
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
        )
    };

    const createPostForm = () => {
        return (
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

    const changePasswordForm = () => {
        return (
            <>
                <div className='textbox'>
                    <ErrorMessage name="post-" component="span" className="error"/>
                    <span className='icon'>
                        <FaIcons.FaLock />
                    </span>
                    <Field 
                        autoComplete="off"
                        id=""
                        className="inputField"
                        name="oldPassword"
                        placeholder="Old Password"
                    />
                </div>
                <div className="textbox">
                    <ErrorMessage name="post-" component="span" className="error"/>
                    <br />
                    <span className="icon">
                        <FaIcons.FaUserLock />
                    </span>
                    <Field 
                        autoComplete="off"
                        id=""
                        className="inputField" 
                        name="newPassword" 
                        placeholder="New Password"
                    />
                </div>
                <div className="textbox">
                    <ErrorMessage name="post-" component="span" className="error"/>
                    <br />
                    <span className="icon">
                        <FaIcons.FaUserLock />
                    </span>
                    <Field 
                        autoComplete="off"
                        id=""
                        className="inputField" 
                        name="confirmNewPassword" 
                        placeholder="Confirm New Password"
                    />
                </div>
            </>
        )
    }

    console.log("TYPE: ", type);
    return (
        <div className="formBox">
            <Formik 
                initialValues={
                    type === "Login" ? initialValuesLogin
                        : type === "Register" ? initialValuesRegister
                        : type === "Create Post" ? initialValuesCreatePost
                        : initialValuesChangePassword
                }
                // onSubmit={loginSubmit}
                validationSchema={
                    type === "Register" ? validationSchemaRegister
                        : type === "Create Post" ? validationSchemaCreatePost
                        : type === "Login" ? validationSchemaLogin
                        : validationSchemaChangePassword
                    }
                onSubmit={onSubmit}
            >
                <Form>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    {type === "Login" ? loginForm()
                        : type === "Register" ? registerForm()
                        : type === "Create Post" ? createPostForm()
                        : changePasswordForm()
                    }
                    <NeonButton 
                        type='submit'
                        title={type === "Create Post" ? "Create Post" : "Submit"}
                    />
                </Form>
            </Formik>
        </div>
    )
}

export default FormComponent
