import store from '../store/index.js'
import axios from '../utils/utils.js'
import { globalConstants, notifyConstants } from './actionConstants'


export const createNotifyAction = (payload) => async (dispatch) => {
    console.log(payload)
    const socket = store.getState().socket
    const user = store.getState().auth.user
    try {
        const res = await axios.post(`/notify/create`, payload)
        if (res.status === 200) {
            //socket...
            socket.emit("createNotify", { ...res.data.notify, user: user })
        }
    } catch (error) {
        return dispatch({
            type: globalConstants.ALERT,
            payload: { error: error.message }
        })
    }
}
export const deleteNotifyAction = (pid) => async (dispatch) => {
    const socket = store.getState().socket
    const user = store.getState().auth.user
    try {
        const res = await axios.delete(`/notify/delete/${pid}`)
        if (res.status === 200) {
            socket.emit("deleteNotify", { ...res.data.notify, user: user })
        }
    } catch (error) {
        console.log('error==>', error.message)
        return dispatch({
            type: globalConstants.ALERT,
            payload: { error: error.message }
        })
    }
}
export const getNotifiesAction = () => async (dispatch) => {
    try {
        const res = await axios.get(`/notify/get`)
        if (res.status === 200) {
            dispatch({
                type: notifyConstants.GET_NOTIFIES,
                payload: res.data.notifies,
            })
        }
    } catch (error) {
        return dispatch({
            type: globalConstants.ALERT,
            payload: { error: error.message }
        })
    }
}
export const notifyIsRead = (notification) => async (dispatch) => {
    dispatch({ type: notifyConstants.NOTIFY_UPDATE, payload: notification })
    try {
        await axios.patch(`/notify/isread/${notification._id}`)
    } catch (error) {
        return dispatch({
            type: globalConstants.ALERT,
            payload: { error: error.message }
        })
    }
}
export const deletAllNotifications = () => async (dispatch) => {
    dispatch({ type: notifyConstants.NOTIFY_DELETE_ALL, payload: [] })
    try {
        await axios.delete(`/notify/deleteallnotifies`)
    } catch (error) {
        return dispatch({
            type: globalConstants.ALERT,
            payload: { error: error.message }
        })
    }
}