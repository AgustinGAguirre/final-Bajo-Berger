import '../styles/globals.css'
import { getToken, removeToken } from '../utils';

function MyApp({ Component, pageProps }) {
  let token = getToken();

  const handleLogout = () => {
    removeToken();
    window.location = "/login";
  }

  return (
    <>
      <header>
        <img
          src="/images/nesflis.png"
          alt="Logo Nesflis"
          height="100px"
          width="100px"
        />
        <h1>EL NESFLIS</h1>
      </header>

      <nav>
        <a href="/">Home</a>
        {!token && (
          <a href="/login">Login</a>
        )}
        {!!token && (
          <a href="#" onClick={handleLogout}>Logout</a>
        )}

      </nav>
      <Component {...pageProps} />
      <footer></footer>
    </>
  )
}

export default MyApp
