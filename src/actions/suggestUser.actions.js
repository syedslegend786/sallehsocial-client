import axios from '../utils/utils'
import { globalConstants } from './actionConstants'

export const suggestUserConstants = {
    GET_SUGGEST_USERS: "GET_SUGGEST_USERS",
    GET_SUGGEST_USERS_LOADING: "GET_SUGGEST_USERS_LOADING",
}
export const userSuggestionAction = () => async (dispatch) => {
    try {
        dispatch({
            type: suggestUserConstants.GET_SUGGEST_USERS_LOADING,
            payload: true
        })
        const res = await axios.get(`/suggestionUsers`)
        if (res.status === 200) {
            dispatch({
                type: suggestUserConstants.GET_SUGGEST_USERS,
                payload: res.data.users,
            })
        }
        dispatch({
            type: suggestUserConstants.GET_SUGGEST_USERS_LOADING,
            payload: false
        })
    } catch (error) {
        return dispatch({
            type: globalConstants.ALERT,
            payload: { error: error.message }
        })
    }
}