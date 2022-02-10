import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../helpers/const';
import { AuthContext } from "../../helpers/AuthContext";
import axios from 'axios';
import * as AiIcons from 'react-icons/ai';
import Cookies from 'js-cookie';
import PostComponent from "../../components/Post/PostComponent";
import Comments from "../../components/Post/Comments";
import Page from '../../components/Layout/Common/Page/Page';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Global';
import "./Post.scss";

interface PostProps {

}

const Post: React.FC<PostProps> = ({


}) => {
    let { id } = useParams<{id: string}>();
    // const { authState } = useContext(AuthContext);
    // const [postObject, setPostObject] = useState([]);
    // const [likedPosts, setLikedPosts] = useState([]);
    // const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    // const [listOfPosts, setListOfPosts] = useState([]);

    // const postObject = useSelector(
    //     (state: ApplicationState) => state.global?.listOfPosts.find((post) => post.id.toString() === id)
    // );

    const postObject = useSelector(
        (state: ApplicationState) => state.global?.listOfPosts[parseInt(id)-1]
    );
    console.log(postObject);

    const username = useSelector(
        (state: ApplicationState) => state.user?.userName
    );

    const likedList = useSelector(
        (state: ApplicationState) => state.global?.likedPosts
    );

    const { 
        likePost,
        fetchComments,
        fetchAllLikes,
        editPostTitle,
        editPostBody,
        addComment,
        deleteComment,
        fetchAllPosts,
    } = bindActionCreators(
        actionCreators, useDispatch()
    );

    useEffect(() => {
        // fetchComments(id);
        // fetchAllLikes();
    }, []);

    const comments = useSelector(
        (state: ApplicationState) => state.global?.postComments
    );
    console.log(comments);
    console.log(likedList);
    // useEffect(() => {
    //     axios.get(
    //         baseUrl + `posts/byId/${id}`,
    //     )
    //     .then((response) => {
    //     // console.log(response);
    //     // setListOfPosts(response.data);
    //         setPostObject(response.data);
    //     });
    //     axios.get(baseUrl + "posts",
    //         { 
    //             headers: { accessToken: Cookies.get("access-token") },
    //         }
             
    //         // { withCredentials: true }
    //     )
    //     .then((response) => {
    //         setListOfPosts(response.data.listOfPosts);
    //         setLikedPosts(response.data.likedPosts.map((like)=> {
    //             return like.PostId;
    //         }));
    //     });
        
    //     axios.get(baseUrl + `comments/${id}`
         
    //     ).then((response) => {
    //         setComments(response.data);
    //     });
    // }, []);
    const likePostFunction = () => {
        // axios.post(baseUrl + "likes", 
        //     { PostId: postId }, 
        //     { 
        //         headers: { accessToken: Cookies.get("access-token") },
        //     }
        // ).then((response) => {
        //     setListOfPosts(
        //         listOfPosts.map((post) => {
        //             if (post.id === postId) {
        //                 if (response.data.liked) {
        //                     return {...post, Likes: [...post.Likes, 0]};
        //                 } else {
        //                     const likesArray = post.Likes;
        //                     likesArray.pop();
        //                     return {...post, Likes: likesArray};
        //                 }
        //             } else {
        //                 console.log(post);
        //                 return post
        //             }
        //         })
        //     );
        //     if (likedPosts.includes(postId)) {
        //         setLikedPosts(
        //             likedPosts.filter((id) =>{
        //                 return id !== postId;
        //             })
        //         );
        //     } else {
        //         setLikedPosts([...likedPosts, postId]);
        //     }
        // });
        likePost(parseInt(id))
        // fetchAllPosts();
    };
        
    const addCommentFunction = (comment: string) => {
        // axios.post(baseUrl + "comments", 
        //     {
        //         commentBody: newComment, 
        //         PostId: id
        //     },
        //     {
        //         // headers: { accessToken: localStorage.getItem("accessToken") },
        //         headers: { accessToken: Cookies.get("access-token") },
        //     }
        // ).then((response) => {
        //     if (response.data.error){
        //         alert(response.data.error);
        //     } else {
        //         // this section makes new comment appear automatically
        //         const commentToAdd = {commentBody: newComment, username: response.data.username}
        //         setComments([...comments, commentToAdd]) //add new element to array
        //         setNewComment(""); //set new comment to empty string
        //     }
        // });
        addComment(comment, 1);
        fetchComments(id);
    };

    const deleteCommentFunction = (id: string) => {
        // use ` to add js variables
        // axios.delete(baseUrl + `comments/${id}`, 
        //     {
        //         // headers: {accessToken: localStorage.getItem("accessToken")},
        //         headers: { accessToken: Cookies.get("access-token") },
        //     }
        // )
        // .then(()=> {
        //     //loops through list of comments, and grabs each comment in variable val
        //     setComments(
        //         comments.filter((val) => {
        //             return val.id !== id;
        //         })
        //     );
        // }); 
        deleteComment(id)
        fetchComments(id);
    };

    // const deletePost = (id) => {
    //     axios.delete(baseUrl + `/posts/${id}`, 
    //         {
    //             // headers: { accessToken: localStorage.getItem("accessToken") },
    //             headers: { accessToken: Cookies.get("access-token") },
    //         }
    //     )
    //     .then(() => {
    //         console.log("wow it did something!");
    //     });
    // };

    // const deletePost = (id) => {
    //     axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
    //         alert("delete success");
    //         history.push("/");
    //     });
    // };

    const editPostTitleFunction = (id: string) => {

        // if (option === "title") {
        //     let newTitle = prompt("Enter New Title:");
        //     axios.put(baseUrl + "/posts/title", 
        //         { 
        //             newTitle: newTitle, 
        //             id: id
        //         },
        //         {
        //             // headers: { accessToken: localStorage.getItem("accessToken")}
        //             headers: { accessToken: Cookies.get("access-token") },
        //         }
        //     );
        //     setPostObject({...postObject, title: newTitle});
        // } else {
        //     let newPostText = prompt("Enter New Post Text:");
        //     axios.put(baseUrl + "/posts/postText",
        //         { 
        //             newText: newPostText, 
        //             id: id
        //         },
        //         {
        //             // headers: { accessToken: localStorage.getItem("accessToken")}
        //             headers: { accessToken: Cookies.get("access-token") },
        //         }
        //     );
        //     setPostObject({...postObject, postText: newPostText});
        // }
        let newPostTitle = prompt("Enter New Post Title: ");
        if (newPostTitle) {
            editPostTitle(newPostTitle, id);
            fetchAllPosts();
        }
    };

    const editPostBodyFunction = (id: string) => {
        let newPostBody = prompt("Enter New Post Text: ");
        if (newPostBody) {
            editPostBody(newPostBody, id);
            fetchAllPosts();
        }
    };


    return (
        <Page>
                <h2>Post #{id}</h2>
                <div className="postPage">
                    {/* {listOfPosts.map((value) => {
                        if (value.id === postObject.id) {
                            return (
                                <>
                                    <PostComponent 
                                        id="individual"
                                        onClickTitle={authState.username === postObject.username ? () => {editPost("title")} : undefined
                                            // if (authState.username === postObject.username){
                                            //     editPost("title");
                                            // }
                                        }
                                        onClickBody={() => {
                                            if (authState.username === postObject.username){
                                                editPost("body");
                                            }
                                        }}
                                        onClickDelete={() => {
                                            deletePost(postObject.id);
                                        }}
                                        onClickLike={() => {likePost(value.id)}}
                                        likedList={likedPosts}
                                        post={value}
                                    />
                                    <Comments 
                                        commentsList={comments}
                                        newComment={newComment}
                                        addComment={addComment}
                                        deleteComment={deleteComment}
                                        onChange={(value) =>setNewComment(value)}
                                        // onChange={()}
                                    />
                                </>
                            )
                        }
                    })} */}
                    {/* {postObject && <>
                        <PostComponent 
                            id="individual"
                            onClickTitle={username === postObject?.username ? () => editPostTitleFunction("title", id) : undefined}
                            onClickBody={username === postObject?.username ? () => editPostBodyFunction("body", id) : undefined}
                            onClickLike={likePostFunction(postObject?.id)}
                            post={postObject}
                        />
                        <Comments
                            commentsList={comments}
                            newComment={newComment}
                            addComment={addCommentFunction}
                            deleteComment={deleteCommentFunction}
                            onChange={(value: string) => setNewComment(value)}
                        />
                        </>
                    } */}
                    {postObject ? <>
                        <PostComponent 
                            id="individual"
                            onClickTitle={username === postObject?.username ? () => editPostTitleFunction(id) : undefined}
                            onClickBody={username === postObject?.username ? () => editPostBodyFunction(id) : undefined}
                            onClickLike={likePostFunction}
                            // onClickLike={undefined}
                            post={postObject}
                            likedList={likedList}
                        />
                        <Comments
                            commentsList={comments}
                            newComment={newComment}
                            addComment={addCommentFunction}
                            deleteComment={deleteCommentFunction}
                            onChange={(value: string) => setNewComment(value)}
                        />
                    </> : <></>}

                    
                </div>
            {/* </main>
        </div> */}
        </Page>
    )
}

export default Post
