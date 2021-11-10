import { imageUpload } from '../utils/cloudinaryUpload'
import axios from '../utils/utils'
import { globalConstants } from './actionConstants'
import store from '../store/index'
import { createNotifyAction, deleteNotifyAction } from './notify.actions'
export const POST_CONSTANTS = {
    POST_LOADING: "POST_LOADING",
    POST_GETTING: "POST_GETTING",
    POST_CREATING: "POST_CREATING",
    POST_UPDATING: "POST_UPDATING",
    POST_UPDATED_DATA: "POST_UPDATED_DATA",
    POST_LIKE: "POST_LIKE",
    POST_UNLIKE: "POST_UNLIKE",
    LOAD_MORE_POST: "LOAD_MORE_POST",
    POST_DELETE: "POST_DELETE",
    SAVE_POST: "SAVE_POST",
    UNSAVE_POST: "UNSAVE_POST",
    GET_SAVED_POSTS: "GET_SAVED_POSTS",
    GET_SAVED_POSTS_LOADING: "GET_SAVED_POSTS_LOADING",
    ADD_SINGLE_POST: "ADD_SINGLE_POST",
}


export const createPostAction = (payload) => {
    return async (dispatch) => {
        try {
            const user = store.getState().auth.user
            let media = []
            dispatch({
                type: globalConstants.ALERT,
                payload: { loading: true }
            })
            media = await imageUpload(payload.images);
            if (!media) {
                return dispatch({
                    type: globalConstants.ALERT,
                    payload: { error: 'no images uploaded!!!' }
                })
            }
            const res = await axios.post('/posts', { images: media, content: payload.content })

            if (res.status === 200) {
                //add new post in the redux state...
                dispatch({
                    type: POST_CONSTANTS.POST_CREATING,
                    payload: { ...res.data.data, user: user },
                })
                dispatch({
                    type: globalConstants.ALERT,
                    payload: { success: res.data.msg }
                })
                dispatch({
                    type: globalConstants.STATUS,
                    payload: false,
                })
            }
            //notify...
            const notifyPayload = {
                id: res.data.data._id,
                user: user._id,
                recipents: user.followers,
                url: `/single/post/${res.data.data._id}`,
                text: "user created new post!",
                content: payload.content,
                image: media[0].url
            }
            dispatch(createNotifyAction(notifyPayload))
        } catch (err) {
            return dispatch({
                type: globalConstants.ALERT,
                payload: { error: err.message }
            })
        }

    }
}
export const getPostsAction = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: POST_CONSTANTS.POST_LOADING,
                payload: true,
            })
            const res = await axios.get('/posts')
            if (res.status === 200) {
                dispatch({
                    type: POST_CONSTANTS.POST_GETTING,
                    payload: res.data,
                })
            }
            dispatch({
                type: POST_CONSTANTS.POST_LOADING,
                payload: false,
            })
        } catch (error) {
            dispatch({
                type: globalConstants.ALERT,
                payload: { error: error.message }
            })
        }
    }
}
export const postUpdateActions = ({ images, content }) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: globalConstants.ALERT,
                payload: { loading: true }
            })
            const updatedPost = store.getState().status.updatingPost
            const user = store.getState().auth.user
            let oldImags = images.filter(val => val.url)
            let newImages = images.filter(val => !val.url)
            let media = [];
            if (newImages.length > 0) {
                media = await imageUpload(newImages)
            }
            let imagestoUpload = [...media, ...oldImags]
            if (!imagestoUpload.length > 0) {
                return dispatch({ type: globalConstants.ALERT, payload: { error: 'no files uploaded!' } })
            }
            const res = await axios.patch(`/posts/${updatedPost._id}`, {
                images: imagestoUpload,
                content: content,
            })
            if (res.status === 200) {
                dispatch({
                    type: POST_CONSTANTS.POST_UPDATED_DATA,
                    payload: { ...res.data.data, user: user }
                })
                dispatch({
                    type: globalConstants.ALERT,
                    payload: {}
                })
            }
        } catch (error) {
            dispatch({
                type: globalConstants.ALERT,
                payload: { error: error.message }
            })
        }
    }
}
export const likePostAction = (payload) => {
    const socket = store.getState().socket;
    return async (dispatch) => {
        try {
            dispatch({
                type: POST_CONSTANTS.POST_UPDATED_DATA,
                payload: payload
            })
            await axios.patch(`/posts/${payload._id}/like`)
            //likepost....socket....
            socket.emit("likepost", payload)
        } catch (error) {
            dispatch({
                type: globalConstants.ALERT,
                payload: { error: error.message }
            })
        }
    }
}
export const UnlikePostAction = (payload) => {
    return async (dispatch) => {
        const socket = store.getState().socket
        try {
            dispatch({
                type: POST_CONSTANTS.POST_UPDATED_DATA,
                payload: payload
            })
            await axios.patch(`/posts/${payload._id}/unlike`)
            //socket...
            socket.emit("unlikepost", payload)
        } catch (error) {
            dispatch({
                type: globalConstants.ALERT,
                payload: { error: error.message }
            })
        }
    }
}
export const deltePostAction = (pid) => async (dispatch) => {
    dispatch({
        type: POST_CONSTANTS.POST_DELETE,
        payload: pid,
    })
    try {
        await axios.delete(`/posts/${pid}`)
        //notify...
        dispatch(deleteNotifyAction(pid))
    } catch (error) {
        console.log('error==>', error.message)
        dispatch({
            type: globalConstants.ALERT,
            payload: { error: error.message }
        })
    }

}

export const savePostAction = (postId) => async (dispatch) => {
    dispatch({
        type: POST_CONSTANTS.SAVE_POST,
        payload: postId
    })
    try {
        await axios.patch(`/savePost/${postId}`)
    } catch (error) {
        return dispatch({
            type: globalConstants.ALERT,
            payload: { error: error.message }
        })
    }
}
export const unSavePostAction = (postId) => async (dispatch) => {
    dispatch({
        type: POST_CONSTANTS.UNSAVE_POST,
        payload: postId
    })
    try {
        await axios.patch(`/unSavePost/${postId}`)
    } catch (error) {
        return dispatch({
            type: globalConstants.ALERT,
            payload: { error: error.message }
        })
    }
}
export const getSavedPosts = () => async (dispatch) => {
    try {
        dispatch({
            type: POST_CONSTANTS.GET_SAVED_POSTS_LOADING,
            payload: true,
        })
        const res = await axios.get('/getsavedposts')
        if (res.status === 200) {
            dispatch({
                type: POST_CONSTANTS.GET_SAVED_POSTS,
                payload: { posts: res.data.posts, results: res.data.resultsX }
            })
        }
        dispatch({
            type: POST_CONSTANTS.GET_SAVED_POSTS_LOADING,
            payload: false,
        })
    } catch (error) {
        return dispatch({
            type: globalConstants.ALERT,
            payload: { error: error.message }
        })
    }
}