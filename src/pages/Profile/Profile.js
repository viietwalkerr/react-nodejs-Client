import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { baseUrl } from '../../helpers/const';
import axios from 'axios';
import * as AiIcons from 'react-icons/ai';
// import profiledefault from '../uploads/profiledefault.jpg';
// import profilealt from '../assets/profiledefaultuser.jpg';
import Cookies from 'js-cookie';
import "./Profile.scss";
import ProfileCard from '../../components/Layout/Profile/ProfileCard';
import { PostComponent } from '../../components';

// Tabs for profile
// function openCity(e, cityName)
// {
//     var i, tabcontent, tablinks;
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++)
//     {
//         tabcontent[i].style.display = "none";
//     }
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++)
//     {
//         tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }
//     document.getElementById(cityName).style.display = "inline-block";
//     e.currentTarget.className += " active";
// }

function Profile() {

    let { id } = useParams();
    let history = useHistory();
    const [user, setUser] = useState({});
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [tabOpen, setTabOpen] = useState("");

    useEffect(() => {
        axios.get(baseUrl + `auth/userinfo/${id}`).then((response) => {
            setUser({
                username: response.data.username,
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                email: response.data.email
            });
        })
        .catch(err=>{
            console.log(err);
        })

        axios.get(baseUrl + `posts/byuserId/${id}`,).then((response) => {
            setListOfPosts(response.data);
        }).catch(err=>{
            console.log(err);
        });

        // if (!localStorage.getItem("accessToken")) {
        //     history.push("/login");
        if (!Cookies.get()) {
            history.push("/");
        } else {
            axios.get(baseUrl + "posts",
                { 
                    // headers: { accessToken: localStorage.getItem("accessToken")}
                    headers: { accessToken: Cookies.get("access-token") },
                }
            ).then((response) => {
                // contains 2 arrays, listsOfPosts and likedPosts
                setLikedPosts(response.data.likedPosts.map((like) => {
                    return like.PostId;
                }));
            });
        }
    }, [id]);

    const likePost = (postId) => {
        axios.post(baseUrl + "likes", 
            { PostId: postId }, 
            { 
                // headers: { accessToken: localStorage.getItem("accessToken")}
                headers: { accessToken: Cookies.get("access-token") },
            }
        ).then((response) => {
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
    };

    const renderTabbedContent = () => {

        const aboutModifier = tabOpen === "About" ? "active" : "";
        const skillsModifier = tabOpen === "Skills" ? "active" : "";
        const contactModifier = tabOpen === "Contact" ? "active" : "";

        return (
            <div className='tab'>
                <div className="tab-item">
                    {/* <button className="tablinks" onClick={(e) => {openCity(e, 'About')}}>About</button>
                    <button className="tablinks" onClick={(e) => {openCity(e, 'Skills')}}>Skills</button>
                    <button className="tablinks" onClick={(e) => {openCity(e, 'Contact')}}>Contact</button> */}
                    <button className="tablinks" onClick={() => setTabOpen("About")}>About</button>
                    <button className="tablinks" onClick={() => setTabOpen("Skills")}>Skills</button>
                    <button className="tablinks" onClick={() => setTabOpen("Contact")}>Contact</button>
                </div>

                {/* Tab content */}
                <div id="About" className={`tabcontent ${aboutModifier}`}>
                    <h3>User:</h3>
                    <p>Username: {user.username} </p>
                    <p>Firstname: {user.firstname} </p>
                    <p>Lastname: {user.lastname}</p>
                    <p>Email: {user.email}</p>
                </div>
                <div id="Skills" className={`tabcontent ${skillsModifier}`}>
                    <h3>Skills</h3>
                    <ul id="skillsList">
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>PHP</li>
                        <li>React</li>
                        <li>Node.JS</li>
                    </ul>
                </div>
                <div id="Contact" className={`tabcontent ${contactModifier}`}>
                    <h3>Contact</h3>
                    <p>Phone: N/A</p>
                    <p>Email: N/A</p>
                </div>
            </div>
        )
    }

    console.log(listOfPosts.length);
    return (
            <div className="background">
                <main>
                    <div className='profile'>
                    {/* <div className="profile-card">
                        <div className="card-header">
                            <div className="pic">
                                <img src={profiledefault} alt="Missing"/>
                            </div>
                            <div className="name">
                                {user.username}
                            </div>
                            <div className="desc">Developer & Desiger</div>
                                <div className="sm">
                                    <AiIcons.AiFillFacebook />
                                    <AiIcons.AiOutlineTwitter />
                                    <AiIcons.AiFillGithub />
                                </div>
                        </div>
                        <div className="card-footer">
                            <div className="numbers">
                                <div className="item">
                                    <span>{listOfPosts.length}</span>
                                    Posts
                                </div>
                                <div className="item">
                                    <span>0</span>
                                    Followers
                                </div>
                                <div className="item">
                                    <span>0</span>
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
                    <div id="About" className="tabcontent">
                        <h3>User:</h3>
                        <p>Username: {user.username} </p>
                        <p>Firstname: {user.firstname} </p>
                        <p>Lastname: {user.lastname}</p>
                        <p>Email: {user.email}</p>
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
                    </div> */}
                    <ProfileCard 
                        user={user}
                        userPostsNumber={listOfPosts.length}
                    >
                        {renderTabbedContent()}
                    </ProfileCard>
                    <div className="user-posts">
                        {listOfPosts.map((value, key) => {
                            return (
                                <PostComponent 
                                    key={key}
                                    onClickTitle={() => {history.push(`/post/${value.id}`)}}
                                    onClickBody={() => {history.push(`/post/${value.id}`)}}
                                    onClickLike={() => {likePost(value.id)}}
                                    post={value}
                                    likedList={likedPosts}
                                />
                                // <div key={key} className="post">
                                //     <div className="title">
                                //         {value.title}
                                //     </div>
                                //     <div 
                                //         className="body"
                                //         onClick={() => {
                                //             history.push(`/post/${value.id}`);
                                //         }}
                                //     >
                                //         {value.postText}
                                //     </div>
                                //     <div className="footer">
                                //         <div className="username">{value.username}</div>
                                //         {!likedPosts.includes(value.id) ? (
                                //             <div className="likeButtons">
                                //                 <AiIcons.AiOutlineLike className="likeIcon" onClick={() => {likePost(value.id)}}/>
                                //             </div>
                                //         ) : (
                                //             <div className="likeButtons">
                                //                 <AiIcons.AiFillLike className="likeIcon" onClick={() => {likePost(value.id)}}/>
                                //             </div>
                                //         )}
                                //         <label>{value.Likes.length}</label>
                                //     </div>
                                // </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Profile
