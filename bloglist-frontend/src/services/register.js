import axios from 'axios'
const baseUrl = '/api/users'

const register = async (username, password) => {

  const user = {
    "username": username,
    "name": username,
    "password": password
  }

  const response = await axios.post(baseUrl, user)
  return response.data
}

export default { register }