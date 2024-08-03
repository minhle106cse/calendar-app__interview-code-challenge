import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import useAuth from '../hooks/useAuth'
import { SignOut } from '@phosphor-icons/react'

const Header = () => {
  const auth = useAuth()

  const navigate = useNavigate()

  return (
    <header className='header'>
      <div></div>
      <img src={logo} alt='Logo' className='header__logo' />

      <span className='header__name'>
        {auth?.isLoggedIn &&
          (auth?.isFetching
            ? 'Wait for seconds... :)'
            : `Hi, ${auth?.me?.name} 🔥🔥🔥`)}

        {auth?.isLoggedIn && (
          <span
            className='header__logout'
            onClick={() => {
              localStorage.clear()
              navigate('/login')
            }}
          >
            <SignOut /> <span style={{ marginLeft: '.5rem' }}>Log out</span>
          </span>
        )}
      </span>
    </header>
  )
}

export default Header
