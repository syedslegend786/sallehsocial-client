import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route } from 'react-router'

const HOCFORLOGINREGISTER = ({ element: Element, ...rest }) => {
    const auth = useSelector(state => state.auth)
    const login = localStorage.getItem('firstlogin')
    return (
        <Route {...rest} element={auth.token && login ? <Navigate to='/' /> : Element} />
    )
}

export default HOCFORLOGINREGISTER
