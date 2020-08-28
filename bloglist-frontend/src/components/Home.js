import React, { useEffect, useRef } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, updateBlog } from '../reducers/blogsReducer'
import { setCredentials } from '../reducers/loginReducer'
import { setUser } from '../reducers/userReducer'
import AddBlogForm from './AddBlogForm'
import { setMessage, removeMessage } from '../reducers/messageReducer'
import LoginForm from './LoginForm'
//import '../index.css'

import { Table, Form, Button } from 'react-bootstrap'

import {
  Link
} from 'react-router-dom'

const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const credentials = useSelector(state => state.credentials)
  const user = useSelector(state => state.user)

  //checking local storage for logged in user info
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = credentials.username
      const password = credentials.password

      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      console.log('user: ', user)
      console.log('token :', user.token)

      dispatch(setUser(user))
      dispatch(setCredentials('', ''))

      dispatch(setMessage('Logged in successfuly'))
      setTimeout(() => {
        dispatch(removeMessage())
      }, 5000)
    } catch (exception) {
      console.log('wrong credentials')
      dispatch(setMessage('Wrong credentials'))
      setTimeout(() => {
        dispatch(removeMessage())
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(setMessage('Successfuly created a new blog'))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }

  //DUPLICATE CODE!! REMOVE!!
  const incrementLikes = (blog) => {

    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    console.log('blog object: ', blogObject)

    dispatch(updateBlog(blogObject, blog.id))
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new post' ref={blogFormRef}>
      <AddBlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  const sortedByLikes = blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)

  return (
    <div>
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={credentials.username}
          password={credentials.password}
        /> :
        <div>
          <h2 className={'homeHeader'}>Blog posts</h2>
          {blogForm()}
          <Table striped>
            <tbody>
              {sortedByLikes.map(blog =>
                <tr key={blog.id}>
                  <td className={'homeBlogTitles'}>
                    <div>
                      <Link className={'homeBlogTitles'} to={`/blogs/${blog.id}`}>
                        {blog.title}
                      </Link><br /><br />
                      {blog.imageURL ? <img className={'homeBlogImage'} src={blog.imageURL} /> : null}<br />
                      {blog.likes + ' likes '} {blog.comments.length} {blog.comments.length === 1 ? ' comment' : 'comments'} - posted by {blog.author}
                      - <Button onClick={() => incrementLikes(blog)} >like</Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      }
    </div>


  )


}

export default Home