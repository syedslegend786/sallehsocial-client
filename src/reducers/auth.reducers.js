import { authConstants, globalConstants, profileConstants } from "../actions/actionConstants";
import { POST_CONSTANTS } from "../actions/post.actions";

const initial_state = {
    token: '',
    user: ''
};


const toReturn = (state = initial_state, action) => {
    switch (action.type) {
        case globalConstants.AUTH:
            state = {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
            }
            break;
        case profileConstants.FOLLOWING:
            state = {
                ...state,
                user: { ...state.user, following: [...state.user.following, action.payload] }
            }
            break;
        case profileConstants.UNFOLLOWING:
            state = {
                ...state,
                user: { ...state.user, following: handleUnfollow(state.user.following, action.payload._id) }
            }
            break;
        case POST_CONSTANTS.SAVE_POST:
            state = {
                ...state,
                user: { ...state.user, saved: [...state.user.saved, action.payload] }
            }
            break;
        case POST_CONSTANTS.UNSAVE_POST:
            state = {
                ...state,
                user: { ...state.user, saved: [...state.user.saved.filter(val => val !== action.payload)] }
            }
            break;

        case authConstants.SOCKET_FOLLOW:
            state = {
                ...state,
                user: {
                    ...state.user,
                    followers: [...state.user.followers, action.payload]
                }
            }
            break;
        case authConstants.SOCKET_UNFOLLOW:
            state = {
                ...state,
                user: {
                    ...state.user,
                    followers: [...state.user.followers.filter(f => f._id !== action.payload._id)]
                }
            }
            break;
        default:
            state = {
                ...state
            }
    }
    return state;
}
const handleUnfollow = (followers, uid) => {
    const result = followers.filter(user => user._id !== uid);
    return result;
}

export default toReturn;