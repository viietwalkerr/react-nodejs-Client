import React, { useContext } from 'react';
import "./Comments.scss"
import { AuthContext } from "../../helpers/AuthContext";
import { NeonButton } from '..';
import Page from '../Layout/Common/Page/Page';

const Comments = ({
    commentsList,
    newComment,
    addComment, 
    deleteComment,
    onChange,

}) => {

    const { authState } = useContext(AuthContext);

    const renderAddComment = () => {
        return (
            <div className='addCommentContainer'>
                {/* <div className='heading'>Add Comment</div> */}
                {/* <h3>Add Comment</h3> */}
                <div className="textbox">
                    <input 
                        type='text' 
                        placeholder='Add a comment...' 
                        autoComplete="off"
                        value={newComment} 
                        // onChange={(event) => {setNewComment(event.target.value)}}
                        // onChange={(event) => onChange(event.target.value)}
                        onChange={(event) => onChange(event.target.value)}
                    />
                </div>
                {/* <button className="rainbowButton" onClick={addComment}><span>Add Comment </span></button> */}
                <NeonButton title='Add Comment' onClick={addComment}/>
            </div>
        )
    }
    const renderComment = (comment, key) => {
        return (
            <div key={key} className="comment"> 
                <div className='comment-text'>
                    {comment.commentBody} 
                </div>
                <div className='user-info'>
                    <div className='username'>
                        <label> By User: {comment.username}</label>
                    </div>
                    {authState.username === comment.username && (
                    // <button className="rainbowButton" onClick={() => {deleteComment(comment.id)}}><span> Delete </span></button>
                    <div className='delete-button'>
                        <NeonButton title='Delete' onClick={() => {deleteComment(comment.id)}}/>
                    </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className='comments'>
            <h2>Comments</h2>
            <div className="listOfComments">
                {commentsList.map((comment, key) => {
                    return (
                        renderComment(comment, key)
                    );
                })}
            </div>
            {renderAddComment()}
        </div>
    )
}

export default Comments
