import { useState } from 'react'
import Cookies from 'js-cookie'

export default function useToken() {
  const getToken = () => {
    return Cookies.get('token')
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (userToken: string) => {
    Cookies.set('token', userToken)
    setToken(userToken)
  }

  const remove = () => {
    Cookies.remove('token')
    setToken('')
  }

  return {
    setToken: saveToken,
    token,
    remove,
  }
}
