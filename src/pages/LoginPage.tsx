import eventbrite_logo from '../assets/eventbrite_logo.webp'

const LoginPage = () => {
  const handleBtnClick = () => {
    const clientId = import.meta.env.VITE_API_KEY
    const redirectUri = import.meta.env.VITE_REDIRECT_URI
    const authorizationUrl = `https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`

    window.location.href = authorizationUrl
  }

  return (
    <div className='bg-grey'>
      <main className='login-page'>
        <button
          onClick={handleBtnClick}
          type='button'
          className='login-page__action'
        >
          <img src={eventbrite_logo} alt='EventBrite logo' /> Log in with
          EventBrite
        </button>
      </main>
    </div>
  )
}

export default LoginPage
