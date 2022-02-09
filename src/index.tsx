import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, Store } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/es/storage";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApplicationState, reducers } from "./store";
import { connectRouter } from "connected-react-router";
import { Router } from "react-router-dom";
import history from "./utils/history";
import configureStore from "./store/Store";


const rootReducer = combineReducers({
  ...reducers,
  router: connectRouter(history),
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: Store<ApplicationState> = configureStore(
  history,
  persistedReducer
)
export const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <App />
        </Router>
      </PersistGate>
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
