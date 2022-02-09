import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import { LogoutAction } from "./Auth";
import { User, UserUpdateData } from "../types/userType";
import axiosConfig from "../api/axiosConfig";

const API = process.env.REACT_APP_BACKEND_API;

export interface UserState extends User {
    
}

export interface FetchUserDataAction {
    type: "RECEIVE_USER_DATA";
    payload: {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
        username: string;
    };
}


//
export type KnownAction = 
  | LogoutAction
  | FetchUserDataAction;

export const actionCreators = {
    fetchUserData:
    (id: number): AppThunkAction<KnownAction> => async (dispatch) => {
        try {
            const res = await axiosConfig.get(`${API}/auth/userData/${id}`);
            if (res.status === 200) {
                dispatch({
                    type: "RECEIVE_USER_DATA",
                    payload: res.data,
                })
            }
        } catch (e) {
            console.error(e);
        }
    },
}

export const reducer: Reducer<UserState | undefined> = (
    state,
    incomingAction: Action
): UserState => {
    const defaultState: UserState = {
        id: undefined,
        firstName: "",
        lastName: "",
        // imageUrl: "",
        userName: "",
        email: "",
    };

    if (state === undefined) {
        return defaultState;
    }

    const action = incomingAction as KnownAction;

    switch (action.type) {
        case "LOGOUT":
            return defaultState;
        case "RECEIVE_USER_DATA":
            const updatedState = {
                ...state, 
                id: action.payload.id,
                firstName: action.payload.firstname,
                lastName: action.payload.lastname,
                userName: action.payload.username,
                email: action.payload.email,
            }
            return updatedState;
        default:
            return state;
    }
};