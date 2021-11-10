import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Loading from './Loading'
import MyToast from './MyToast'

const Alerts = () => {
    const { alert } = useSelector(state => state)
    const [showSuccess, setShowSuccess] = useState(true)
    return (
        <div>
            {alert.loading ? <Loading /> : ''}
            {alert.success ? <MyToast msg={alert.success} color={`white`} show={showSuccess} bg={`success`} setShow={setShowSuccess} /> : ''}
            {alert.error ? <MyToast msg={alert.error} color={`black`} show={showSuccess} bg={`danger`} setShow={setShowSuccess} /> : ''}s
        </div>
    )
}

export default Alerts
