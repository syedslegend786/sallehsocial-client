import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getAllUserPosts, profilePostsConstants } from '../../actions/profilePosts.actions'
import PostImageCard from './PostImageCard'
import ReactLoading from 'react-loading'
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'
import { globalConstants } from '../../actions/actionConstants'
import axios from '../../utils/utils'

const Posts = ({ uid }) => {
    const dispatch = useDispatch()
    const { userProfilePosts } = useSelector(state => state)
    //Loadmore 
    const [noMoreToload, setnoMoreToload] = useState(false)
    const handleLoadMore = async () => {
        try {
            const res = await axios.get(`/userposts/${uid}?limit=4&page=${userProfilePosts.page}`)
            if (res.status === 200) {
                if (res.data.posts.length > 0) {
                    dispatch({
                        type: profilePostsConstants.LOADMORE_PROFILE_POSTS,
                        payload: { posts: res.data.posts, results: res.data.results }
                    })
                } else {
                    setnoMoreToload(true)
                }
            }
        } catch (error) {
            return dispatch({
                type: globalConstants.ALERT,
                payload: { error: error.message }
            })
        }
    }
    //Loadmore 
    useEffect(() => {
        dispatch(getAllUserPosts(uid))
    }, [uid, dispatch])
    return (
        <PostStyled>
            {
                userProfilePosts.loading &&
                <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    <ReactLoading type={`spin`} color="black" />
                </div>
            }
            {
                userProfilePosts.post.length && !userProfilePosts.loading > 0 &&
                <PostImageCard post={userProfilePosts.post} />
            }
            {
                !userProfilePosts.post.length > 0 &&
                <div style={{ textAlign: 'center' }}>
                    No Post
                </div>
            }
            <LoadMoreBtn handleLoadMore={handleLoadMore} noMoreToload={noMoreToload} />
        </PostStyled>
    )
}
const PostStyled = styled.div`

`

export default Posts
