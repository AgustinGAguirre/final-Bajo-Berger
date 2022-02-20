import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import { checkIfIsLoggedIn, getToken } from "../../utils";
import { useFormik } from 'formik';
const Movie = () => {
    const router = useRouter();
    const { id } = router.query;
    const [movie, setMovie] = useState([]);
    const [error, setError] = useState("");
    let isLoggedIn = checkIfIsLoggedIn();
    const initialValues = {
        title: movie.title,
        director: movie.director,
        genre: movie.genre,
        image: movie.image,
        synopsis: movie.synopsis,
    }

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async values => {
            await axios.put(`http://127.0.0.1:5000/api/movies/${id}`, values, {
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            }).then(movie => {
                router.push("/")
            }).catch((e) => {
                console.error({ e });
                setError("Hubo un problema al editar la pelicula");
            });
        },
    });

    if (typeof window !== 'undefined' && !isLoggedIn) {
        router.push("/login")
    }

    useEffect(async () => {
        if (!id) return;
        await axios.get(`http://127.0.0.1:5000/api/movies/${id}`, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        }).then((response) => {
            setMovie(response.data);
        }).catch((e) => {
            console.error({ e });
            setError("Hubo un problema al obtener la pelicula, por favor intentelo nuevamente");
        });
    }, [id])

    return (
        <>
            <div id="container">
                <aside id="peliculas">
                    <form onSubmit={formik.handleSubmit}>
                        <h2>Pelicula: {movie.title}</h2>
                        <p>
                            Titulo:  <input type="text" name="title" value={formik.values.title} onChange={formik.handleChange} />
                            <br />
                            Director:  <input type="text" name="director" value={formik.values.director} onChange={formik.handleChange} />
                            <br />
                            Genero:  <input type="text" name="genre" value={formik.values.genre} onChange={formik.handleChange} />
                            <br />
                            Imagen:  <input type="text" name="image" value={formik.values.image} onChange={formik.handleChange} />
                            <br />
                            Sinopsis:  <textarea name="synopsis" value={formik.values.synopsis} onChange={formik.handleChange} />
                            <br />
                            <button type="submit">Guardar</button>
                        </p>
                        <br />
                        <p>{error}</p>
                    </form>
                </aside>
            </div>
        </>
    )
}

export default Movie;