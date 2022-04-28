import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import * as AiIcons from 'react-icons/ai';
// import profiledefault from '../uploads/profiledefault.jpg';
// import profilealt from '../assets/profiledefaultuser.jpg';
import "./Profile.scss";
import ProfileCard from '../../components/Layout/Profile/ProfileCard';
import PostComponent from '../../components/Post/PostComponent';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { Likes, Post } from '../../types/postsType';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Global';

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

interface ProfileProps {

}

const Profile: React.FC<ProfileProps> = () => {

    const id = useSelector(
        (state: ApplicationState) => state.auth?.id
    )
    let navigate = useNavigate();
    const [tabOpen, setTabOpen] = useState("");

    const user = useSelector(
        (state: ApplicationState) => state.user
    )

    const listOfPosts = useSelector((state: ApplicationState) => state.global?.listOfPosts);
    const likedPosts = useSelector((state: ApplicationState) => state.global?.likedPosts)

    const { fetchAllPosts, fetchAllLikes, likePost } = bindActionCreators(actionCreators, useDispatch());

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
                    <p>Username: {user?.userName} </p>
                    <p>Firstname: {user?.firstName} </p>
                    <p>Lastname: {user?.lastName}</p>
                    <p>Email: {user?.email}</p>
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

    return (
            <div className="background">
                <main>
                    <div className='profile'>
                    <ProfileCard 
                        user={user}
                        userPostsNumber={listOfPosts?.length}
                    >
                        {renderTabbedContent()}
                    </ProfileCard>
                    <div className="user-posts">
                        {listOfPosts?.map((value, key) => {
                            return (
                                <PostComponent 
                                    key={key}
                                    onClickTitle={() => {navigate(`/post/${value.id}`)}}
                                    onClickBody={() => {navigate(`/post/${value.id}`)}}
                                    onClickLike={() => {likePost(value.id)}}
                                    post={value}
                                    likedList={likedPosts}
                                />
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Profile
