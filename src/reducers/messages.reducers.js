import { messagesConstants } from "../actions/messages.actions"

const initial_state = {
    users: [],
    resultUsers: 0,
    messagesResults: 0,
    data: [],
    firstLoad: false
}


const messageReducer = (state = initial_state, action) => {
    switch (action.type) {
        case messagesConstants.ADD_USER_TO_CHAT:
            state = {
                ...state,
                users: [...state.users, action.payload]
            }
            break;
        case messagesConstants.ADD_MESSAGE_TO_CHAT:
            state = {
                ...state,
                users: [
                    ...state.users.map(u => u._id === action.payload.receiver
                        ?
                        { ...u, text: action.payload.text }
                        : u
                    )
                ],
                data: [
                    ...state.data.map((val) => {
                        if (val.uid === action.payload.receiver || val.uid === action.payload.sender) {
                            return {
                                ...val,
                                messages: [...val.messages, action.payload]
                            }
                        } else {
                            return val
                        }
                    })
                ]
            }
            break;
        case messagesConstants.GET_COVERSATIONS_SIDE_BAR:
            state = {
                ...state,
                users: action.payload,
                firstLoad: true,
            }
            break;
        case messagesConstants.GET_USER_CHAT_MESSAGES:
            state = {
                ...state,
                data: [...state.data, action.payload]
            }
            break;
        default:
            state = {
                ...state,
            }
    }
    return state;
}

export default messageReducer