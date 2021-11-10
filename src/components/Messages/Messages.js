import React from 'react'
import styled from 'styled-components'
import Layout from '../Layout/Layout'
import MessagesChatContainer from './MessagesChatContainer'
import MessagesSideBar from './MessagesSideBar'

const Messages = () => {
    return (
        <Layout>
            <MessagesStyled>
                <LeftContStyled>
                    <MessagesSideBar />
                </LeftContStyled>
                <RightContStyled>
                    <MessagesChatContainer />
                </RightContStyled>
            </MessagesStyled>
        </Layout>
    )
}
const RightContStyled = styled.div`
flex:1;
`
const LeftContStyled = styled.div`
flex: .2;
border-right: 1px solid lightgrey;
`
const MessagesStyled = styled.div`
height: calc(100vh - 100px);
width: 100%;
overflow: hidden;
display: flex;
`
export default Messages
