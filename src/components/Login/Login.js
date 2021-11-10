import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { loginAction } from '../../actions/auth.actions'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [hideshow, sethideshow] = useState(false)
    const initialState = {
        email: '',
        password: ''
    }
    const [formdata, setformdata] = useState(initialState)
    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(loginAction(formdata))
    }
    useEffect(() => {
        if (auth.token) {
            navigate('/')
        }
    }, [auth.token, navigate])
    return (
        <Container>
            <FormRow >
                <Col xs={6}>
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required value={formdata.email} onChange={e => setformdata({ ...formdata, email: e.target.value })} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group style={{
                            position: 'relative'
                        }} className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required value={formdata.password} onChange={e => setformdata({ ...formdata, password: e.target.value })} type={`${hideshow ? 'text' : 'password'}`} placeholder="Password" />
                            <HideShow onClick={() => sethideshow(!hideshow)}>Hide show</HideShow>
                        </Form.Group>
                        <ButtonStyled variant='primary' type="submit">
                            Submit
                        </ButtonStyled>
                        <StyledP>You don't have a account? <span onClick={() => { navigate('/register') }}>Register now</span></StyledP>
                    </Form>
                </Col>
            </FormRow>
        </Container>
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
const FormRow = styled(Row)`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;

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
const ButtonStyled = styled(Button)`
width: 100%;
`
export default Login
