import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MdClose } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from '../../utils/utils'
import LinkCont from './LinkCont'
import UserCardForSearch from './UserCardForSearch'
const MyNav = () => {
    const navigate = useNavigate()
    const [search, setsearch] = useState('')
    const [usersData, setUsersData] = useState([])
    const { auth } = useSelector(state => state)
    const handleInfoClick = (uid) => {
        navigate(`/profile/${uid}`)
    }
    const handleCloseIcon = () => {
        setsearch('')
        setUsersData([])
    }
    useEffect(() => {
        if (search && auth.token) {
            const fetch = async () => {
                const res = await axios.get(`/search?username=${search}`)
                setUsersData(res.data.users)
            }
            fetch()
        }
    }, [search, auth.token])
    return (
        <NavStyled search={search}>
            <div style={{
                cursor: "pointer",
            }} onClick={() => {
                navigate("/")
                // window.scrollTo({ top: 0 })
            }} className='logo'><h1>Salleh</h1></div>
            <div className='search__cont'>
                <input value={search} onChange={e => setsearch(e.target.value)} type='text' placeholder='search' />
                <MdClose onClick={handleCloseIcon} className='close__icon' />
                <DropDownStyled search={search}>
                    {
                        usersData.map((val, index) => {
                            return (
                                <UserCardForSearch handleInfoClick={handleInfoClick} val={val} />
                            )
                        })
                    }
                </DropDownStyled>
            </div>
            <LinkCont />
        </NavStyled>
    )
}

const DropDownStyled = styled.div`
position: absolute;
border: 1px solid var(--border-light-color);
width: 100%;
background-color: white;
height: calc(100vh - 150px);
display: ${props => props.search ? "block" : "none"};
z-index: 10;
overflow: scroll;
::-webkit-scrollbar{
    display: none;
}
.search__cont{
    svg{
        display: ${props => props.search ? "block" : "none"};
    }
}
`
const NavStyled = styled.div`
position: sticky;
top: 0;
z-index: 999;
background-color: white;
transition: all .4s ease-in-out;
width: 100%;
display: flex;
align-items: center;
justify-content: space-between    ;
border-bottom: 1px solid var(--border-light-color);
.search__cont{
    position: relative;
    .close__icon{
        position: absolute;
        top: 50%;
        right: 0;
        color: crimson;
        opacity: .6;
        transform: translate(-50%,-50%);
    }
    svg{
        cursor: pointer;
        font-size: 1.5rem;
        display: ${props => props.search ? "block" : "none"};
    }
    input{
        width: 100%;
        outline: none;
        border: none;
        border: 1px solid var(--border-light-color);
        padding: .4rem;
    }
}
.logo{
        h1{
            text-transform: capitalize;
            font-size: 1.5rem;
            letter-spacing: 1rem;
        }
    }
`

export default MyNav
