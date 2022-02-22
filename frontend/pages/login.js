import { useState } from "react";
import axios from "axios";
import { removeToken, setToken } from "../utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = async (e) => {
    e.preventDefault();
    removeToken();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        username,
        password
      });
      if (response.status === 200) {
        setToken(response.data.token);
        window.location = "/"
        return null;
      }
      setError("Hubo un problema al ingresar, por favor intente nuevamente")
    }
    catch (e) {
      console.error(e);
      setError("El usuario o la contraseña son incorrectos.")
    }
  }

  return (
    <>
      <div id="container">
        <aside id="login">
          <h2>Login</h2>
          <br />
          <form action="/login" method="POST" onSubmit={login}>
            <p>Usuario: <input type="text" onChange={e => setUsername(e.target.value)} name="username" /></p>
            <p>Contraseña: <input type="password" onChange={e => setPassword(e.target.value)} name="password" /></p>
            {!!error && (<p>{error}</p>)}
            <button type="submit">Ingresar</button>
          </form>
        </aside>
      </div>
    </>
  )
}

export default Login