import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import  profileDefault from '../uploads/profileDefault.jpg';
import * as AiIcons from 'react-icons/ai';
import { AuthContext } from "../helpers/AuthContext";

//tabs for profile
function openCity(e, cityName)
{
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++)
    {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++)
    {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    e.currentTarget.className += " active";
}

function Profile() {

    let { id } = useParams();
    let {usernameInput} = useParams();
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/userinfo/${id}`||
        `https://react-nodejs-illumin8.herokuapp.com/auth/userinfo/${id}`)
        .then((response) => {
            // console.log(response);
            // alert(response.data.username);
            // alert("Found username using ID");
            // alert(response.data.firstname);
            // alert(response.data.lastname);
            // alert(response.data.email);
            setUsername(response.data.username);
            setFirstname(response.data.firstname);
            setLastname(response.data.lastname);
            setEmail(response.data.email);
        })
        .catch(err=>{
            console.log(err);
        })

        axios.get(`http://localhost:3001/posts/byuserId/${id}`||
        `https://react-nodejs-illumin8.herokuapp.com/posts/byuserId/${id}`).then((response) => {
            setListOfPosts(response.data);
            
        }).catch(err=>{
            console.log(err);
        });

        // axios.get(`http://localhost:3001/auth/userinfoo/${usernameInput}`)
        // .then((response) => {
        //     setUsername(response.data.username);
        //     console.log(response);
        //     alert(response);
        //     alert("Found object using username");
        // })
        // .catch(err=>{
        //     console.log(err);
        // })
        if (!localStorage.getItem("accessToken")) {
            history.push("/login");
        } else {
            axios.get("http://localhost:3001/posts"||
            "https://react-nodejs-illumin8.herokuapp.com/posts", { headers: { accessToken: localStorage.getItem("accessToken")}}).then((response) => {
                // console.log(response);
                // contains 2 arrays, listsOfPosts and likedPosts
                setLikedPosts(response.data.likedPosts.map((like) => {
                    return like.PostId;
                }));
            });
        }
        
    }, [history]);

    const likePost = (postId) => {
        axios.post(
            "http://localhost:3001/likes"||
            "https://react-nodejs-illumin8.herokuapp.com/likes", 
            { PostId: postId }, 
            { headers: { accessToken: localStorage.getItem("accessToken")}}
        ).then((response) => {
            // alert(response.data);
            // Grab list, modify it, then set state to modified list (update)
            setListOfPosts(
                listOfPosts.map((post) => {
                    // specific post
                    if (post.id === postId) {
                        if (response.data.liked) {
                            // ...post (keep everything in the post the same, but at the end, add item)
                            return {...post, Likes: [...post.Likes, 0] };
                        } else {
                            const likesArray = post.Likes;
                            // pop removes last element
                            likesArray.pop();
                            // return modified item (array with 1 less item)
                            return {...post, Likes:  likesArray};
                        }
                    } else {
                        return post;
                    }
                })
            );

            if (likedPosts.includes(postId)) {
                setLikedPosts(
                    likedPosts.filter((id) => {
                        return id !== postId;
                    })
                );
            } else {
                setLikedPosts([...likedPosts, postId]);
            }
        });
    }

    

    // useEffect(() => {
    //     axios.get(`http://localhost:3001/auth/userinfoo/${usernameInput}`)
    //     .then((response) => {
    //         setUsername(response.data.username);
    //         console.log(response);
    //         alert(response);
    //         alert("Found object using username");
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //     })
    // }, []);

    // let { username } = useParams();
    // const [username, setUsername] = useState("");
    // const [firstname, setFirstname] = useState("");
    // const [lastname, setLastname] = useState("");
    // const [email, setEmail] = useState("");
    // const [tokenstuff, setTokenStuff] = useState("");

    // useEffect(() => {
    //     axios.get(`http://localhost:3001/auth/token/`, {
    //         headers: { accessToken: localStorage.getItem("accessToken")},
    //     })
    //     .then((response) => {
    //         setUsername(response.data.username);
    //         setFirstname(response.data.firstname);
    //         setLastname(response.data.lastname);
    //         setEmail(response.data.email);
    //         setTokenStuff(response.data.token);
    //     })
    // }, []);

    return (
        //<div>
            <div className="background">
                <main>
                    <div className="profile-card">
                        <div className="card-header">
                            <div className="pic">
                            {/* <img src='UPLOADS/".$username."/".$username.".jpg'> */}
                                    
                                <img src={profileDefault}/>
                                    
                                {/* <img src="ASSETS/images/smoking panda.jpg" alt="John"> */}
                            </div>
                            <div className="name">
                                {username}
                            </div>
                            <div className="desc">Developer & Desiger</div>
                                <div className="sm">
                                    <a href="#" className=" fab fa-facebook-f"></a>
                                    <a href="#" className=" fab fa-twitter"></a>
                                    <a href="#" className=" fab fa-github"></a>
                                    <a href="#" className=" fab fa-youtube"></a>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="numbers">
                                    <div className="item">
                                        <span>120</span>
                                            Posts
                                    </div>
                                    <div className="item">
                                        <span>584</span>
                                        Followers
                                    </div>
                                    <div className="item">
                                        <span>423</span>
                                        Following
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab">
                            <button className="tablinks" onClick={(e) => {openCity(e, 'About')}}>About</button>
                            <button className="tablinks" onClick={(e) => {openCity(e, 'Skills')}}>Skills</button>
                            <button className="tablinks" onClick={(e) => {openCity(e, 'Contact')}}>Contact</button>
                        </div>

                         {/* Tab content */}
                        <div id="About" className="tabcontent">
                            <h3>User:</h3>
                        
                            <p>Username: {username} </p>
                            <p>Firstname: {firstname} </p>
                            <p>Lastname: {lastname}</p>
                            <p>Email: {email}</p>
                            
                        </div>
                        <div id="Skills" className="tabcontent">
                            <h3>Skills</h3>
                            <ul id="skillsList">
                                <li>HTML</li>
                                <li>CSS</li>
                                <li>JavaScript</li>
                                <li>PHP</li>
                                <li>React (In Progress)</li>
                                <li>Node.JS (In Progress)</li>
                            </ul>
                        </div>
                    <div id="Contact" className="tabcontent">
                        <h3>Contact</h3>
                        <p>Phone: N/A</p>
                        <p>Email: N/A</p>
                    </div>
                    <div className="listOfPosts">
                        {listOfPosts.map((value, key) => {
                            return (
                                <div key={key} className="post">
                                    <div className="title">
                                        {value.title}
                                    </div>
                                    <div 
                                        className="body"
                                        onClick={() => {
                                            history.push(`/post/${value.id}`);
                                        }}
                                    >
                                        {value.postText}

                                    </div>
                                    <div className="footer">
                                        <div className="username">{value.username}</div>
                                        {!likedPosts.includes(value.id) ? (
                                            <div className="likeButtons">
                                                <AiIcons.AiOutlineLike className="likeIcon" onClick={() => {likePost(value.id)}}/>
                                            </div>
                                        ) : (
                                            <div className="likeButtons">
                                                <AiIcons.AiFillLike className="likeIcon" onClick={() => {likePost(value.id)}}/>
                                            </div>
                                        )}
                                        <label>{value.Likes.length}</label>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>
        //</div>
    )
}

export default Profile
