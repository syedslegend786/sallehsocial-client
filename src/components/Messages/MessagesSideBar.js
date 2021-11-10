import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'
import UserListItems from './UserListItems'
import axios from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { globalConstants } from '../../actions/actionConstants'
import { getSideBarConversations } from '../../actions/messages.actions'
const MessagesSideBar = () => {
    const { messages, auth } = useSelector(state => state)
    const [searchQuery, setsearchQuery] = useState('')
    const [gotUsers, setgotUsers] = useState([])
    const dispatch = useDispatch()
    const handleOnChange = async (q) => {
        setsearchQuery(q)
        if (q === '' || searchQuery === "" || searchQuery.trim() === '') {
            setgotUsers([])
            return;
        } else {
            try {
                const res = await axios.get(`/search?username=${searchQuery}`)
                setgotUsers(res.data.users)
            } catch (error) {
                dispatch({
                    type: globalConstants.ALERT,
                    payload: { error: error.message }
                })
            }
        }
    }
    useEffect(() => {
        if (!messages.firstLoad) {
            dispatch(getSideBarConversations())
        }
    }, [messages.firstLoad, dispatch])
    const handleUser = (u) => {
        const toReturn = messages.users.find(v => u._id === v._id)
        if (toReturn) {
            return toReturn
        }
        return u
    }
    return (
        <SideBarStyled>
            <SearchBarCont>
                <div className='search'>
                    <input placeholder='search user...' type='text' value={searchQuery} onChange={e => handleOnChange(e.target.value)} />
                    <AiOutlineSearch />
                </div>
            </SearchBarCont>
            <UsersContainer>
                {
                    gotUsers.length > 0 && searchQuery ?
                        gotUsers.map((val, index) => (
                            val._id === auth.user._id
                                ?
                                null
                                :
                                < UserListItems setsearchQuery={setsearchQuery} key={index} user={handleUser(val)} />
                        ))
                        :
                        messages.users?.map((val, index) => (
                            <UserListItems coversation={true} key={index} user={val} />
                        ))
                }
            </UsersContainer>
        </SideBarStyled>
    )
}
const UsersContainer = styled.div`
padding: 1rem 0;
`
const SearchBarCont = styled.div`
height: 71px;
box-shadow :0 4px 3px rgba(0, 0, 0, 0.07);
padding: .5rem 1rem;
.search{
    background-color: #F3F4F6;
    display: flex;
    align-items: center;
    border-radius: 20px;
    overflow: hidden;
    padding: .7rem;
    input{
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
    }
    svg{
        font-size: 2rem;
        opacity: .5;
    }
}
`
const SideBarStyled = styled.div`

`
export default MessagesSideBar
