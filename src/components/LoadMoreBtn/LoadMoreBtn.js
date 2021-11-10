import React from 'react'
import styled from 'styled-components'

const LoadMoreBtn = ({ handleLoadMore, noMoreToload }) => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            {
                !noMoreToload &&
                <ButtonStyled onClick={handleLoadMore}>Load More</ButtonStyled>
            }
        </div>
    )
}
const ButtonStyled = styled.button`
outline: none;
border: none;
color: white;
background-color: black;
padding: .5rem 1rem;
`

export default LoadMoreBtn
