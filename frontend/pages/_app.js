import '../styles/globals.css'
import { checkIfIsLoggedIn, removeToken } from '../utils';

function MyApp({ Component, pageProps }) {
  let isLoggedIn = checkIfIsLoggedIn();

  const handleLogout = () => {
    removeToken();
    window.location = "/login";
  }

  return (
    <>
      <header>
        <img
          className='logo-pagina'
          src="/images/nesflis.png"
          alt="Logo Nesflis"
          height="100px"
          width="100px"
        />
        <h1>EL NESFLIS</h1>
      </header>

      <nav>
        <a className='menu-item' href="/">Home</a>
        {!isLoggedIn && (
          <a className='menu-item' href="/login">Login</a>
        )}
        {isLoggedIn && (
          <a className='menu-item' href="#" onClick={handleLogout}>Logout</a>
        )}

      </nav>
      <Component {...pageProps} />
      <footer></footer>
    </>
  )
}

export default MyApp
