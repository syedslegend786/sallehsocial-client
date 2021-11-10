import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { useDispatch } from 'react-redux';

const MyToast = ({ show, setShow, bg, color, msg }) => {
    const dispatch = useDispatch()
    return (
        <ToastContainer style={{
            zIndex: "1000"
        }} className="p-3" position={`top-end`}>
            <Toast onClose={() => dispatch({ type: 'ALERT', payload: {} })} show={show} delay={3000} autohide bg={bg} >
                <Toast.Header>
                    <strong className="me-auto">Notification!</strong>
                    <small>{Date.now().toLocaleString()}</small>
                </Toast.Header>
                <Toast.Body style={{ color: `${color}` }}>{msg}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default MyToast
