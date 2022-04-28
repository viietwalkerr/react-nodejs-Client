import React from "react";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { combineReducers, Store } from "redux";
import { ApplicationState, reducers } from "./store";
import history from "./utils/history";
import { connectRouter } from "connected-react-router";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";

// import persistReducer from "redux-persist/es/persistReducer";
// import persistStore from "redux-persist/es/persistStore";
// import { persistReducer } from "redux-persist";
// import { persistStore } from "redux-persist";
import configureStore from "./store/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import * as ReactDOMClient from "react-dom/client";


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

const root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>,
  </React.StrictMode>,
);

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <Router history={history}>
//           <App />
//         </Router>
//       </PersistGate>
//     </Provider>,
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
