import logo from '../assets/logo.png'
import useAuth from '../hooks/useAuth'

const Header = () => {
  const auth = useAuth()

  return (
    <header className='header'>
      <div></div>
      <img src={logo} alt='Logo' className='header__logo' />

      <span className='header__name'>
        {auth?.isLoggedIn &&
          (auth?.isFetching
            ? 'Wait for seconds... :)'
            : `Hi, I'm  ${auth?.me?.name} 🔥🔥🔥`)}
      </span>
    </header>
  )
}

export default Header
