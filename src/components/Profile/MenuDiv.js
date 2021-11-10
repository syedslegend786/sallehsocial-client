import React, { useState } from 'react'
import styled from 'styled-components'
import Posts from './Posts'
import SavedPosts from './SavedPosts'

const MenuDiv = ({ uid }) => {
    const [selectedDiv, setselectedDiv] = useState('posts')
    return (
        <div>
            <MenueStyled selectedDiv={selectedDiv}>
                <div onClick={() => setselectedDiv('posts')} className='posts'>POSTS</div>
                <div onClick={() => setselectedDiv('saved')} className='saved'>SAVED</div>
            </MenueStyled>
            {
                selectedDiv === 'posts'
                    ?
                    < Posts uid={uid} />
                    :
                    <SavedPosts />
            }
        </div>
    )
}
const MenueStyled = styled.div`
margin-bottom: 1rem;
display: flex;
justify-content: center;
.posts{
    border-top: ${(props) => props.selectedDiv === 'posts' ? '1px solid black' : ""};
    width: 6rem;
    font-size: 2rem;
    cursor: pointer;
}
.saved{
    border-top: ${(props) => props.selectedDiv === 'saved' ? '1px solid black' : ""};
    width: 6rem;
    font-size: 2rem;
    margin-left: 1rem;
    cursor: pointer;
}
`
export default MenuDiv
