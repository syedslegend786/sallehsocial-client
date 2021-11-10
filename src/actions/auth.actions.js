import { registerValidation } from '../components/Register/valid'
import axios from '../utils/utils'
import { globalConstants } from './actionConstants'
export const loginAction = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: globalConstants.ALERT,
                payload: { loading: true }
            })
            const res = await axios.post('/login', data)
            if (res.status === 200) {
                localStorage.setItem('firstlogin', 'firstlogin')
                dispatch({
                    type: globalConstants.AUTH,
                    payload: {
                        token: res.data.accessToken,
                        user: res.data.user,
                    },
                })
                dispatch({
                    type: globalConstants.ALERT,
                    payload: { success: 'success' }
                })
            }
        } catch (err) {
            dispatch({
                type: globalConstants.ALERT,
                payload: { error: err.response.data?.msg }
            })
        }
    }
}
export const refreshTokenAction = () => {
    return async (dispatch) => {
        try {
            const firstlogin = localStorage.getItem('firstlogin')
            if (firstlogin) {
                dispatch({
                    type: globalConstants.ALERT,
                    payload: { loading: true },
                })
                const res = await axios.get('/refreshToken')
                if (res.status === 200) {
                    dispatch({
                        type: globalConstants.AUTH,
                        payload: {
                            token: res.data.accesstoken,
                            user: res.data.user,
                        }
                    })
                }
                dispatch({
                    type: globalConstants.ALERT,
                    payload: {},
                })
            }
        } catch (err) {
            dispatch({
                type: globalConstants.ALERT,
                payload: { error: err.response.data.msg }
            })
        }
    }
}
export const registerAction = (data) => {
    return async (dispatch) => {
        try {
            const errors = registerValidation(data)
            if (Object.keys(errors).length > 0) {
                return dispatch({
                    type: globalConstants.ALERT,
                    payload: errors
                })
            } else {
                dispatch({
                    type: globalConstants.ALERT,
                    payload: {}
                })
            }
            dispatch({
                type: globalConstants.ALERT,
                payload: { laoding: true },
            })
            const res = await axios.post('/register', {
                ...data
            })
            if (res.status === 200) {
                localStorage.setItem('firstlogin', 'firstlogin')
                dispatch({
                    type: globalConstants.ALERT,
                    payload: { success: res.data.msg },
                })
                dispatch({
                    type: globalConstants.AUTH,
                    payload: {
                        token: res.data.accessToken,
                        user: res.data.user,
                    }
                })
            }
        } catch (err) {
            dispatch({
                type: globalConstants.ALERT,
                payload: { error: err.response.data.msg }
            })
        }

    }
}
export const logoutAction = () => async (dispatch) => {
    try {
        dispatch({
            type: globalConstants.ALERT,
            payload: { loading: true }
        })
        const res = await axios.post('/logout')
        if (res.status === 200) {
            localStorage.clear()
            dispatch({
                type: globalConstants.AUTH,
                payload: {}
            })
            dispatch({
                type: globalConstants.ALERT,
                payload: { success: res.data.msg }
            })
        }
    } catch (err) {
        dispatch({
            type: globalConstants.ALERT,
            payload: { error: 'somethnig else happened' }
        })
    }
}