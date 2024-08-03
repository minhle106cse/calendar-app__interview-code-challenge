import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import LOCAL_STORAGE from '../../constants/localStorage'

const axiosClient = axios.create({
  baseURL: '/v3',
  timeout: 10000,
  headers: {
    'content-type': 'application/json'
  },
  withCredentials: true
})

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }

    return config
  }
)

axiosClient.interceptors.response.use((response: AxiosResponse) => {
  // TODO: handle expired token
  return response
})

export default axiosClient
