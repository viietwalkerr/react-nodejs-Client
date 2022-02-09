import React, { useContext, useEffect } from 'react';
import "./PostComponent.scss";
import { AuthContext } from "../../helpers/AuthContext";
import NeonButton from '../Input/NeonButton/NeonButton';
import * as AiIcons from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { Likes, Post } from '../../types/postsType';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Global';

interface PostComponentProps {
    id?: string;
    onClickTitle: (() => void) | undefined;
    onClickBody: (() => void) | undefined;
    onClickDelete?: (() => void) | undefined;
    onClickLike: (() => void) | any | undefined;
    likedList?: Likes[];
    post: Post,
    key?: any,
};

const PostComponent: React.FC<PostComponentProps> = ({
    id = "",
    onClickTitle,
    onClickBody,
    onClickDelete,
    onClickLike,
    likedList,
    post,
    key,


}) => {
    const idModifier = id === "individual" ? "individual" : "";

    // const { authState } = useContext(AuthContext);
    // const { fetchAllLikes } = bindActionCreators(actionCreators, useDispatch());

    // const likedList = useSelector(
    //     (state: ApplicationState) => state.global?.likedPosts
    // );
    // useEffect(() => {
    //     // fetchAllLikes();
    // }, [post.Likes.length]);

    const userId = useSelector(
        (state: ApplicationState) => state.auth?.id
    );
    // console.log(userId);
    // console.log(likedList);

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
               
                {!likedList?.find(UserId => UserId.UserId === userId && post.id === UserId.PostId) ? (
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
