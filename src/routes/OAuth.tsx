import { Spin } from 'antd'
import axios, { AxiosError } from 'axios'
import { useEffect } from 'react'
import LOCAL_STORAGE from '../constants/localStorage'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const OAuth = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const authorizationCode = urlParams.get('code')

    const fetchAccessToken = async (authorizationCode: string) => {
      const clientId = import.meta.env.VITE_API_KEY
      const clientSecret = import.meta.env.VITE_CLIENT_SECRET
      const redirectUri = import.meta.env.VITE_REDIRECT_URI

      try {
        const response = await axios.post(
          '/oauth/token',
          {
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            code: authorizationCode,
            redirect_uri: redirectUri
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )

        auth?.setIsLoggedIn(true)
        localStorage.setItem(
          LOCAL_STORAGE.ACCESS_TOKEN,
          response.data.access_token
        )

        navigate('/')
      } catch (error) {
        const er = error as AxiosError
        console.log(er.message)
        /*   if (er.message === 'Request failed with status code 400') {
          notification.error({
            message: 'Error',
            description: 'Code is invalid or expired'
          })
          navigate('/login')
        } */
      }
    }

    if (authorizationCode) {
      fetchAccessToken(authorizationCode)
    }
  }, [auth, navigate])

  return (
    <Spin spinning={true}>
      <div className='bg-grey'></div>
    </Spin>
  )
}

export default OAuth
