import { ReactElement, createContext, useEffect, useState } from 'react'
import LOCAL_STORAGE from '../constants/localStorage'
import { useGetMeQuery } from '../api/userApi'
import Me from '../types/me'

export interface AuthValue {
  me: Me | null
  setMe: React.Dispatch<React.SetStateAction<Me | null>>
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  isFetching: boolean
}

export const AuthContext = createContext<AuthValue | null>(null)

const AuthProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [me, setMe] = useState<Me | null>(null)

  const { data, isFetching: isFetchingMe } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
  })

  useEffect(() => {
    if (data) {
      setMe(data)
      setIsLoggedIn(true)
    }
  }, [data, isLoggedIn])

  useEffect(() => {
    setIsFetching(isFetchingMe)
  }, [isFetchingMe])

  return (
    <AuthContext.Provider
      value={{
        me: me,
        isLoggedIn: isLoggedIn,
        isFetching: isFetching,
        setMe: setMe,
        setIsLoggedIn: setIsLoggedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
