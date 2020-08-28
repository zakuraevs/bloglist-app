import React, { useRef } from 'react'
import { setCredentials } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

import SignUpForm from './SignUpForm'
import Togglable from './Togglable'

import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleLogin, username, password }) => {

  const dispatch = useDispatch()

  const signUpRef = useRef()

  return (
    <div>
      <form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username-form"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => dispatch(setCredentials(target.value, password))}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password-form"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => dispatch(setCredentials(username, target.value))}
          />
          <Button variant="primary" type="submit" id="loginButton">
            login
          </Button>
        </Form.Group>
      </form>
      <Togglable buttonLabel='Sign Up' ref={signUpRef}>
        <SignUpForm />
      </Togglable>
    </div>
  )
}

export default LoginForm