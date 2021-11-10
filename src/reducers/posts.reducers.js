import { POST_CONSTANTS } from "../actions/post.actions"

const initial_state = {
    posts: [],
    loadingPosts: false,
    results: 0,
    page: 1,
}
const toReturn = (state = initial_state, action) => {
    switch (action.type) {
        case POST_CONSTANTS.POST_LOADING:
            state = {
                ...state,
                loadingPosts: action.payload,
            }
            break;
        case POST_CONSTANTS.POST_GETTING:
            state = {
                ...state,
                posts: action.payload.posts,
                results: action.payload.results,
            }
            break;
        case POST_CONSTANTS.POST_CREATING:
            state = {
                ...state,
                posts: [action.payload, ...state.posts]
            }
            break;
        case POST_CONSTANTS.POST_UPDATED_DATA:
            state = {
                ...state,
                posts: handleUpdatedData(state.posts, action.payload)
            }
            break;
        case POST_CONSTANTS.LOAD_MORE_POST:
            state = {
                ...state,
                posts: [...state.posts, ...action.payload.posts],
                results: action.payload.results + state.results,
                page: state.page + 1,
            }
            break;
        case POST_CONSTANTS.POST_DELETE:
            state = {
                ...state,
                posts: [...state.posts.filter(p => p._id !== action.payload)]
            }
            break;
        case POST_CONSTANTS.ADD_SINGLE_POST:
            state = {
                ...state,
                posts: [...state.posts, action.payload]
            }
            break;
        default:
            state = {
                ...state
            }
    }
    return state;
}
export const handleUpdatedData = (oldstate, newData) => {
    const toReturn = oldstate.map((val) => val._id === newData._id ? newData : val)
    return toReturn
}

export default toReturn;