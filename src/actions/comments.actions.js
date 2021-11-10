import axios from '../utils/utils'
import { globalConstants } from './actionConstants'
import { POST_CONSTANTS } from './post.actions'
import store from '../store/index'
import { createNotifyAction, deleteNotifyAction } from './notify.actions'


export const createComment = (newcomment, newPost, oldPost) => async (dispatch) => {
    const socket = store.getState().socket
    try {
        const user = store.getState().auth.user
        dispatch({
            type: POST_CONSTANTS.POST_UPDATED_DATA,
            payload: newPost
        })

        const res = await axios.post('/comments', {
            ...newcomment,
            postId: oldPost._id,
            postUserId: oldPost.user._id
        })
        if (res.status === 200) {
            const resComment = {
                ...res.data.newComment,
                user: user
            }
            const postWithNewComment = { ...oldPost, comments: [...oldPost.comments, resComment] }
            dispatch({
                type: POST_CONSTANTS.POST_UPDATED_DATA,
                payload: postWithNewComment,
            })
            socket.emit("commentCreate", postWithNewComment)
            //
            const message = {
                id: newPost._id,
                user: newcomment.user._id,
                recipents: newcomment.tag ? [newcomment.tag._id] : [newPost.user._id],
                url: `/single/post/${newPost._id}`,
                text: newcomment.tag ? "tagged you in a comment" : "commented on you post",
                content: newcomment.content,
                image: newPost.images[0].url
            }
            console.log(message)
            dispatch(createNotifyAction(message))
        }
    } catch (error) {
        dispatch({
            type: globalConstants.ALERT,
            payload: { error: error.message }
        })
    }
}
export const updatePostAction = (post, comment) => {
    const socket = store.getState().socket
    return async (dispatch) => {
        try {
            dispatch({
                type: POST_CONSTANTS.POST_UPDATED_DATA,
                payload: post
            })
            await axios.patch('/updatecomment', {
                id: comment._id,
                content: comment.content,
            })
            socket.emit("updatePost", post)
        } catch (error) {
            dispatch({
                type: globalConstants.ALERT,
                paylaod: { error: error.message }
            })
        }
    }
}
export const likeCommentAction = (post, comment) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: POST_CONSTANTS.POST_UPDATED_DATA,
                payload: post
            })
            await axios.patch('/comment/like', {
                id: comment._id
            })
        } catch (error) {
            return dispatch({
                type: globalConstants.ALERT,
                paylaod: { error: error.message }
            })
        }
    }
}
export const unlikeCommentAction = (post, comment) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: POST_CONSTANTS.POST_UPDATED_DATA,
                payload: post
            })
            await axios.patch('/comment/unlike', {
                id: comment._id
            })
        } catch (error) {
            return dispatch({
                type: globalConstants.ALERT,
                paylaod: { error: error.message }
            })
        }
    }
}
export const deleteCommentAction = (comment, post) => async (dispatch) => {
    const socket = store.getState().socket
    const deleteCommentArray = [...post.comments.filter(cm => cm.reply === comment._id), comment]

    const newPost = {
        ...post,
        comments: post.comments.filter(cm => !deleteCommentArray.find(dc => dc._id === cm._id))
    }
    dispatch({
        type: POST_CONSTANTS.POST_UPDATED_DATA,
        payload: newPost
    })
    try {
        deleteCommentArray.forEach(async (cm) => {
            await axios.delete(`/comment/${cm._id}`)
        })
        socket.emit("deleteComment", newPost)
        dispatch(deleteNotifyAction(post._id))
    } catch (error) {
        return dispatch({ type: globalConstants.ALERT, payload: { error: error.message } })
    }
}