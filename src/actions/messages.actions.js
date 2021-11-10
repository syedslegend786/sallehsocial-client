import { globalConstants } from "./actionConstants"
import axios from '../utils/utils'
import store from "../store"
export const messagesConstants = {
    ADD_USER_TO_CHAT: "ADD_USER_TO_CHAT",
    ADD_MESSAGE_TO_CHAT: "ADD_MESSAGE_TO_CHAT",
    GET_COVERSATIONS_SIDE_BAR: "GET_COVERSATIONS_SIDE_BAR",
    GET_USER_CHAT_MESSAGES: "GET_USER_CHAT_MESSAGES",
    LOAD_MORE_MESSAGES: "LOAD_MORE_MESSAGES",
}
export const addUserToChatAction = (user) => async (dispatch) => {
    const messages = store.getState().messages
    if (messages.users.find(uf => uf._id === user._id)) return;
    dispatch({
        type: messagesConstants.ADD_USER_TO_CHAT,
        payload: user,
    })
}
export const createMessageAction = (payload) => async (dispatch) => {
    const socket = store.getState().socket
    try {
        dispatch({
            type: messagesConstants.ADD_MESSAGE_TO_CHAT,
            payload: payload,
        })
        const res = await axios.post(`/message`, payload)
        if (res.status === 200) {
            socket.emit("sendMessage", res.data.message)
        }
    } catch (error) {
        return dispatch({
            type: globalConstants.ALERT,
            payload: { error: error.message }
        })
    }
}
export const getSideBarConversations = () => async (dispatch) => {
    const auth = store.getState().auth
    try {
        const res = await axios.get('/conversations')
        if (res.status === 200) {
            const newArr = []
            res.data.cv.forEach(val => {
                val.recepents.forEach(r => {
                    if (r._id !== auth.user._id) {
                        newArr.push({ ...r, text: val.text })
                    }
                })
            })
            dispatch({
                type: messagesConstants.GET_COVERSATIONS_SIDE_BAR,
                payload: newArr,
            })
        }
    } catch (error) {
        return dispatch({
            type: globalConstants.ALERT,
            payload: { error: error.message }
        })
    }
}
export const getChatDataAction = (uid) => async (dispatch) => {
    try {
        const res = await axios.get(`/getmessages/${uid}`)
        if (res.status === 200) {
            const newData = {
                uid: uid,
                messages: [...res.data.messages],
                results: res.data.results,
                page: 1,
            }
            dispatch({
                type: messagesConstants.GET_USER_CHAT_MESSAGES,
                payload: newData,
            })
        }
    } catch (error) {
        return dispatch({
            type: globalConstants.ALERT,
            payload: { error: error.message }
        })
    }
}