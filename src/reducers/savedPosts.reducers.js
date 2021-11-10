import { POST_CONSTANTS } from "../actions/post.actions";

const initial_state = {
    posts: [],
    results: 0,
    loading: false,
}


const toReturn = (state = initial_state, action) => {
    switch (action.type) {
        case POST_CONSTANTS.GET_SAVED_POSTS_LOADING:
            state = {
                ...state,
                loading: action.payload,
            }
            break;
        case POST_CONSTANTS.GET_SAVED_POSTS:
            state = {
                ...state,
                posts: action.payload.posts,
                results: action.payload.results,
            }
            break;
        default:
            state = {
                ...state
            }
    }
    return state;
}

export default toReturn;