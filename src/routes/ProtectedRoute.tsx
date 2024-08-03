import { lazy, Suspense } from 'react'
import LoginPage from '../pages/LoginPage'
import useAuth from '../hooks/useAuth'

const ProtectedRoute = ({ pageName }: { pageName: string }) => {
  const auth = useAuth()

  if (auth?.isFetching) {
    return <p className='bg-grey'>Wait for seconds... :)</p>
  }

  if (!auth?.isFetching && !auth?.isLoggedIn) {
    return <LoginPage />
  }

  const Page = lazy(() => import(`../pages/${pageName}.tsx`))

  return (
    <Suspense fallback={<p className='bg-grey'>Wait for seconds... :)</p>}>
      <Page />
    </Suspense>
  )
}

export default ProtectedRoute
