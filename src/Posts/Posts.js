import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import PostCardMain from './PostCardMain'

const Posts = () => {
    const { posts } = useSelector(state => state)
    return (
        <PostStyled>
            {
                // posts.posts.map((val, index) => {
                // return (
                posts.posts.map((_val, _index) => {
                    return (
                        <PostCardMain key={_index} _val={_val} />
                    )
                })
                // ) 
                // })
            }
        </PostStyled>
    )
}



const PostStyled = styled.div`

`
export default Posts
