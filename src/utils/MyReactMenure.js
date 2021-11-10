import React, { useState } from 'react';
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import styled from 'styled-components';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletAllNotifications, deleteNotifyAction, notifyIsRead } from '../actions/notify.actions';
import { FaRegBellSlash, FaRegBell } from 'react-icons/fa'


export default function MyReactMenure({ main }) {
    const [isSound, setisSound] = useState(false)
    const dispatch = useDispatch()
    const { notify } = useSelector(state => state)
    const handleOnclick = (notification) => {
        if (notification.isRead) return;


        const newNotification = {
            ...notification,
            isRead: true,
        }
        dispatch(notifyIsRead(newNotification))
    }
    const handleDeleteAll = () => {
        dispatch(deletAllNotifications())
    }
    return (
        <MenuStyled className='testi' menuButton={<MenuButtonStyled>
            <HeartStyled style={{
                position: 'relative',
            }}>
                {main}
                <span>{notify.notifies?.length}</span>
            </HeartStyled>
        </MenuButtonStyled>} transition
            direction='bottom' position='auto' align='center' overflow='auto'
        >
            <div style={{
                display: 'flex',
                justifyContent: "space-between",
                alignItems: "center",
                padding: '1 1rem',
            }}>
                <h6>Notifications</h6>
                <div onClick={() => setisSound(!isSound)}>
                    {isSound ? <FaRegBell size='32' /> : <FaRegBellSlash size='32' />}
                </div>
            </div>
            {notify.notifies.length > 0 && < div onClick={handleDeleteAll} style={{
                textAlign: "right",
                fontSize: "1rem",
                marginTop: "1rem",
                color: 'crimson',
            }}>
                Delte All.
            </div>}
            {
                notify.notifies?.map((val, index) => (
                    <MenuItemStyled key={index}>
                        <Link to={`${val.url}`} onClick={() => handleOnclick(val)} className='main__cont'>
                            <div className='cont'>
                                <div className='left'>
                                    <img src={val.user.avatar} alt='' />
                                </div>
                                <div className='right'>
                                    <h5><span>{val.user.username}</span>{val.text}</h5>
                                </div>
                            </div>
                            <div className='bottom__cont'>
                                <span className='time'>{moment(val.createdAt).fromNow()}</span>
                                {!val.isRead && <span className='dot'></span>}
                            </div>
                        </Link>
                    </MenuItemStyled>
                ))
            }
            {
                !notify.notifies?.length > 0 &&
                <div style={{
                    textAlign: "center",
                    
                }}>
                    No Notifications!
                </div>
            }
        </MenuStyled >
    );
}
const HeartStyled = styled.div`
position: relative;
span{
    position: absolute;
    color: red;
    top: 3%;
    left: 19%;
    transform: translate(50%,50%);
    font-size: .8rem;
}
`

const MenuItemStyled = styled(MenuItem)`
.main__cont{
.bottom__cont{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem;
    .time{
        font-size: 1rem;
        opacity: .7;
    }
    .dot{
        width: 1rem;
        height: 1rem;
        background-color: blue;
        border-radius: 50%;
    }
}
.cont{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
        height: 60px;
        width: 60px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid lightgrey;
        img{
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }
    .right{
        margin-left: 2rem;
        h5{
            font-size: 1rem;
            span{
                color: blue;
                cursor: pointer;
            }
        }
    }
}
}
`
const MenuButtonStyled = styled(MenuButton)`
border: none;
outline: none;
background-color: white;
`
const MenuStyled = styled(Menu)`
border: 1px solid lightgrey;
`