import axios from '../utils/utils'
import { globalConstants } from './actionConstants'

export const discoverConstants = {
    GET_DICOVER_POSTS: "GET_DICOVER_POSTS",
    GET_DICOVER_POSTS_LOADING: "GET_DICOVER_POSTS_LOADING",
}
export const getDiscoversPostsAction = () => async (dispatch) => {
    try {
        dispatch({
            type: discoverConstants.GET_DICOVER_POSTS_LOADING,
            payload: true,
        })
        const res = await axios.get(`/discover`)
        if (res.status === 200) {
            dispatch({
                type: discoverConstants.GET_DICOVER_POSTS,
                payload: {
                    posts: res.data.posts,
                    results: res.data.results,
                }
            })
        }
        dispatch({
            type: discoverConstants.GET_DICOVER_POSTS_LOADING,
            payload: false,
        })
    } catch (error) {
        return dispatch({
            type: globalConstants.ALERT,
            payload: { error: error.message }
        })
    }
}