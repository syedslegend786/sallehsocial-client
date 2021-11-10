import { profilePostsConstants } from "../actions/profilePosts.actions"

const initial_state = {
    post: [],
    loading: false,
    page: 2,
    result: 0,
}

const toReturn = (state = initial_state, action) => {
    switch (action.type) {
        case profilePostsConstants.GET_ALL_PROFILE_POSTS_LOADING:
            state = {
                ...state,
                loading: action.payload
            }
            break;
        case profilePostsConstants.GET_ALL_PROFILE_POSTS:
            state = {
                ...state,
                post: action.payload.posts,
                page: action.payload.page,
                result: action.payload.results
            }
            break;
        case profilePostsConstants.LOADMORE_PROFILE_POSTS:
            state = {
                ...state,
                post: [...state.post, ...action.payload.posts],
                result: state.result + action.payload.results,
                page: state.page + 1,
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