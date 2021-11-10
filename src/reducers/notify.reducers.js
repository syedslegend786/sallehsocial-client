import { notifyConstants } from "../actions/actionConstants";
import { handleUpdatedData } from "./posts.reducers";

const initial_state = {
    notifies: [],
}


const notifyReducer = (state = initial_state, action) => {
    switch (action.type) {
        case notifyConstants.GET_NOTIFIES:
            state = {
                ...state,
                notifies: action.payload,
            }
            break;
        case notifyConstants.SOCKET_NOTIFY_GET:
            state = {
                ...state,
                notifies: [action.payload, ...state.notifies]
            }
            break;
        case notifyConstants.SOCKET_NOTIFY_DELETE:
            state = {
                ...state,
                notifies: [...state.notifies.filter(n => n._id !== action.payload._id)]
            }
            break;
        case notifyConstants.NOTIFY_UPDATE:
            state = {
                ...state,
                notifies: handleUpdatedData(state.notifies, action.payload)
            }
            break;
        case notifyConstants.NOTIFY_DELETE_ALL:
            state = {
                ...state,
                notifies: action.payload,
            }
            break
    }
    return state;
}

export default notifyReducer;