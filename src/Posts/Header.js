import React from 'react'
import { Dropdown } from 'react-bootstrap'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { POST_CONSTANTS, deltePostAction } from '../actions/post.actions'

const Header = ({ _val }) => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const handleUpdate = (val) => {
        dispatch({
            type: POST_CONSTANTS.POST_UPDATING,
            payload: val,
        })
    }
    const handleDeletePost = () => {
        dispatch(deltePostAction(_val._id))
    }
    return (
        <PostHeader >
            <div className='header'>
                <img src={_val.user.avatar} alt='' />
                <div className='username'>
                    <Link to={`profile/${_val.user._id}`}> <h6>{_val.user.fullname} </h6></Link>
                    <span>{moment(_val.createdAt).fromNow()} </span>
                </div>
            </div>
            <Dropdown align='end'>
                <>
                    {
                        _val.user._id !== auth.user._id ?
                            <>
                                <Dropdown.Toggle variant='secondary' >
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item >Copylink</Dropdown.Item>
                                </Dropdown.Menu>
                            </>
                            :
                            <>
                                <Dropdown.Toggle variant='secondary'>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleDeletePost}>Delete</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleUpdate(_val)}>Update</Dropdown.Item>
                                    <Dropdown.Item >Copylink</Dropdown.Item>
                                </Dropdown.Menu>
                            </>
                    }
                </>
            </Dropdown>
        </PostHeader>
    )
}
const PostHeader = styled.div`
display: flex;
justify-content: space-between;
padding: .2rem;
.header{
    display: flex;
    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 4px solid rgba(0,0,0,.2);
        object-fit: cover;
    }
    .username{
        margin-left: 1rem;
        span{
            opacity: .5;
            font-size: .8rem;
        }
    }
}
`

export default Header
