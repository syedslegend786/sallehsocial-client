import React, { useEffect, useState } from 'react'

import CommentCard from './CommentCard'

const Comments = ({ _val }) => {
    const [allComments, setallComments] = useState([])
    const [showComments, setshowComments] = useState([])
    const [next, setnext] = useState(2)
    const [replyCm, setreplyCm] = useState([])
    useEffect(() => {
        const newCm = _val.comments.filter(cm => !cm.reply)
        setallComments(newCm)
        setshowComments(newCm.slice(newCm.length - next))
    }, [_val.comments, next])
    useEffect(() => {
        const replycomments = _val.comments.filter(cm => cm.reply)
        setreplyCm(replycomments)
    }, [_val.comments])
    return (
        <div>
            {
                showComments.map((val, index) => (
                    <CommentCard
                        key={index}
                        val={val}
                        post={_val}
                        replyComments={replyCm.filter(cm => cm.reply === val._id)}
                    />
                )
                )
            }
            {
                allComments.length - next > 0
                    ?
                    <div onClick={() => setnext(next + 10)} style={{ color: 'crimson' }}>Show more</div>
                    :
                    allComments.length > 2 &&
                    <div onClick={() => setnext(2)} style={{
                        color: 'crimson'
                    }}>
                        Hide comments
                    </div>
            }
        </div >
    )
}



export default Comments
