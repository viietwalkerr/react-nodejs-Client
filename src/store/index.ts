import * as Auth from "./Auth";
import * as User from "./User";
import * as Global from "./Global";

export interface ApplicationState {
    auth: Auth.AuthState | undefined;
    user: User.UserState | undefined;
    global: Global.GlobalState | undefined;
};

export const reducers = {
    auth: Auth.reducer,
    user: User.reducer,
    global: Global.reducer,

};


export interface AppThunkAction<TAction> {
    (dispach: (action: TAction) => void, getState: () => ApplicationState): void;
}