import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [selectedDirector, setSelectedDirector] = useState();
  const [error, setError] = useState("");

  useEffect(async () => {
    await axios.get("http://127.0.0.1:5000/api/movies", {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
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
    await axios.get("http://127.0.0.1:5000/api/directors", {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }).then((response) => {
      setDirectors(response.data);
    }).catch((e) => {
      console.error(e);
      setError("Hubo un problema al obtener los directores, por favor intentelo nuevamente");
    });
  }, [])

  const handleChangeDirector = e => {
    setSelectedDirector(e.target.value);
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
              {movie.name}
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