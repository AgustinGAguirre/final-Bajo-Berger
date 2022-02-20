import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import { checkIfIsLoggedIn, getToken } from "../utils";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [selectedDirector, setSelectedDirector] = useState();
  const [error, setError] = useState("");
  let isLoggedIn = checkIfIsLoggedIn();
  const router = useRouter();
  useEffect(async () => {
    await axios.get("http://127.0.0.1:5000/api/movies", {
      params: {
        director: selectedDirector
      }
    }).then((response) => {
      setMovies(response.data);
    }).catch((e) => {
      console.error(e);
      setError("Hubo un problema al obtener las peliculas, por favor intentelo nuevamente");
    });
  }, [selectedDirector])

  useEffect(async () => {
    await axios.get("http://127.0.0.1:5000/api/directors").then((response) => {
      setDirectors(response.data);
    }).catch((e) => {
      console.error(e);
      setError("Hubo un problema al obtener los directores, por favor intentelo nuevamente");
    });
  }, [])

  const handleChangeDirector = e => {
    setSelectedDirector(e.target.value);
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/api/movies/${id}`, {
      headers: {
        authorization: `Bearer ${getToken()}`
      }
    }).then((response) => {
      router.reload(window.location.pathname)
    }).catch((e) => {
      console.error({ e });
      setError("Hubo un problema al eliminar la pelicula");
    });
  }


  return (
    <>
      <div id="container">
        <aside id="peliculas">
          <h2>Últimas 10 peliculas</h2>
          Director:
          <select onChange={handleChangeDirector}>
            <option value="">TODOS</option>
            {directors?.map((director) => (
              <option value={director}>{director}</option>
            ))}
          </select>

          {!!movies && movies.map((movie) => (
            <p>
              {movie.title}
              {isLoggedIn && <a href={`/movies/${movie.id}`}>editar</a>}
              {isLoggedIn && <a href="#" onClick={() => handleDelete(movie.id)}>eliminar</a>}
            </p>
          ))}
          <br />
          <p>{error}</p>
        </aside>
      </div>
    </>
  )
}

export default Home;