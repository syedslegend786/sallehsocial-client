import React from 'react'
import ReactLoading from "react-loading";
import styled from 'styled-components'
const Loading = () => {
    return (
        <LoadingStyled>
            <ReactLoading type={`bubbles`} color="white" />
        </LoadingStyled>
    )
}
const LoadingStyled=styled.div`
position: fixed;
height: 100vh;
width: 100vw;
background-color: #0008;
z-index: 1000;
display: flex;
justify-content: center;
align-items: center;
`

export default Loading
