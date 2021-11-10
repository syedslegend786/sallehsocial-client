import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { followAction, unfollowAction } from '../../actions/profile.actions';

const FollowButton = ({ user }) => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const [follow, setfollow] = useState(false)
    const handleFollow = () => {
        setfollow(true)
        dispatch(followAction(user))
    }
    const handleUnfollow = () => {
        setfollow(false)
        dispatch(unfollowAction(user))
    }
    useEffect(() => {
        auth.user.following.forEach((val) => {
            if (val._id === user._id) {
                setfollow(true)
            } else {
                setfollow(false)
            }
        })
    }, [auth.user.following, user._id])
    return (
        <>
            {!follow ?
                <ButtonStyled onClick={handleFollow} > Follow</ ButtonStyled >
                :
                <ButtonStyled onClick={handleUnfollow} > Unfollow</ ButtonStyled >
            }
        </>
    )
}
const ButtonStyled = styled.button`
    border: none;
    outline: none;
    background-color: white;
    border: 1px solid var(--button-color);
    color: var(--button-color);
    padding: .5rem 1rem;
    transition: background-color  .4s ease-in-out , color .4s ease-in-out  ;
    font-weight: bold;
    &:hover{
        background-color: var(--button-color);
        color: white;
    }
`
export default FollowButton
