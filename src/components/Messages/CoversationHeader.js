import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const CoversationHeader = ({ uid }) => {
    const { messages } = useSelector(state => state)
    const [headerData, setheaderData] = useState({})
    useEffect(() => {
        messages.users.forEach(val => {
            if (val._id === uid) {
                setheaderData(val)
            }
        })
    }, [uid, messages.users])
    return (
        <CoversationHeaderStyled>
            <HeaderData>
                <div className='image__cont'>
                    <img src={headerData?.avatar} alt='' />
                </div>
                <div className='info__cont'>
                    <h5>{headerData?.username}</h5>
                    <h5>{headerData?.fullname}</h5>
                </div>
            </HeaderData>
        </CoversationHeaderStyled>
    )
}
const HeaderData = styled.div`
display: flex;
align-items: center;
.info__cont{
    margin-left: 1rem;
    h5{
        font-size: 1rem;
        :last-child{
            opacity: .6;
        }
    }
}
.image__cont{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: white;
    overflow: hidden;
    text-align: center;
    border: 3px solid #34D399;
    img{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}
`
const CoversationHeaderStyled = styled.div`
padding: .5rem 1rem;
height: 71px;
box-shadow:0 4px 3px rgba(0, 0, 0, 0.07);
`
export default CoversationHeader
