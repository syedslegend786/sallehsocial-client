import { discoverConstants } from "../actions/discover.actions";

const initial_state = {
    posts: [],
    loading: false,
    results: 0
}
const toReturn = (state = initial_state, action) => {
    switch (action.type) {
        case discoverConstants.GET_DICOVER_POSTS_LOADING:
            state = {
                ...state,
                loading: action.payload,
            }
            break;
        case discoverConstants.GET_DICOVER_POSTS:
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