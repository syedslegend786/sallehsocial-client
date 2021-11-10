import React from 'react'
import styled from 'styled-components'
import { BsDot } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { addUserToChatAction } from '../../actions/messages.actions'
import { useNavigate } from 'react-router-dom'
const UserListItems = ({ user, setsearchQuery, coversation }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleOnClick = () => {
        if (!coversation) {
            dispatch(addUserToChatAction(user))
            setsearchQuery('')
        }
        navigate(`/actualmessage/${user._id}`)
    }
    return (
        <MainStyled onClick={handleOnClick}>
            <div className='image__cont'>
                <img src={user.avatar} alt='' />
            </div>
            <div className='info__cont'>
                <h5>{user.username}</h5>
                <h5>{user.text && user.text.slice(0, 9)}...</h5>
            </div>
            <div className='dot__cont'>
                <BsDot />
            </div>
        </MainStyled>
    )
}
const MainStyled = styled.div`
&:not(:first-child){
    margin-top: 1rem;
}

cursor: pointer;
&:hover{
    background-color: #F3F4F6;
}
.dot__cont{
    svg{
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        color: #3B82F6;
    }
}
.info__cont{
    margin-left: -6rem;
    h5{
        &:last-child{
            opacity: .7;
        }
        font-size: .8rem;
        &:hover{
            text-decoration: underline;
        }
    }
}
display: flex;
align-items: center;
justify-content: space-between;
.image__cont{
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    border: 2px solid #F3F4F6;
    img{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}
`
export default UserListItems
