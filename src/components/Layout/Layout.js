import React from 'react'
import styled from 'styled-components'
import MyNav from '../MyNav/MyNav'

const Layout = (props) => {
    return (
        <LayoutStyled>
            <MyNav />
            {props.children}
        </LayoutStyled>
    )
}
const LayoutStyled = styled.div`
margin: 0 4rem;
`
export default Layout
