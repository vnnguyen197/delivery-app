import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_URL } from 'constants/common'
import Cookies from 'js-cookie'
//set up dafault config for http requests here
// Please heva a look at here /github axios

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/json',
  },
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    config.headers = {
      Authorization: `Bearer ${Cookies.get('token')}`,
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    if (error.response.status === 401) {
      Cookies.remove('token')
      // if (router.asPath !== '/register') router.push('/login')
    }
    return Promise.reject(error)
  }
)
export default axiosClient
