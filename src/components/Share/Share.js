import React from 'react'
import styled from 'styled-components'
import {
    FacebookShareButton, FacebookIcon,
} from "react-share";
const Share = ({ url }) => {
    return (
        <ShareStyled>
            <FacebookShareButton url={url}>
                <FacebookIcon round={true} size={32} />
            </FacebookShareButton>
        </ShareStyled>
    )
}
const ShareStyled = styled.div`

`
export default Share
