import React, { /*useContext,*/ useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import { AuthContext } from "../helpers/AuthContext";

function Test() {
    let { id } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    // const { authState } = useContext(AuthContext);

    const [testObjects, setTestObjects] = useState([]);


    useEffect(() => {
        
        axios.get(`https://www.omdbapi.com/?apikey=1baef772&s=witch`).then((response) => {
            setTestObjects(response.data);
        })
    
    }, []);

    const addComment = () => {
        axios.post("http://localhost:3001/comments", {
            commentBody: newComment, 
            PostId: id
        },
        {
            headers: {
                // accessToken: sessionStorage.getItem("accessToken"),
                accessToken: localStorage.getItem("accessToken"),
            },
        }
        ).then((response) => {
            if (response.data.error){
                alert(response.data.error);

            } else {
                // this section makes new comment appear automatically
                const commentToAdd = {commentBody: newComment, username: response.data.username}
                setComments([...comments, commentToAdd]) //add new element to array
                setNewComment(""); //set new comment to empty string
            }
            
        });
    }

    // const deleteComment = (id) => {
    //     // use ` to add js variables
    //     axios.delete(`http://localhost:3001/comments/${id}`, {
    //         headers: {accessToken: localStorage.getItem("accessToken")},
    //     })
    //     .then(()=> {
    //         //loops through list of comments, and grabs each comment in variable val
    //         setComments(
    //             comments.filter((val) => {
    //                 return val.id !== id;
    //             })
    //         );
    //     }); 
    // };

    return (
        <div className="background">
            <main>
                <h2>Post #{id}</h2>
                <div className="postPage">
                    <div className="leftSide">
                        <div className="post" id="individual">
                            <div className="title">  </div>
                            <div className="body">  </div>
                            <div className="footer">  </div>
                        </div>
                        <div className="post">
                            <div>{testObjects.Search.map((testObject, key) => {
                                return (
                                    <div key={key}>
                                        <label>Title: </label>{testObject.Title}
                                        <div><label>Year: </label>{testObject.Year}</div>
                                        <div><label>imdbID: </label>{testObject.imdbID}</div>
                                        <div><label>Type: </label>{testObject.Type}</div>
                                        <div><label>Poster: </label>{testObject.Poster}</div>
                                        <hr></hr>
                                    </div>
                                );
                            })}
                            </div>
                        </div>
                    </div>
                    <div className="rightSide">
                        <div className="addCommentContainer">
                            <button onClick={addComment}> Add Comment </button>
                        </div>
                        {/* <div className="listOfComments">
                            {comments.map((comment, key) => {
                                return (

                                    <div key={key} className="comment"> 
                                        {comment.commentBody} 
                                        <div><label> By User: {comment.username}</label></div>
                                        
                                        {authState.username === comment.username && (
                                            <button className="rainbowButton" onClick={() => {deleteComment(comment.id)}}><span> Delete </span></button>
                                        )}
                                    </div>
                                );
                            })}
                        </div> */}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Test
