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
            Usuario
            <br />
            <input className="user-passw" type="text" onChange={e => setUsername(e.target.value)} name="username" />
            <br />
            <br />
            Contraseña
            <br />
            <input className="user-passw" type="password" onChange={e => setPassword(e.target.value)} name="password" />
            <br />
            <br />
            {!!error && (<p>{error}</p>)}
            <button className="boton-accion"  type="submit">Ingresar</button>
          </form>
        </aside>
      </div>
    </>
  )
}

export default Login