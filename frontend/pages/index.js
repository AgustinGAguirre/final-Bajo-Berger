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

  const handleDelete = async (id) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${id}`, {
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
        <aside id="peliculas" style={{ margin: "auto" }}>
          <div>
            <h2 className="ultimas-peliculas">Últimas 10 peliculas</h2>
            Director:
            <select onChange={handleChangeDirector}>
              <option value="">TODOS</option>
              {directors?.map((director) => (
                <option value={director}>{director}</option>
              ))}
            </select>
          </div>
          <div className="background" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap" }}>
            {!!movies && movies.map((movie) => (
              <div className="img-container">
                <img className="images" src={movie.image}/>
                <h3>{movie.title}<br /> ({movie.director} {movie.year})</h3>
                <br />

                {isLoggedIn && <a className="editar-eliminar" href={`/movies/${movie.id}`}>editar</a>}
                {isLoggedIn && <a className="editar-eliminar" href="#" onClick={() => handleDelete(movie.id)}>eliminar</a>}
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