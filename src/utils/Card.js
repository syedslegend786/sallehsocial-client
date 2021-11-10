import React from 'react'
import styled from 'styled-components'

const Card = ({ children }) => {
    return (
        <CardStyled>
            {children}
        </CardStyled>
    )
}
const CardStyled = styled.div`
padding: 1rem;
box-shadow: 2px 2px 40px 8px rgba(90,90,90,0.74);
-webkit-box-shadow: 2px 2px 40px 8px rgba(90,90,90,0.74);
-moz-box-shadow: 2px 2px 40px 8px rgba(90,90,90,0.74);
`
export default Card
