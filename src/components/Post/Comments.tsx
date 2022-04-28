import React, { useContext } from 'react';
import "./Comments.scss"
import NeonButton from '../Input/NeonButton/NeonButton';
import Page from '../Layout/Common/Page/Page';
import { Comment } from '../../types/postsType';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store';


interface CommentsProps {
    commentsList?: Comment[];
    newComment: string;
    addComment: (comment: string) => void;
    deleteComment: (id: string) => void;
    onChange: (value: string) => void;
}

const Comments: React.FC<CommentsProps> = ({
    commentsList,
    newComment,
    addComment, 
    deleteComment,
    onChange,

}) => {

    const user = useSelector((state: ApplicationState) => state.user);

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
                <NeonButton title='Add Comment' onClick={() => addComment(newComment)}/>
            </div>
        )
    }
    const renderComment = (comment: Comment, key: number) => {
        return (
            <div key={key} className="comment"> 
                <div className='comment-text'>
                    {comment.commentBody} 
                </div>
                <div className='user-info'>
                    <div className='username'>
                        <label> By User: {comment.username}</label>
                    </div>
                    {user?.userName === comment.username && (
                    // <button className="rainbowButton" onClick={() => {deleteComment(comment.id)}}><span> Delete </span></button>
                    <div className='delete-button'>
                        <NeonButton title='Delete' onClick={() => {deleteComment(comment.id.toString())}}/>
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
                {commentsList?.map((comment, key) => {
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
