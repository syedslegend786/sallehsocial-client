import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaRegComment } from 'react-icons/fa'
import { RiShareForwardLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { likePostAction, savePostAction, UnlikePostAction, unSavePostAction } from '../actions/post.actions'
import { useSelector } from 'react-redux'
import LikeUnlike from './LikeUnlike'
import Share from '../components/Share/Share'
import SavePostButtons from './SavePostButtons'
const Footer = ({ _val }) => {
    const dispatch = useDispatch()
    const [onShare, setonShare] = useState(false)
    const { auth } = useSelector(state => state)
    const [liked, setliked] = useState(false)
    const handleLike = () => {
        setliked(true)
        let newPost = {
            ..._val,
            likes: [..._val.likes, auth.user]
        }
        dispatch(likePostAction(newPost))
    }
    const handleUnlike = () => {
        setliked(false)
        let newPost = {
            ..._val,
            likes: _val.likes.filter(val => val._id !== auth.user._id)
        }
        dispatch(UnlikePostAction(newPost))
    }
    //save post....
    const [isSaved, setisSaved] = useState(false)
    const handleSavePost = () => {
        setisSaved(true)
        dispatch(savePostAction(_val._id))

    }
    const handleUnSavePost = () => {
        setisSaved(false)
        dispatch(unSavePostAction(_val._id))
    }
    //
    useEffect(() => {
        const isFound = _val.likes.find(val => val._id === auth.user._id)
        if (isFound) {
            setliked(true)
        }
    }, [_val.likes, auth.user._id])

    return (
        <PostFooter>
            <div className='icons__cont'>
                <div className='left__cont'>
                    <LikeUnlike liked={liked} handleLike={handleLike} handleUnlike={handleUnlike} />
                    <FaRegComment />
                    <RiShareForwardLine onClick={() => setonShare(!onShare)} />
                </div>
                <SavePostButtons setisSaved={setisSaved} post={_val} isSaved={isSaved} handleSave={handleSavePost} handleUnSave={handleUnSavePost} />
            </div>
            <div className='likes__count'>
                <span className='likes'>{_val.likes.length}</span>
                <span className='comments'>{_val.comments.length} comments</span>
            </div>
            {
                onShare &&
                // http://localhost:3000/single/post/${_val._id}
                <Share url={`www.google.com`} />
            }
        </PostFooter>
    )
}
const PostFooter = styled.div`
.likes__count{
    display: flex;
    justify-content: space-between;
    .likes{
        margin-left: 23px;
    }
}
.icons__cont{
    .likes__count{
    }
    display: flex;
    justify-content: space-between;
    .left__cont{
        svg{
            margin: 0 1rem;
        }
    }
    svg{
        cursor:pointer ;
        width: 25px;
        height: 25px;
    }
}
`
export default Footer
