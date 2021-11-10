import { profileConstants } from '../actions/actionConstants'
const initital_state = {
    loading: false,
    user: {}
}


const toReturn = (state = initital_state, action) => {
    switch (action.type) {
        case profileConstants.PROFILE_REQUEST:
            state = {
                ...state,
                loading: action.payload,
            }
            break;
        case profileConstants.PROFILE_SUCCESS:
            state = {
                ...state,
                user: action.payload,
                loading: false,
            }
            break;
        case profileConstants.FOLLOW:
            state = { 
                ...state,
                user: {
                    ...state.user, followers:
                        [
                            ...state.user.followers, action.payload
                        ]
                }
            }
            break;
        case profileConstants.UNFOLLOW:
            state = {
                ...state,
                user: { ...state.user, followers: handleUnfollow(state.user.followers, action.payload._id) }
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