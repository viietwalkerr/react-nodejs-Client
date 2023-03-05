import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import "./Home.scss";
import Page from "../../components/Layout/Common/Page/Page";
import NeonButton from '../../components/Input/NeonButton/NeonButton';
import RainbowButton from '../../components/Input/RainbowButton/RainbowButton';
import PostComponent from "../../components/Post/PostComponent";
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Global';
import { Post } from "../../types/postsType";

const Home: React.FC = ({}) => {

    let navigate = useNavigate();

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
        // console.log("STATEFUL: ",stateful);
    }, [isAuthenticated]);

    const likePostFunction = (postId: number) => {
        likePost(postId);
    }
    return (
        <Page>
            <div className='home'>
                <h2>Posts Feed</h2>
                {listOfPosts?.map((value, key) => {
                    return (
                        <PostComponent 
                            key={key}
                            index={key}
                            onClickTitle={() => {navigate(`/post/${value.id}`)}}
                            onClickBody={() => {navigate(`/post/${value.id}`)}}
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
    )
}

export default Home