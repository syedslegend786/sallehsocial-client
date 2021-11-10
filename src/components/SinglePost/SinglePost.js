import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Layout from '../Layout/Layout'
import PostCardMain from '../../Posts/PostCardMain'
import axios from '../../utils/utils'
import { POST_CONSTANTS } from '../../actions/post.actions'
import { globalConstants } from '../../actions/actionConstants'
const SinglePost = () => {
    const [ptoDisplay, setptoDisplay] = useState({})
    const { posts } = useSelector(state => state)
    const { pid } = useParams()
    const dispatch = useDispatch()
    const togetPOst = async () => {
        try {
            const res = await axios.get(`/singlepost/${pid}`)
            if (res.status === 200) {
                setptoDisplay(res.data.post)
                dispatch({
                    type: POST_CONSTANTS.ADD_SINGLE_POST,
                    payload: res.data.post,
                })
            }
        } catch (error) {
            return dispatch({
                type: globalConstants.ALERT,
                payload: { error: error.message }
            })
        }
    }
    useEffect(() => {
        if (pid) {
            const p = posts.posts.find(cm => cm._id === pid)
            if (p) {
                setptoDisplay(p)
            } else {
                togetPOst()
            }
        }
    }, [pid, posts])
    return (
        <Layout>
            {/* {
                singlePost.loading &&
                <div style={{ display: 'flex', justifyContent: "center" }}> <ReactLoading type={`spin`} color="black" /></div>
            } */}
            {
                ptoDisplay._id &&
                <PostCardMain _val={ptoDisplay} />
            }
        </Layout>
    )
}

export default SinglePost
