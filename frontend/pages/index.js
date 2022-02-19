import { useState, useEffect } from "react";
import axios from "axios";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [error, setError] = useState("");

  useEffect(async () => {
    await axios.get("http://127.0.0.1:5000/api/movies", {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }).then((response) => {
      setMovies(response.data);
    }).catch((e) => {
      console.error(e);
      setError("Hubo un problema al obtener las peliculas, por favor intentelo nuevamente");
    });

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

  return (
    <>
      <div id="container">
        <aside id="peliculas">
          <h2>Últimas 10 peliculas</h2>
          Director:
          <select>
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
