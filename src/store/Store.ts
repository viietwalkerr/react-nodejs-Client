import { applyMiddleware, createStore, Reducer, compose } from "redux";
import { History } from "history";
import { ApplicationState } from ".";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";

export default function configureStore(
    history: History,
    rootReducer: Reducer,
    initialState?: ApplicationState,
) {
    const middleware = [thunk, routerMiddleware(history)];

    const enhancers = [];
    const windowIfDefined =  
    typeof window === "undefined" ? null : (window as any);
    if (windowIfDefined && windowIfDefined.___REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.___REDUX_DEVTOOLS_EXTENSION__());
    }
    
    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}
