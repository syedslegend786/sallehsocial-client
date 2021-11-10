import { globalConstants } from "../actions/actionConstants";

const initial_state = {};


const toReturn = (state = initial_state, action) => {
    switch (action.type) {
        case globalConstants.ALERT:
            return action.payload;
        default:
            return state;
    }
}
export default toReturn;