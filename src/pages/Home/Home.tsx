import React/*, { useContext }*/ from 'react';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { baseUrl } from '../../helpers/const';
import { AuthContext } from '../../helpers/AuthContext';
import * as AiIcons from 'react-icons/ai';
import Cookies from 'js-cookie';
import "./Home.scss";
import Page from "../../components/Layout/Common/Page/Page";
import NeonButton from '../../components/Input/NeonButton/NeonButton';
import RainbowButton from '../../components/Input/RainbowButton/RainbowButton';
import PostComponent from "../../components/Post/PostComponent";
import Comment from "../../components/Post/Comments";
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Global';
import { Post } from "../../types/postsType";


const Home: React.FC = ({}) => {

    // axios.defaults.withCredentials = true;

    // const [listOfPosts, setListOfPosts] = useState([]);
    // const [likedPosts, setLikedPosts] = useState([]);
    const { authState } = useContext(AuthContext);
    let history = useHistory();

    const isAuthenticated = useSelector(
        (state: ApplicationState) => state.auth?.isAuthenticated
    );
    const { fetchAllPosts, fetchAllLikes, likePost } = bindActionCreators(actionCreators, useDispatch());
    const stateful = useSelector((state: ApplicationState) => state);
    
    const listOfPosts = useSelector((state: ApplicationState) => state.global?.listOfPosts);
    const likedPosts = useSelector((state: ApplicationState) => state.global?.likedPosts)

    useEffect(() => {
        // fetchAllPosts();
        // fetchAllLikes();
        console.log("STATEFUL: ",stateful);
    }, [isAuthenticated]);

    // useEffect(() => {
    //     //redirect 
    //     // if (!localStorage.getItem("accessToken")) {
    //     //     history.push("/login");
    //     // if (authState.status === false) {
    //     //     console.log("TESTING");
    //     //     console.log(authState);
    //     //     // history.push("/");            
    //     // } else {
    //         axios.get(baseUrl + "posts", 
    //             { 
    //             //     headers: { accessToken: localStorage.getItem("accessToken")}
    //                 headers: { accessToken: Cookies.get("access-token") }
    //             }
    //             // { headers: {userId: authState.id, username: authState.username}}
    //         ).then((response) => {
    //             // contains 2 arrays, listsOfPosts and likedPosts
    //             console.log(response.data);
    //             setListOfPosts(response.data.listOfPosts);
    //             setLikedPosts(response.data.likedPosts.map((like) => {
    //                 return like.PostId;
    //             }));
    //         });
    //     // }
    // }, []);
    
    const likePostFunction = (postId: number) => {
        // axios.post(
        //     baseUrl + "likes", 
        //     { PostId: postId }, 
        //     { headers: { accessToken: Cookies.get("access-token")}}
        // ).then((response) => {
        //     // Grab list, modify it, then set state to modified list (update)
        //     setListOfPosts(
        //         listOfPosts.map((post) => {
        //             // specific post
        //             if (post.id === postId) {
        //                 if (response.data.liked) {
        //                     // ...post (keep everything in the post the same, but at the end, add item)
        //                     return {...post, Likes: [...post.Likes, 0] };
        //                 } else {
        //                     const likesArray = post.Likes;
        //                     // pop removes last element
        //                     likesArray.pop();
        //                     // return modified item (array with 1 less item)
        //                     return {...post, Likes:  likesArray};
        //                 }
        //             } else {
        //                 return post;
        //             }
        //         })
        //     );
        
        likePost(postId);
        // fetchAllPosts();
        // fetchAllLikes();
        
        // console.log(likedPosts);
            // listOfPosts?.map((post) => {
            //     if (likedPosts.includes(postId)) {
            //         setLikedPosts(
            //             likedPosts.filter((id) => {
            //                 return id !== postId;
            //             })
            //         )
            //     } else {
            //         setLikedPosts([...likedPosts, postId]);
            //     }
            // });
    }
    return (
        // <div className="background">
        //     <main className="posts">
        <Page>
            <div className='home'>
                <h2>Posts Feed</h2>
                {/* {listOfPosts.map((value, key) => { 
                    return (
                        <div key={key} className="post">
                            <div className="title"> 
                                {value.title} 
                            </div> 
                            <div className="body" onClick={() => {history.push(`/post/${value.id}`)}}> 
                                {value.postText} 
                            </div> 
                            <div className="footer"> 
                                <div className="username">
                                    <Link to={`/profile/${value.username}`}>
                                        {value.username} 
                                    </Link>
                                </div>
                                
                                
                                {!likedPosts.includes(value.id) ? (
                                    <div className="likeButtons">
                                        <AiIcons.AiOutlineLike className="likeIcon" onClick={() => {likePost(value.id)}}/>
                                    </div>
                                ) : (
                                    <div className="likeButtons">
                                        <AiIcons.AiFillLike className="likeIcon" onClick={() => {likePost(value.id)}}/>
                                    </div>
                                )}
                                
                                <label> {value.Likes.length} </label>
                            </div> 
                        </div>
                        );
                    })} */}
                {listOfPosts?.map((value, key) => {
                    return (
                        <PostComponent 
                            key={key}
                            onClickTitle={() => {history.push(`/post/${value.id}`)}}
                            onClickBody={() => {history.push(`/post/${value.id}`)}}
                            onClickLike={() => {likePostFunction(value.id)}}
                            onClickDelete={undefined}
                            post={value}
                            likedList={likedPosts}
                            // likedList={undefined}
                        />
                    )
                })}
            </div>
        </Page>
        //     </main>
        // </div>
    )
}

export default Home