import { useContext } from 'react'
import { AuthContext, AuthValue } from '../provider/AuthProvider'

const useAuth = (): AuthValue | null => useContext(AuthContext)

export default useAuth
