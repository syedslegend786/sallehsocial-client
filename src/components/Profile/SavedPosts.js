import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedPosts } from '../../actions/post.actions'
import PostImageCard from './PostImageCard'
import ReactLoading from 'react-loading'
const SavedPosts = () => {
    const { saved } = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSavedPosts())
    }, [dispatch])
    return (
        <div>
            {
                saved.loading &&
                <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    <ReactLoading type={`spin`} color="black" />
                </div>
            }
            {
                (saved.posts.length && !saved.loading) > 0 &&
                < PostImageCard post={saved.posts} />
            }
            {
                !saved.posts.length > 0 &&
                < div > No saved posts...</div>
            }
        </div >
    )
}

export default SavedPosts
