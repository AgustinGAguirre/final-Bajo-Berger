import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
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
        <a href="/login">Login</a>
      </nav>
      <Component {...pageProps} />
      <footer></footer>
    </>
  )
}

export default MyApp
