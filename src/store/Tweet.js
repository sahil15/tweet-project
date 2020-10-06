const
    addEntry = "ADD_TWEET_ENTRY",
    removeEntry = "REMOVE_TWEET_ENTRY",
    editEntry = "EDIT_TWEET_ENTRY";


const initalState = [];


const newTweet = (description) => {
    return {
        type: addEntry,
        payload: {
            description: description
        }
    };
};



const editTweet = (editTweetId, description) => {
    return {
        type: editEntry,
        payload: {
            tweetId: editTweetId,
            description: description
        }
    };
};



const removeTweet = (removeEntryId) => {
    return {
        type: removeEntry,
        payload: {
            tweetId: removeEntryId
        }
    };
};

const tweetReducer = (state = initalState, action) => {
    switch (action.type) {
        case addEntry:
            action.payload.id = state.length + 1;
            action.payload.date = new Date();
            state = [...state, action.payload];
            break;
        case editEntry:
            state.forEach(stateRef => {
                if (stateRef.id === action.payload.tweetId) {
                    stateRef.description = action.payload.description;
                    stateRef.date_updated = new Date();
                }
            });
            state = [...state];
            break;
        case removeEntry:
            state.forEach(stateRef => {
                if (stateRef.id === action.payload.tweetId) {
                    stateRef.removed = true;
                }
            });
            state = [...state];
            break;
        default:
            //do nothing
    }
    return state;
};

export default tweetReducer;
export { newTweet, editTweet, removeTweet };