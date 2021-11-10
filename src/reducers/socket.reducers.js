import { globalConstants } from "../actions/actionConstants";

const toReturn = (state = [], action) => {
    switch (action.type) {
        case globalConstants.SOCKET:
            return action.payload
        default:
            return state;
    }
}

export default toReturn;