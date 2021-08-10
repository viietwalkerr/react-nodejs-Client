import React, { /*useContext,*/ useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
// import { AuthContext } from "../helpers/AuthContext";


function CreatePost() {

    // const { authState } = useContext(AuthContext);

    let history = useHistory();
    const initialValues = {
        title: "",
        postText: "",
    };

    //validate input
    // requires login
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            history.push("/login");
        }
    }, [history]); //need to put array or useEffect will continue infinitely
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a Title!"),
        postText: Yup.string().required("You must input text for Post!"),
    });

    const onSubmit = (data) => {

        // console.log(data);
        // Use headers to pass username
        axios.post("http://localhost:3001/posts", data, {
             headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
        // console.log(response);
            // setListOfPosts(response.data);
            // console.log("It Worked!");
            history.push("/");
        }, [history]);
    };

    

    return (
        <div className="background">
            <main>
                
                {/* <div className="createPostPage">
                    <Formik 
                        initialValues={initialValues} 
                        onSubmit={onSubmit} 
                        validationSchema={validationSchema}
                    >
                        <Form className="formContainer">
                        <h2> Create Post </h2>
                            <label>Title: </label>
                            <ErrorMessage name="title" component="span" />
                            <Field 
                                autocomplete="off"
                                id="inputCreatePost" 
                                name="title" 
                                placeholder="(Ex. Title)"
                            />
                            <label>Post: </label>
                            <ErrorMessage name="postText" component="span" />
                            <Field 
                                autocomplete="off"
                                id="inputCreatePost" 
                                name="postText" 
                                placeholder="(Ex. Post)"
                            />
                            <label>Username: </label>
                            <ErrorMessage name="username" component="span" />
                            <Field 
                                autocomplete="off"
                                id="inputCreatePost" 
                                name="username" 
                                placeholder="(Ex. Username)"
                            />
                            <button type="submit">Create Post</button>
                        </Form>
                        
                    </Formik>
                    
                </div> */}
                    <div className="createPostPage">
                    <Formik 
                        initialValues={initialValues} 
                        onSubmit={onSubmit} 
                        validationSchema={validationSchema}
                    >
                        <Form className="formBox">
                        <h2> Create Post </h2>
                            

                            <div className="textbox">
                                    <ErrorMessage name="title" component="span" className="error" />
                                        <br></br>
                                        <span className="icon">
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
                            <button className="rainbowButton" type="submit"><span>Create Post</span></button>
                        </Form>
                        
                    </Formik>
                    
                </div>
            </main>
        </div>
    )
}

export default CreatePost;
