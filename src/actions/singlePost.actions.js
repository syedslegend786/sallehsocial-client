import axios from '../utils/utils'
import { globalConstants } from './actionConstants'

export const singlePostConstants = {
    GET_SINGLE_POST: "GET_SINGLE_POST",
    GET_SINGLE_POST_LOADING: "GET_SINGLE_POST_LOADING",
}

export const getSinglePostAction = (pid) => async (dispatch) => {
    try {
        dispatch({
            type: singlePostConstants.GET_SINGLE_POST_LOADING,
            payload: true,
        })
        const res = await axios.get(`/singlepost/${pid}`)
        if (res.status === 200) {
            dispatch({
                type: singlePostConstants.GET_SINGLE_POST,
                payload: res.data.post,
            })
        }
        dispatch({
            type: singlePostConstants.GET_SINGLE_POST_LOADING,
            payload: false,
        })
    } catch (error) {
        return dispatch({
            type: globalConstants.ALERT,
            payload: { error: error.message }
        })
    }
}