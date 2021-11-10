import React from 'react'
import { Card } from 'react-bootstrap'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import Comments from './Comments'
import CommentInput from './CommentInput'
const PostCardMain = ({ _val }) => {
    return (
        <Card  style={{
            marginTop: '1rem'
        }}>
            <Header _val={_val} />
            <Body _val={_val} />
            <Footer _val={_val} />
            <Comments _val={_val} />
            <CommentInput _val={_val} />
        </Card>
    )
}

export default PostCardMain
