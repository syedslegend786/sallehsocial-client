import { Button, Form, Modal } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { MdCameraAlt } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfileAction } from '../../actions/profile.actions'
import { avatarValid } from './ProfileValid'
import { globalConstants } from '../../actions/actionConstants'
const MyModal = ({ show, handleClose, userdata }) => {
    const dispatch = useDispatch()
    const { alert } = useSelector(state => state)
    const initialState = {
        fullname: '', mobile: '', address: '', story: '', website: '', gender: ''
    }
    const [formdata, setformdata] = useState(initialState)
    const { fullname, mobile, story, website, gender } = formdata
    const [updatedAvatar, setUpdatedAvatar] = useState('')
    const handleAvatar = (e) => {
        const file = e.target.files[0]
        const err = avatarValid(file)
        if (err) {
            return dispatch({
                type: globalConstants.ALERT,
                payload: { error: err }
            })
        }
        if (file) {
            setUpdatedAvatar(file)
        }
    }
    const handleModalSubmit = () => {
        dispatch(updateProfileAction({ formdata, updatedAvatar }))
            .then((val) => {
                if (val) {
                    handleClose()
                }
            })
    }
    const handleChange = (e) => {
        const { value, name } = e.target;
        setformdata({ ...formdata, [name]: value });
    }
    useEffect(() => {
        setformdata(userdata)
    }, [userdata])
    return (
        <Modal show={show} onHide={handleClose} animation={true}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AvatarCont>
                    <div className='image__cont'>
                        <img src={updatedAvatar ? window.URL.createObjectURL(updatedAvatar) : userdata.avatar} alt='avatar' />
                        <MdCameraAlt />
                        <input onChange={handleAvatar} className='input__data' type='file' />
                    </div>
                </AvatarCont>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control value={fullname} onChange={handleChange} name='fullname' type="text" placeholder="Full name" />
                        <Form.Text className="text-muted">
                            {alert.updateprofileerror ? <span style={{
                                color: 'crimson'
                            }}>{alert.updateprofileerror.fullname}</span> : ''}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Website</Form.Label>
                        <Form.Control name='website' value={website} onChange={handleChange} type="text" placeholder="Website" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control value={mobile} onChange={handleChange} name='mobile' type="text" placeholder="Phone number" />
                        </Form.Group>
                        <Form.Label>Story</Form.Label>
                        <textarea className='form-control' cols='30' name='story' value={story} onChange={handleChange} type="text" placeholder="Story" />
                        <Form.Text style={{
                            color: 'crimson'
                        }} className="text-muted text-danger">
                            {alert.updateprofileerror ? <span style={{
                                color: 'crimson'
                            }}>{alert.updateprofileerror.story}</span> : ''}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Gender</Form.Label>
                        <Form.Select value={gender} onChange={handleChange} name='gender' aria-label="Default select example">
                            <option value="male">male</option>
                            <option value="female">female</option>
                            <option value="other">other</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleModalSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
const AvatarCont = styled.div`
display: flex;
justify-content: center;
.image__cont{
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    &:hover{
        svg{
    position: absolute;
    left: 40%;
    bottom: 10%;
    font-size: 2rem;
}
    }
    img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    }
svg{
    position: absolute;
    left: 40%;
    bottom: -100px;
    font-size: 2rem;
    transition: all .4s ease-in-out;
}
input{
    position: absolute;
    left: 0;
    bottom: 0;
    top:0;
    opacity: 0;
    background-color: red;
    cursor: pointer;
}
}

`

export default MyModal
