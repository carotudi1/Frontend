import axios from 'axios'

const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://products-react-api-hzc6gzege9gtd8dq.centralus-01.azurewebsites.net'

const axiosClient = axios.create({
  baseURL: API_URL,
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosClient
