import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import axiosConfig from "../api/axiosConfig";
import { toast } from "react-toastify";
import { PostFormData } from "../types/postsType";
import { LikeResponseAction, FetchAllPostsAction } from "./Global";

export interface EditPostTitleAction {
    type: "EDIT_POST_TITLE";
}

export interface EditPostTextAction {
    type: "EDIT_POST_TEXT";
}

export interface AddCommentAction {
    type: "ADD_COMMENT";
}

export interface DeleteCommentAction {
    type: "DELETE_COMMENT";
}

export interface CreatePostAction {
    type: "CREATE_POST";
}

export interface LikePostAction {
    type: "LIKE_POST";
    payload: string;
}

// called in Global.ts

