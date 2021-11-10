import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDiscoversPostsAction } from '../../actions/discover.actions'
import MyReactLoading from '../../utils/MyReactLoading'
import Layout from '../Layout/Layout'
import PostImageCard from '../Profile/PostImageCard'

const Discover = () => {
    const dispatch = useDispatch()
    const { discover } = useSelector(state => state)
    useEffect(() => {
        dispatch(getDiscoversPostsAction())
    }, [dispatch])
    return (
        <Layout>
            {
                discover.loading &&
                <MyReactLoading />

            }
            {
                discover.posts.length > 0 &&
                <PostImageCard post={discover.posts} />
            }
        </Layout>
    )
}

export default Discover
