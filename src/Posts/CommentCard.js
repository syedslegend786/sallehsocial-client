import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CommentDisplay from './CommentDisplay'

const CommentCard = ({ val, post, replyComments }) => {
    const [showReplyComments, setshowReplyComments] = useState([])
    const [allReplyComments, setallReplyComments] = useState([])
    const [next, setnext] = useState(1)
    useEffect(() => {
        setallReplyComments(replyComments)
        setshowReplyComments(replyComments.slice(replyComments.length - next))
    }, [replyComments, next])
    return (
        <CommentCardStyled id={val._id}>
            <CommentDisplay
                val={val}
                post={post}
                commentId={val._id}
            >
                {<div style={{ paddingLeft: "2rem" }}>
                    {showReplyComments.map((cm, index) => (
                        cm.reply &&
                        <CommentDisplay
                            key={index}
                            val={cm}
                            post={post}
                            commentId={val._id}
                        />
                    ))}
                </div>
                }
                {
                    allReplyComments.length - next > 0 ?
                        <div style={{ color: "red", fontSize: '.7rem' }} onClick={() => setnext(next + 1)}>Show more</div>
                        :
                        allReplyComments.length > 1 &&
                        <div style={{ color: "red", fontSize: '.7rem' }} onClick={() => setnext(1)}>
                            Hide comments
                        </div>
                }
            </CommentDisplay>
        </CommentCardStyled >
    )
}
const CommentCardStyled = styled.div`
opacity: ${(props) => !props.id ? '.5' : '1'};
pointer-events: ${({ id }) => id ? 'all' : "none"};
margin: .3rem 2rem;
`
export default CommentCard
