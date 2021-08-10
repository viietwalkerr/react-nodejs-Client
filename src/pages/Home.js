import React/*, { useContext }*/ from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
// import { FaIcons } from 'react-icons/fa';
// import { AuthContext } from "../helpers/AuthContext";
import { baseUrl } from '../helpers/const';


function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    // const { authState } = useContext(AuthContext);

    let history = useHistory();


    useEffect(() => {
        //redirect 
        if (!localStorage.getItem("accessToken")) {
            history.push("/login");
        } else {
            // axios.get("http://localhost:3001/posts"||
            // "https://react-nodejs-illumin8.herokuapp.com/posts", { headers: { accessToken: localStorage.getItem("accessToken")}}).then((response) => {
            axios.get(baseUrl + "posts", { headers: { accessToken: localStorage.getItem("accessToken")}}).then((response) => {
            // console.log(response);
                // contains 2 arrays, listsOfPosts and likedPosts
                setListOfPosts(response.data.listOfPosts);
                setLikedPosts(response.data.likedPosts.map((like) => {
                    return like.PostId;
                }));
            });
        }
    }, [history]);
    

    const likePost = (postId) => {
        axios.post(
            baseUrl + "likes",
            // "http://localhost:3001/likes"||
            // "https://react-nodejs-illumin8.herokuapp.com/likes", 
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
                // alert(likedPosts);
                setLikedPosts(
                    likedPosts.filter((id) => {
                        return id !== postId;
                    })
                )
                // alert(likedPosts);
            } else {
                setLikedPosts([...likedPosts, postId]);
            }
        });
    }
    return (
        // <div>
            <div className="background">
                <main className="posts">
                    {/* <div className="formBox"> */}
                    <h2>Posts Feed</h2>
                    {listOfPosts.map((value, key) => { 
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
                    })}
                    {/* </div> */}
                </main>
            </div>
        // </div>
    )
}

export default Home