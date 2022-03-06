import '../styles/globals.css'
import { checkIfIsLoggedIn, removeToken, getLoggedInUserId } from '../utils';

function MyApp({ Component, pageProps }) {
  const isLoggedIn = checkIfIsLoggedIn();
  const user = getLoggedInUserId();

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
          <a className='menu-item' href="/login">Ingresar</a>
        )}
        {isLoggedIn && (
          <a className='menu-item' href="#" onClick={handleLogout}>Cerrar sesión de {user}</a>
        )}

      </nav>
      <Component {...pageProps} />
      <footer></footer>
    </>
  )
}

export default MyApp
