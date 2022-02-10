
import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import { Post, Likes, LikesObject, Comment, PostFormData } from "../types/postsType";
import { 
    EditPostTitleAction,
    EditPostTextAction,
    AddCommentAction,
    DeleteCommentAction,
    CreatePostAction,
    LikePostAction,
} from "./Posts";
import { LogoutAction } from "./Auth";
import axiosConfig from "../api/axiosConfig";
import { toast } from "react-toastify";

const API = process.env.REACT_APP_BACKEND_API;

export interface GlobalState {
    listOfPosts: Post[];
    likedPosts: Likes[];
    allLikes: LikesObject[];
    postComments: Comment[];

}

export interface FetchAllPostsAction {
    type: "RECEIVE_ALL_POSTS";
    payload: Post[];
}

export interface FetchAllLikesAction {
    type: "RECEIVE_ALL_LIKES";
    payload: LikesObject[];
}



export interface LikeResponseAction {
    type: "RECEIVE_LIKE_RESPONSE";
    payload: Likes[];
}

export interface FetchCommentsAction {
    type: "RECEIVE_POST_COMMENTS";
    payload: Comment[];
}

export type KnownAction = 
  | LogoutAction
  | FetchAllPostsAction
  | FetchAllLikesAction
  | FetchCommentsAction
  | LikeResponseAction
  | EditPostTitleAction
  | EditPostTextAction
  | AddCommentAction
  | DeleteCommentAction
  | CreatePostAction
  | LikePostAction;


export const actionCreators = {
    fetchAllPosts:
    (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const appState = getState();
        console.log("STATESTUFF: ", appState.auth);
        if (appState && appState.auth?.accessToken) {
            try {
                const res = await axiosConfig.get(`${API}/posts`, {
                    headers: { accessToken: appState.auth.accessToken },
                });
                console.log("RES WEWU", res);
                if (res?.status === 200) {
                    console.log("RES: ",res);
                    dispatch({ 
                        type: "RECEIVE_ALL_POSTS",
                        payload: res.data.listOfPosts,
                    })
                    dispatch({
                        type: "RECEIVE_LIKE_RESPONSE",
                        payload: res.data.likedPosts,
                    })
                    toast.success("Successfully fetched posts");
                }
            } catch (e) {
                console.error(e);
            }
        }
    },
    fetchAllLikes:
    (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const appState = getState();
        console.log("FETCHING_LIKES");
        if (appState && appState.auth?.accessToken) {
            try {
                const res = await axiosConfig.get(`${API}/posts`, {
                    headers: { accessToken: appState.auth.accessToken },
                });
                if (res?.status === 200) {
                    dispatch({
                        type: "RECEIVE_LIKE_RESPONSE",
                        payload: res.data.likedPosts,
                    })
                }
            } catch (e) {
                console.error(e);
            }
        }
    },
    fetchComments:
    (id: string): AppThunkAction<KnownAction> => async (dispatch) => {
        console.log("FETCHING_POST_COMMENTS");
        try {
            const res = await axiosConfig.get(`${API}/comments/${id}`);
            if (res?.status === 200) {
                dispatch({
                    type: "RECEIVE_POST_COMMENTS",
                    payload: res.data,
                })
            }
        } catch (e) {
            console.error(e);
        }
    },
    likePost:
    (PostId: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.auth?.accessToken) {
            try {
                const res = await axiosConfig.post(`${API}/likes`,
                    { PostId: PostId },
                    { headers: { accessToken: appState.auth.accessToken }},
                );
                const res2 = await axiosConfig.get(`${API}/posts`, {
                    headers: { accessToken: appState.auth.accessToken },
                })
                if (res?.status === 200 && res2?.status === 200) {
                    dispatch({
                        type: "LIKE_POST",
                        payload: res.data,
                    })
                    dispatch({
                        type: "RECEIVE_LIKE_RESPONSE",
                        payload: res2.data.likedPosts,
                    })
                    // might be creating a loop in individual post
                    dispatch({
                        type: "RECEIVE_ALL_POSTS",
                        payload: res2.data.listOfPosts,
                    })
                }
            } catch (e) {
                console.log(e);
            }
        }
    },
    editPostTitle:
    (newTitle: string, id: string): AppThunkAction<KnownAction> => 
    async (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.auth?.accessToken) {
            const res = await axiosConfig.put(`${API}/posts/title`, 
                { newTitle: newTitle,
                    id: id,
                },
                {
                    headers: { accessToken: appState.auth.accessToken }
                }
            );
            if (res?.status === 200) {
                toast.success("Successfully changed post Title");
            }
        } 
    },
    editPostBody:
    (newBody: string, id: string): AppThunkAction<KnownAction> => 
    async (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.auth?.accessToken) {
            const res = await axiosConfig.put(`${API}/posts/postText`,
                {
                    newText: newBody,
                    id: id,
                },
                { 
                    headers: { accessToken: appState.auth.accessToken }
                }
            );
            if (res?.status === 200) {
                toast.success("Successfully changed post Text");
            }
        }
    },
    addComment:
    (comment: string, id: number): AppThunkAction<KnownAction> => 
    async (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.auth?.accessToken) {
            const res = await axiosConfig.post(`${API}/comments`,
                { 
                    commentBody: comment,
                    PostId: id,
                },
                { 
                    headers: { accessToken: appState.auth.accessToken }
                },
            );
            console.log(res);
            if (res?.status === 200) {
                toast.success("Successfully added a Comment");
            }
        }
    },
    deleteComment:
    (id: string): AppThunkAction<KnownAction> => 
    async(dispatch, getState) => {
        const appState = getState();
        if (appState && appState.auth?.accessToken) {
            const res = await axiosConfig.delete(`${API}/comments/${id}`,
                {
                    headers: { accessToken: appState.auth.accessToken }
                },
            );
            if (res?.status === 200) {
                toast.success("Successfully deleted a Comment");
            }
        }
    },
    createPost:
    (data: PostFormData): AppThunkAction<KnownAction> => 
    async(dispatch, getState) => {
        const appState = getState();
        if (appState && appState.auth?.accessToken) {
            try {
                const res = await axiosConfig.post(`${API}/posts`, data);
                if (res?.status === 200) {
                    toast.success("Successfully created post");
                }
            } catch (e) {
                console.error(e);
                toast.error("Error creating post");
            }
        }
    },
}

// REDUCER - Given state and action, returns new state. # To support time travel, must not mutate old state.

export const reducer: Reducer<GlobalState | undefined> = (
    state,
    incomingAction: Action
): GlobalState => {
    const defaultState: GlobalState = {
        listOfPosts: [],
        likedPosts: [],
        allLikes: [],
        postComments: [],

    };

    if (state === undefined) {
        return defaultState;
    }

    const action = incomingAction as KnownAction;

    switch (action.type) {
        case "LOGOUT":
            return defaultState;
        case "RECEIVE_ALL_POSTS":
            return { ...state, listOfPosts: action.payload };
        case "RECEIVE_ALL_LIKES":
            return { ...state, allLikes: action.payload };
        case "RECEIVE_LIKE_RESPONSE":
            return { ...state, likedPosts: action.payload };
        case "RECEIVE_POST_COMMENTS":
            return { ...state, postComments: action.payload };
        // case "LIKE_POST":
        //     return { ...state, likedPosts: action.payload }
        default:
            return state;
    }
}