import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import registrationService from '../services/register'
import loginService from '../services/login'
import { setCredentials } from '../reducers/loginReducer'
import { setUser } from '../reducers/userReducer'
import { setMessage, removeMessage } from '../reducers/messageReducer'


const SignUpForm = () => {

  const dispatch = useDispatch()

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {

      await registrationService.register(username, password)

      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      //console.log('user: ', user)
      //console.log('token :', user.token)

      dispatch(setUser(user))
      dispatch(setCredentials('', ''))

      dispatch(setMessage('Registered in successfuly'))
      setTimeout(() => {
        dispatch(removeMessage())
      }, 5000)
    } catch (exception) {
      console.log('this username alrady exists')
      console.log('exception: ', exception)
      dispatch(setMessage('this username alrady exists'))
      setTimeout(() => {
        dispatch(removeMessage())
      }, 5000)
    }
  }

  return(
    <div>
      <h2>Sign up</h2>

      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password"
            type="text"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="primary" type="submit" id="submitNewBlog">
            submit
          </Button>
        </Form.Group>
      </form>
    </div>
  )


}

export default SignUpForm