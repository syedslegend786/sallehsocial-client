import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { logoutAction } from '../../actions/auth.actions'
import { MdHome, MdNearMe, MdFavorite, MdExplore } from 'react-icons/md'
import { NavLink, useNavigate } from 'react-router-dom'
import MyReactMenure from '../../utils/MyReactMenure'
const LinkCont = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { auth } = useSelector(state => state)
    return (
        <LinkContStyled>
            <li className='nav-item'><NavLink to='/' ><MdHome /></NavLink> </li>
            <li className='nav-item'><NavLink to='/messages' ><MdNearMe /></NavLink> </li>
            <li className='nav-item'><NavLink to='' >
                <MyReactMenure main={<MdFavorite />} />
            </NavLink> </li>
            <li onClick={() => navigate('/discover')} className='nav-item'><NavLink to='/' ><MdExplore /></NavLink> </li>
            <li className='nav-item'>
                <div className='img__cont'>
                    <img src={auth?.user?.avatar} alt='avatar' />
                </div>
                <div className='dropdown'>
                    <span onClick={() => { navigate(`/profile/${auth.user._id}`) }}>Profile</span>
                    <span>Dark mode</span>
                    <span onClick={() => dispatch(logoutAction())}>Logout</span>
                </div>
            </li>
        </LinkContStyled>
    )
}

const LinkContStyled = styled.ul`
flex: .5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nav-item{
        flex: .5;
        .active-class{
            color: white;
        }
        position: relative;
        >.dropdown{
           position: absolute;
           right: 0;
           left: 0;
           width: 100%;
           display: none;
           z-index: 1;
           background-color: var(--background-color);
           padding: .5rem;
           border: 1px solid var(--border-light-color);
           span{
               display: block;
               text-align: center;
               &:hover{
                   background-color: var(--border-light-color);
                   cursor: pointer;
               }
           }
           @media screen and (max-width: 969px){
               top: -5rem;
    }
        }
        &:hover>.dropdown{
            display: block;
            transition: all .4s ease-in-out;
        }
        .img__cont{
            position: relative;
            cursor: pointer;
            transition: all .4s ease-in-out;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 2px solid var(--border-light-color);
                transform: translateY(5px);
                object-fit: cover;
            }
        }
        display: inline-block;
        a{
            background-color: var;
            font-size: 1.5rem;
        }
    }

    //media
    @media screen and (max-width: 969px){
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        border-top: 1px solid var(--border-light-color);
    }
`
export default LinkCont
