import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { registerAction } from '../../actions/auth.actions'

const Register = () => {
    const passType = {
        password: 'password',
        cf_password: 'password',
    }
    const [passowrdTyped, setpassowrdTyped] = useState(passType)
    const initialState = {
        fullname: '',
        username: '',
        email: '',
        password: '',
        cf_password: '',
        gender: 'male'
    }
    const [formdata, setformdata] = useState(initialState)
    const { fullname, username, email, password, cf_password, gender } = formdata
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { alert, auth } = useSelector(state => state)
    useEffect(() => {
        if (auth.token) {
            navigate('/')
        }
    }, [auth.token, navigate])
    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(registerAction(formdata))
    }
    return (
        <Container>
            <RowStyled>
                <Col md={6}>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Full name</Form.Label>
                            <Form.Control value={fullname} onChange={e => setformdata({ ...formdata, fullname: e.target.value })} type="text" placeholder="Enter full name" />
                            <Form.Text className="text-muted">
                                {alert.fullname ? <SpanStyled>{alert.fullname}</SpanStyled> : ''}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={username} onChange={e => setformdata({ ...formdata, username: e.target.value })} type="text" placeholder="Username" />
                            <Form.Text className="text-muted">
                                {alert.username ? <SpanStyled>{alert.username}</SpanStyled> : ''}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={email} onChange={e => setformdata({ ...formdata, email: e.target.value })} type="text" placeholder="Email" />
                            <Form.Text className="text-muted">
                                {alert.email ? <SpanStyled>{alert.email}</SpanStyled> : ''}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group style={{
                            position: 'relative'
                        }} className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={password} onChange={e => setformdata({ ...formdata, password: e.target.value })} type={`${passowrdTyped.password}`} placeholder="Password" />
                            <HideShow onClick={() => {
                                setpassowrdTyped({ ...passowrdTyped, password: passowrdTyped.password === 'password' ? 'text' : "password" })
                            }}>Hide show</HideShow>
                            <Form.Text className="text-muted">
                                {alert.password ? <SpanStyled>{alert.password}</SpanStyled> : ''}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group style={{
                            position: 'relative'
                        }} className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control value={cf_password} onChange={e => setformdata({ ...formdata, cf_password: e.target.value })} type={`${passowrdTyped.cf_password}`} placeholder="Password" />
                            <HideShow onClick={() => {
                                setpassowrdTyped({ ...passowrdTyped, cf_password: passowrdTyped.cf_password === 'password' ? 'text' : "password" })
                            }}>Hide show</HideShow>
                            <Form.Text className="text-muted">
                                {alert.cf_password ? <SpanStyled>{alert.cf_password}</SpanStyled> : ''}
                            </Form.Text>
                        </Form.Group>
                        <RadioContStyled>
                            <Form.Label>Gender:</Form.Label>
                            <Form.Check value='male' checked={gender === 'male'} onChange={e => setformdata({ ...formdata, gender: e.target.value })} type="radio" label="male" />
                            <Form.Check value='female' checked={gender === 'female'} onChange={e => setformdata({ ...formdata, gender: e.target.value })} type="radio" label="female" />
                            <Form.Check value='other' checked={gender === 'other'} onChange={e => setformdata({ ...formdata, gender: e.target.value })} type="radio" label="other" />
                        </RadioContStyled>
                        <ButtonStyled variant="primary" type="submit">
                            Submit
                        </ButtonStyled>
                        <StyledP>You already have a account? <span onClick={() => { navigate('/login') }}>Login now</span></StyledP>
                    </Form>
                </Col>
            </RowStyled>
        </Container >
    )
}
const StyledP = styled.p`
opacity: .6;
span{
    color: red;
    opacity: 1;
    cursor: pointer;
}
`
const SpanStyled = styled.span`
color: crimson;
`
const HideShow = styled.small`
cursor: pointer;
color: crimson;
opacity: .7;
&:hover{
    opacity: 1;
}
position: absolute;
right: 5px;
top: 55%;
z-index: 1;
`
const RadioContStyled = styled.div`
display: flex ;
justify-content: space-between;
align-items: center;
margin: 1rem 0;
label{
    font-weight: bold;
}
`
const RowStyled = styled(Row)`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`
const ButtonStyled = styled(Button)`
width: 100%;
`

export default Register
