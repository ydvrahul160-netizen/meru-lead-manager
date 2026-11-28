import API from './api'

// Signup user
export const signupUser = async (userData) => {
  const response = await API.post('/auth/signup', userData)

  if (response.data.success) {
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
  }

  return response.data
}

// Login user
export const loginUser = async (credentials) => {
  const response = await API.post('/auth/login', credentials)

  if (response.data.success) {
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
  }

  return response.data
}

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}