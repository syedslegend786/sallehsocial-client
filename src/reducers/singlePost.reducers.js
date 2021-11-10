import { singlePostConstants } from "../actions/singlePost.actions"

const initial_state = {
    post: {},
    loading: false,
}

const toReturn = (state = initial_state, action) => {
    switch (action.type) {
        case singlePostConstants.GET_SINGLE_POST_LOADING:
            state = {
                ...state,
                loading: action.payload,
            }
            break;
        case singlePostConstants.GET_SINGLE_POST:
            state = {
                ...state,
                post: action.payload
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