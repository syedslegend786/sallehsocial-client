import { globalConstants } from "../actions/actionConstants"
import { POST_CONSTANTS } from "../actions/post.actions";

const initial_state = {
    modal: false,
    updatingPost: {},
}


const toReturn = (state = initial_state, action) => {
    switch (action.type) {
        case globalConstants.STATUS:
            state = {
                ...state,
                modal: action.payload,
            }
            break;
        case POST_CONSTANTS.POST_UPDATING:
            state = {
                ...state,
                updatingPost: action.payload,
            }
            break;
        default:
            state = {
                ...state
            }
    }
    return state
}
export default toReturn;