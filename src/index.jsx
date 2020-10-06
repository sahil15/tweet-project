import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorker from './serviceWorker';
import { createStore } from "redux";
import { Provider } from "react-redux";

import RootStore from "./store/RootStore";
// import MainPage from "./views/MainPage";
import TweetHome from "./views/TweetHome";


const reduxStore = createStore(RootStore, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <React.StrictMode>
        <Provider store={reduxStore}>
            {/* <MainPage/> */}
            <TweetHome />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
