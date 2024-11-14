import axios from 'axios'
import { router } from 'expo-router'

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL
})

api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      return Promise.reject(error)
    }

    if (error.response.status === 401) {
      router.replace('/auth/login');
    }
    return Promise.reject(error)
  }
)

export default api