import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { deleteCommentAction, likeCommentAction, unlikeCommentAction, updatePostAction } from '../actions/comments.actions'
import LikeUnlike from './LikeUnlike'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import moment from 'moment'
import CommentInput from './CommentInput'
import { Link } from 'react-router-dom'

const CommentDisplay = ({ val, post, children, commentId }) => {
    // reply to a comment...
    const [onreply, setonreply] = useState(false)
    const handleReply = () => {
        if (onreply) return setonreply(false)
        setonreply(val)
    }
    // reply to a comment...
    const [editComment, seteditComment] = useState(false)
    const [editedComment, seteditedComment] = useState('')
    const [readmore, setreadmore] = useState(false)
    const [liked, setliked] = useState(false)
    const handleUnlike = () => {
        setliked(false)
        const newComment = {
            ...val,
            likes: val.likes.filter(us => us._id !== auth.user._id)
        }
        const newPost = {
            ...post,
            comments: handleComments(post.comments, newComment)
        }
        dispatch(unlikeCommentAction(newPost, newComment))
    }
    const handleLike = () => {
        setliked(true)
        const newComment = {
            ...val,
            likes: [...val.likes, auth.user]
        }
        const newPost = {
            ...post,
            comments: handleComments(post.comments, newComment)
        }
        dispatch(likeCommentAction(newPost, newComment))
    }
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const handleComments = (comments, newComment) => {
        const toReturn = comments.map((cm) => cm._id === val._id ? newComment : cm)
        return toReturn
    }
    const handleUpdateComment = () => {
        if (!editedComment.trim()) {
            return seteditComment(false)
        }
        const newComment = {
            ...val,
            content: editedComment,
        }
        const newPost = {
            ...post,
            comments: handleComments(post.comments, newComment)
        }
        dispatch(updatePostAction(newPost, newComment))
        seteditComment(false)
    }
    useEffect(() => {
        setliked(false)
        setonreply(false)
        if (val.likes.find(us => us._id === auth.user._id)) {
            setliked(true)
        }
    }, [val.likes, auth.user._id])
    const MenuItem = () => {
        return (
            <Dropdown.Menu>
                <Dropdown.Item onClick={handleDeleteComment}>Delte</Dropdown.Item>
                <Dropdown.Item onClick={() => {
                    seteditedComment(val.content)
                    seteditComment(true)
                }}>Update</Dropdown.Item>
            </Dropdown.Menu>
        )
    }
    const handleDeleteComment = () => {
        dispatch(deleteCommentAction(val, post))
    }
    return (
        <div>
            <Header>
                <img src={val.user.avatar} alt='' />
                <span>{val.user.username}</span>
            </Header>
            <Body>
                <div className='content'>
                    {
                        editComment
                            ?
                            <textarea value={editedComment} onChange={(e) => seteditedComment(e.target.value)} rows='3' />
                            :
                            <p>
                                {val.tag && val.user._id !== val.tag._id &&
                                    <Link style={{ color: 'blue', marginRight: ".4rem" }} to={`/profile/${val.tag._id}`}>@{val.tag.username}</Link>
                                }
                                {val.content.length < 100
                                    ?
                                    val.content
                                    :
                                    readmore
                                        ?
                                        val.content
                                        :
                                        val.content.slice(0, 60)}
                                {val.content.length > 100 && <span style={{ color: 'crimson', cursor: 'pointer' }} onClick={() => setreadmore(!readmore)}>{readmore ? 'hide' : 'readmore'}</span>}
                            </p>
                    }
                </div>
                <div style={{ display: 'flex' }}>
                    <LikeUnlike liked={liked} handleUnlike={handleUnlike} handleLike={handleLike} />
                    {
                        (post.user._id === auth.user._id || val.user._id === auth.user._id) &&
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <BiDotsVerticalRounded />
                            </Dropdown.Toggle>
                            {
                                post.user._id === auth.user._id
                                    ? val.user._id === auth.user._id
                                        ? MenuItem()
                                        : <Dropdown.Menu>
                                            <Dropdown.Item onClick={handleDeleteComment}>Delte</Dropdown.Item>
                                        </Dropdown.Menu>
                                    : val.user._id === auth.user._id && MenuItem()
                            }
                        </Dropdown>
                    }
                </div>
            </Body>
            <Footer>
                {
                    editComment
                        ?
                        <>
                            <span>{moment(val.createdAt).fromNow()}</span>
                            <span style={{ cursor: "pointer" }} onClick={() => seteditComment(false)}>cancel</span>
                            <span onClick={handleUpdateComment} style={{ cursor: "pointer" }}>update</span>
                        </>
                        :
                        <>
                            <span>{moment(val.createdAt).fromNow()}</span>
                            <span style={{ cursor: "pointer" }}>{val.likes.length} likes</span>
                            <span onClick={handleReply} style={{ cursor: "pointer" }}>{onreply ? "cancel" : "reply"}</span>
                        </>
                }
            </Footer>
            {
                onreply &&
                <CommentInput _val={post} onreply={onreply} setonreply={setonreply} commentId={commentId} >
                    <Link style={{ color: 'blue' }} to={`/profile/${val._id}`}>
                        @{val.user.username} :
                    </Link>
                </CommentInput>
            }
            {children}
        </div>
    )
}
const Footer = styled.div`
span{
    font-size: .8rem;
    &:not(:first-child){
        margin-left: .6rem;
        font-weight: bold;
    }
}
`

const Header = styled.div`
margin-bottom: 3px;
img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid rgba(0,0,0,.1);
    object-fit: cover;

}
span{
    font-weight: 600;
    margin-left: 1rem;
}
`
const Body = styled.div`
background-color: rgba(0,0,0,.1);
padding: .3rem .4rem;
border-radius: 20px;
display: flex;
.content{
    flex: 1;
    display: flex;
    textarea{
        flex: 1;
        border: none;
        outline: none;
        border: 1px solid rgba(0,0,0,.4);
    }
}

`
export default CommentDisplay
