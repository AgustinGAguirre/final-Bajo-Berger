import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.token);
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
            <p>Usuario: <input name="username" /></p>
            <p>Contraseña: <input name="password" /></p>
            {!!error && (<p>{error}</p>)}
            <button type="submit">Ingresar</button>
          </form>
        </aside>
      </div>
    </>
  )
}
