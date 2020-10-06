import { combineReducers } from "redux";

import tweetReducer from "./Tweet";

export default combineReducers({
    tweetEntries: tweetReducer
});