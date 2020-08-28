import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const AddBlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [text, setText ] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
      imageURL: imageURL
    }

    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
    setImageURL('')
    setText('')
  }

  return (

    <div>
      <h2>Create a new blog post</h2>

      <form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>Post text:</Form.Label>
          <Form.Control
            id="text"
            type="text"
            value={text}
            name="Password"
            onChange={({ target }) => setText(target.value)}
          />
          <Form.Label>Post image URL:</Form.Label>
          <Form.Control
            id="imageURL"
            type="text"
            value={imageURL}
            name="imageURL"
            onChange={({ target }) => setImageURL(target.value)}
          />
          <Button variant="primary" type="submit" id="submitNewBlog">
            submit
          </Button>
        </Form.Group>
      </form>
    </div>
  )
}

export default AddBlogForm