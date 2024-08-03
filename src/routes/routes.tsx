import { RouteObject } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from '../pages/LoginPage'
import OAuth from './OAuth'

const routes: RouteObject[] = [
  {
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <ProtectedRoute pageName='CalendarPage' />
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/oauth/redirect',
    element: <OAuth />
  }
]

export default routes
