import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { createComment } from '../actions/comments.actions'
const CommentInput = ({ _val, onreply, children, setonreply, commentId }) => {
    const [content, setcontent] = useState('')
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const handleComment = () => {
        if (!content.trim()) {
            return
        }
        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
        }
        if (onreply) {
            newComment.reply = commentId
            newComment.tag = onreply.user
        }
        const post = {
            ..._val,
            comments: [..._val.comments, newComment]
        }
        dispatch(createComment(newComment, post, _val))
        if (setonreply) return setonreply(false)
    }
    return (
        <CommentsStyled>
            {children}
            <input placeholder={`Comment as ${auth.user.fullname}`} value={content} onChange={(e) => setcontent(e.target.value)} />
            <button onClick={handleComment}>Send</button>
        </CommentsStyled>
    )
}
const CommentsStyled = styled.div`
button{
    outline: none;
    border:none;
    color: blue;
    background: none;
}
display: flex;
width: 100%;
input{
    flex: 1;
    outline: none;
    border: none;
    padding: 0 2rem;
}
border: none;
border: 1px solid rgba(0,0,0,.1);
padding: .5rem;
`

export default CommentInput
