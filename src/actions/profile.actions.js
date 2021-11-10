import axios from '../utils/utils'
import { globalConstants, profileConstants } from './actionConstants'
import store from '../store/index'
import { updateProfileVAlid } from '../components/Profile/ProfileValid'
import { imageUpload } from '../utils/cloudinaryUpload'
import { createNotifyAction } from './notify.actions'

export const getProfileDataAction = (payload) => async (dispatch) => {
    try {
        dispatch({
            type: profileConstants.PROFILE_REQUEST,
            payload: true,
        })
        const { user } = store.getState().auth
        if (payload === user._id) {
            dispatch({
                type: profileConstants.PROFILE_SUCCESS,
                payload: user,
            })
        } else {
            const res = await axios.get(`/profile/${payload}`)
            if (res.status === 200) {
                dispatch({
                    type: profileConstants.PROFILE_SUCCESS,
                    payload: res.data.user,
                })
            }
        }
        dispatch({
            type: profileConstants.PROFILE_REQUEST,
            payload: false,
        })
    } catch (err) {
        dispatch({
            type: globalConstants.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}
export const updateProfileAction = ({ formdata, updatedAvatar }) => {
    return async (dispatch) => {
        try {
            const err = updateProfileVAlid(formdata)
            if (Object.keys(err).length > 0) {
                return dispatch({
                    type: globalConstants.ALERT,
                    payload: { updateprofileerror: err },
                })
            }
            else {
                dispatch({
                    type: globalConstants.ALERT,
                    payload: {},
                })
            }
            dispatch({
                type: globalConstants.ALERT,
                payload: { loading: true }
            })
            let media = ''
            if (updatedAvatar) {
                media = await imageUpload([updatedAvatar])
            }
            const res = await axios.patch('/profile/update', {
                ...formdata,
                avatar: media ? media[0].url : store.getState().auth.user.avatar,
            })
            if (res.status === 200) {
                dispatch({
                    type: globalConstants.AUTH,
                    payload: {
                        ...store.getState().auth,
                        user: {
                            ...store.getState().auth.user,
                            ...formdata,
                            avatar: media ? media[0].url : store.getState().auth.user.avatar,
                        }
                    }
                })
                dispatch({
                    type: globalConstants.ALERT,
                    payload: {}
                })
                return true;
            }
        } catch (err) {
            dispatch({
                type: globalConstants.ALERT,
                payload: { error: err.response?.data.msg }
            })
        }
    }
}
export const followAction = (user) => {
    return async (dispatch) => {
        console.log(user)
        const socket = store.getState().socket
        const auth = store.getState().auth.user
        const profile = store.getState().profile
        try {
            dispatch({
                type: globalConstants.ALERT,
                payload: { loading: true }
            })
            dispatch({
                type: profileConstants.FOLLOW,
                payload: store.getState().auth.user,
            })

            dispatch({
                type: profileConstants.FOLLOWING,
                payload: user,
            })
            await axios.patch(`/follow/${user._id}`)
            //socket
            socket.emit("followUser", { user, followedBy: auth })
            //
            const msg = {
                id: auth._id,
                user: auth,
                recipents: [user._id],
                url: `/profile/${user._id}`,
                text: "started follow you!",
                content: "started follow you",
                image: auth.avatar,
            }
            console.log('msg==>', msg)
            dispatch(createNotifyAction(msg))
            dispatch({
                type: globalConstants.ALERT,
                payload: {}
            })
        } catch (err) {
            dispatch({
                type: globalConstants.ALERT,
                payload: { error: err.response?.data.msg }
            })
        }
    }
}
export const unfollowAction = (user) => {
    return async (dispatch) => {
        const socket = store.getState().socket
        const auth = store.getState().auth
        try {
            dispatch({
                type: globalConstants.ALERT,
                payload: { loading: true }
            })
            dispatch({
                type: profileConstants.UNFOLLOW,
                payload: store.getState().auth.user,
            })
            dispatch({
                type: profileConstants.UNFOLLOWING,
                payload: user,
            })
            const res = await axios.patch(`/unfollow/${user._id}`)
            socket.emit("unfollowUser", { user, unfollowedBy: auth.user })
            if (res.status === 200) {
                dispatch({
                    type: globalConstants.ALERT,
                    payload: {}
                })
            }
        } catch (err) {
            dispatch({
                type: globalConstants.ALERT,
                payload: { error: err.response?.data.msg }
            })
        }
    }
}
