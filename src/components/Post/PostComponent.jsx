import React, { useContext } from 'react';
import "./PostComponent.scss";
import { AuthContext } from "../../helpers/AuthContext";
import NeonButton from '../Input/NeonButton/NeonButton';
import * as AiIcons from 'react-icons/ai';

const PostComponent = ({
    id ="",
    onClickTitle,
    onClickBody,
    onClickDelete,
    onClickLike,
    likedList,
    post,
    key,


}) => {
    const idModifier = id === "individual" ? "individual" : "";

    const { authState } = useContext(AuthContext);
    return (
        <div key={key} className="post" id={`${idModifier}`}>
            <div className='title' onClick={onClickTitle}>
                {post.title}
            </div>
            <div className='body' onClick={onClickBody}>
                {post.postText}
            </div>
            <div className='post-footer'>
                <div className='username'>
                    {post.username}
                </div>
                {/* {authState.username === post.username && (
                    <NeonButton title='Delete Post' onClick={onClickDelete}/>
                )} */}
                {!likedList.includes(post.id) ? (
                    <div className='likeButtons'>
                        <AiIcons.AiOutlineLike className='likeIcon' onClick={onClickLike} />
                    </div>
                ) : (
                    <div className='likeButtons'>
                        <AiIcons.AiFillLike className='likeIcon' onClick={onClickLike} />
                    </div>
                )}
                
                <label>{post.Likes.length}</label>
            </div>
        </div>
    )
}

export default PostComponent
