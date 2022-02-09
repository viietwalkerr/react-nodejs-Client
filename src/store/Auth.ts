import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import { UserSignupData } from "../types/userType";
import axiosConfig from "../api/axiosConfig";
import Post from "../pages/Post/Post";
import axios, { AxiosResponse } from "axios";

const API = process.env.REACT_APP_BACKEND_API;

export interface AuthState {
    isAuthenticated: boolean;
    accessToken?: string;
    tokenExpiry?: Date;
    password?: string;
    rememberMe?: boolean;
    email?: string;
    id?: number;
}

export interface TokenResponse {
    accessToken: string;
    user: {
        firstname: string,
        lastname: string,
        email: string,
        username: string,
        id: number,
    }
}

export interface LogoutAction {
    type: "LOGOUT";
}

export interface CreateUserAccountAction {
    type: "CREATE_USER_ACCOUNT";
    payload: {
        created: boolean;
    };
}

export interface LoginAction {
    type: "LOGIN_USER";
    payload: {
        accessToken: string;
        user?: {
            firstname: string,
            lastname: string,
            email: string,
            username: string,
            id: number,
        }
    };
}

// 
export type KnownAction = 
  | LogoutAction
  | CreateUserAccountAction
  | LoginAction;



export const actionCreators = {
    createUserAccount:
    (
        signUpRequestData: UserSignupData,
        // code: string,
    ): AppThunkAction<KnownAction> =>
    async (dispatch) => {
        try {
            const response = await axiosConfig.post(`${API}/auth/register`, {
                user: signUpRequestData,
                // code: code,
            });
            if (response.data === true) {
                dispatch({
                    type: "CREATE_USER_ACCOUNT",
                    payload: { created: true },
                });
            } else if (response.data === false) {
                dispatch({
                    type: "CREATE_USER_ACCOUNT",
                    payload: { created: false },
                });
                console.log("NO");
                return false;
            }
        } catch (e) {
            console.error(e);
        }
    },
    loginUser:
    (data: {username: string, password: string}): AppThunkAction<KnownAction> =>
    async (dispatch) => {
        try {
            console.log("DATATEST: ", data);
            console.log(API);
            // Check with backend
            const response: AxiosResponse<TokenResponse> = await axiosConfig.post(
                `${API}/auth/login`,
                { data }
            );
            console.log("TEST");
            // Successful backend response
            if (response.status === 200) {
                console.log("DATA: ", response.data);
                const { accessToken, user } = response.data;
                dispatch({
                    type: "LOGIN_USER",
                    payload: { accessToken, user },
                });
            } else {
                throw new Error("Login failed. Please try again.");
            }
        } catch (e) {
            console.error(e);
        }
    },
    logoutUser:
    (): AppThunkAction<KnownAction> =>
    async (dispatch) => {
        try {
            const response = await axiosConfig.get(`${API}/auth/logout`);
            if (response.status === 200) {
                dispatch({
                    type: "LOGOUT",
                })
            }
        } catch (e) {
            console.log(e);
        }
    },
};

export const reducer: Reducer<AuthState> = (
    state: AuthState | undefined, 
    incomingAction: Action
): AuthState => {
    const defaultState = {
        isAuthenticated: false,
        accessToken: undefined,
        password: undefined,
        rememberMe: undefined,
        id: undefined,
    };

    if (state === undefined) {
        return defaultState;
    }

    const action = incomingAction as KnownAction;

    switch(action.type) {
        case "LOGOUT":
            return defaultState;
        case "LOGIN_USER":
            if (action.payload.accessToken !== null) {
                const updatedState = {
                    ...state,
                    email: action.payload.user?.email,
                    accessToken: action.payload.accessToken,
                    isAuthenticated: action.payload.accessToken != null,
                    id: action.payload.user?.id,
                }
                return updatedState;
            }
            break;
        case "CREATE_USER_ACCOUNT":
            const updatedState = {
                ...state,
            };
            return updatedState;
        default: 
            return state;
    }
    return state;
};