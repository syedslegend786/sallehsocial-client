import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import UserCardForSearch from '../MyNav/UserCardForSearch';
import FollowButton from './FollowButton';
import MyModal from './MyModal';
import { useNavigate } from 'react-router-dom'

const Info = ({ userdata, loading }) => {
    const navigate = useNavigate()
    //modal statess...
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //
    //show followers and following modal...
    const [showFollowers, setShowFollowers] = useState(false)
    const [showfollowing, setShowfollowing] = useState(false)
    const handleInfoClick = (uid) => {
        navigate(`/profile/${uid}`)
    }
    //
    const { auth } = useSelector(state => state)
    return (
        <InfoStyled>
            <MyModal userdata={userdata} show={show} handleClose={handleClose} />
            <LeftCont>
                <img src={
                    userdata._id === auth.user._id ?
                        auth.user.avatar
                        :
                        userdata.avatar
                } alt='avatar' />
            </LeftCont>
            <RightCont>
                <div className='username__cont'>
                    <h5>{userdata.username}</h5>
                    {
                        userdata._id === auth.user._id ?
                            <button onClick={handleShow}>Edit profile</button>
                            :
                            < FollowButton user={userdata} />
                    }
                </div>
                <div className='fullname__cont'>
                    <h5>{userdata.fullname}</h5>
                    <h5>{userdata.mobile}</h5>
                </div>
                <div className='follow__cont'>
                    <h5 onClick={() => { setShowFollowers(true) }}>followers {
                        userdata._id === auth.user._id ?
                            auth.user.followers?.length
                            :
                            userdata.followers?.length
                    }</h5>
                    <h5 onClick={() => { setShowfollowing(true) }}> following {
                        userdata._id === auth.user._id ?
                            auth.user.following?.length
                            :
                            userdata.following?.length
                    }</h5>
                </div>
                <div className='address__cont'>
                    <h5>{userdata.address}</h5>
                </div>
                <div className='website__cont'>
                    <a href={`${userdata.website}`} rel="noreferrer" target="_blank">{userdata.website}</a>
                </div>
                <div className='story__cont'>
                    <p>{userdata.story}</p>
                </div>
            </RightCont>
            {showFollowers &&
                <ModalForFollowDetails>
                    <div className='cardContainer'>
                        <h2>Followers</h2>
                        <CloseButton onClick={() => setShowFollowers(false)}>X</CloseButton>
                        {
                            userdata._id === auth.user._id ?
                                auth.user.followers?.map((val) => {
                                    return <CardCont onClick={() => setShowFollowers(false)}>
                                        <UserCardForSearch handleInfoClick={handleInfoClick} val={val} />
                                        <FollowButton user={val} />
                                    </CardCont>
                                })
                                :
                                userdata.followers?.map((val) => {
                                    return <CardCont>
                                        <UserCardForSearch handleInfoClick={handleInfoClick} val={val} />
                                        {/* <FollowButton user={val} /> */}
                                    </CardCont>
                                })
                        }
                    </div>
                </ModalForFollowDetails>
            }
            {showfollowing &&
                <ModalForFollowDetails>
                    <div className='cardContainer'>
                        <h2>Following</h2>
                        <CloseButton onClick={() => setShowfollowing(false)}>X</CloseButton>
                        {
                            userdata._id === auth.user._id ?
                                auth.user.following?.map((val) => {
                                    return <CardCont onClick={() => setShowfollowing(false)}>
                                        <UserCardForSearch handleInfoClick={handleInfoClick} val={val} />
                                        <FollowButton user={val} />
                                    </CardCont>
                                })
                                :
                                userdata.following?.map((val) => {
                                    return <CardCont>
                                        <UserCardForSearch handleInfoClick={handleInfoClick} val={val} />
                                        {/* <FollowButton user={val} /> */}
                                    </CardCont>
                                })
                        }
                    </div>
                </ModalForFollowDetails>
            }
        </InfoStyled >
    )
}
const CloseButton = styled.button`
position: absolute;
top: 1rem;
right: 1rem;
outline: none;
border: none;
border-radius: 50%;
background: none;
padding: .4rem;
color: crimson;
`
const CardCont = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
button{
    margin-left: 2rem;
}
`
const ModalForFollowDetails = styled.div`
.cardContainer{
position: relative;
width: calc(100vw - 60vw);
height: calc(100vh - 40vh);
background-color: white;
overflow: auto;
padding: 1rem;
}
position:fixed;
width: 100vw;
height: 100vw;
background-color: rgba(0,0,0,.5);
display: flex;
justify-content: center;
align-items: center;
`
const RightCont = styled.div`
flex: .5;
.fullname__cont{
    display: flex;
    align-items: center;
    h5{
        font-size: 1rem;
        &:last-child{
            margin-left: 2rem;
            color: red;
        }
    }
}
.story__cont{
    p{
        font-size: 1rem;
        color: var(--font-color-primary);
    }
}
.website__cont{
    a {
            font-size: 1rem;
            color: var(--button-color);
        &:hover{
            text-decoration: underline;
        }
    }
}
.address__cont{
    
}
.follow__cont{
    display: flex;
    align-items: center;
    h5{
        &:not(:last-child){
            margin-right: 2rem;
        }
        font-size: 1rem;
        color: var(--button-color);
        &:hover{
            text-decoration: underline;
            cursor: pointer;
        }
    }
}
.username__cont{
    display: flex;
    align-items: center;
    justify-content: space-between;
    h5{
        color: var(--font-color-primary);
    }
    button{
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
    }
}

`
const LeftCont = styled.div`
flex: .5;
text-align: center;
img{
    width: 350px;
    height: 350px;
    object-fit: cover;
    border-radius: 50%;
}
`
const InfoStyled = styled.div`
padding: 2rem;
display: flex;
align-items: center;
justify-content: space-evenly;
`

export default Info
