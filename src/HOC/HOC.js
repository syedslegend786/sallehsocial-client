import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Navigate } from 'react-router'

const HOC = ({ element: Element, ...rest }) => {
    const auth = useSelector(state => state.auth)
    const login = localStorage.getItem('firstlogin')
    return (<Route {...rest} element={auth.token && login ? Element : <Navigate to='/login' />} />)
}
export default HOC;
