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
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`, {
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
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/directors`).then((response) => {
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
        <aside id="peliculas" style={{ margin: "auto" }}>
          <div>
            <h2 className="title">Últimas 10 peliculas</h2>
            <h3 className="director">Director:</h3>
            <select onChange={handleChangeDirector}>
              <option className="lista-directores" value="">TODOS</option>
              {directors?.map((director) => (
                <option value={director}>{director}</option>
              ))}
            </select>
          </div>
          <div className="background">
            {!!movies && movies.map((movie) => (
              <div className="img-container">
                <img className="cover" src={movie.image || "http://via.placeholder.com/333x500"} />
                <div className="movie-title">{movie.title}<br /> ({movie.director} {movie.year})</div>

                <div className="boton-accion-container">
                  {isLoggedIn && <a className="boton-accion" href={`/movies/${movie.id}`}>editar</a>}
                  {isLoggedIn && <a className="boton-accion" href={`/movies/${movie.id}/comments`}>Comentarios</a>}
                </div>
              </div>
            ))}
          </div>
          <br />
          <p>{error}</p>
        </aside>
      </div>
    </>
  )
}

export default Home;