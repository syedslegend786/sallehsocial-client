import axios from '../utils/utils'
import { globalConstants } from './actionConstants'
export const profilePostsConstants = {
    GET_ALL_PROFILE_POSTS: "GET_ALL_PROFILE_POSTS",
    GET_ALL_PROFILE_POSTS_LOADING: "GET_ALL_PROFILE_POSTS_LODING",
    LOADMORE_PROFILE_POSTS: "LOADMORE_PROFILE_POSTS",

}

export const getAllUserPosts = (uid) => async (dispatch) => {
    try {
        dispatch({
            type: profilePostsConstants.GET_ALL_PROFILE_POSTS_LOADING,
            payload: true,
        })
        const res = await axios.get(`/userposts/${uid}`)
        if (res.status === 200) {
            dispatch({
                type: profilePostsConstants.GET_ALL_PROFILE_POSTS,
                payload: { posts: res.data.posts, page: 2, results: res.data.results },
            })
            dispatch({
                type: profilePostsConstants.GET_ALL_PROFILE_POSTS_LOADING,
                payload: false,
            })
        }
    } catch (error) {
        return dispatch({
            type: globalConstants.ALERT,
            payload: { error: error.message }
        })
    }
}