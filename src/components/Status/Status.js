import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { globalConstants } from '../../actions/actionConstants'

const Status = () => {
    const dispatch = useDispatch()
    const { auth } = useSelector(state => state)
    return (
        <StatusStyled>
            <img src={auth?.user?.avatar} alt='' />
            <div className='right__cont'>
                <button onClick={() => {
                    dispatch({
                        type: globalConstants.STATUS,
                        payload: true,
                    })
                }}>{`${auth?.user?.fullname}, what are you thnking?`}</button>
            </div>
        </StatusStyled >
    )
}
const StatusStyled = styled.div`
padding: .2rem;
display: flex;
align-items: center;
img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #EFEFEF;
}
.right__cont{
    background-color: #EFEFEF;
    padding: 2rem;
    margin-left: 1rem;
    border-radius: 20px;
    button{
        border: none;
        width: 100%;
        height: 100%;
    }
}
`

export default Status
