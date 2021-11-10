import { suggestUserConstants } from "../actions/suggestUser.actions"

const initial_state = {
    users: [],
    loading: false,
}



const toReturn = (state = initial_state, action) => {
    switch (action.type) {
        case suggestUserConstants.GET_SUGGEST_USERS_LOADING:
            state = {
                ...state,
                loading: action.payload
            }
            break;
        case suggestUserConstants.GET_SUGGEST_USERS:
            state = {
                ...state,
                users: action.payload
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