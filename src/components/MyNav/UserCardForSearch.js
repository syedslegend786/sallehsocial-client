import React from 'react'
import styled from 'styled-components'

const UserCardForSearch = ({ val, handleInfoClick, noaction = false }) => {
    return (
        <CardStyled onClick={() => {
            if (noaction) {
                return;
            }
            handleInfoClick(val._id)
        }}>
            <img src={val.avatar} alt='' />
            <div className='info'>
                <span>{val.username}</span>
                <span>{val.fullname}</span>
            </div>
        </CardStyled>
    )
}
const CardStyled = styled.div`
    cursor: pointer;
    border-bottom: 1px solid var(--border-light-color);
    display: flex;
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid var(--border-light-color);
    }
    .info{
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
    }
`
export default UserCardForSearch
