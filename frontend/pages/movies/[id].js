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
    const [comments, setComments] = useState([]);
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
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${id}`, values, {
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
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${id}`, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        }).then((response) => {
            setMovie(response.data);
        }).catch((e) => {
            console.error({ e });
            setError("Hubo un problema al obtener la pelicula, por favor intentelo nuevamente");
        });

        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${id}/comments`, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        }).then((response) => {
            setComments(response.data);
        }).catch((e) => {
            console.error({ e });
            setError("Hubo un problema al obtener la pelicula, por favor intentelo nuevamente");
        });
    }, [id])

    const handleDelete = async (id) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${id}`, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        }).then((response) => {
            router.push("/")
        }).catch((e) => {
            console.error({ e });
            setError("Hubo un problema al eliminar la pelicula");
        });
    }



    return (
        <>
            <div id="container-details">
                <aside id="peliculas">
                    <form onSubmit={formik.handleSubmit}>
                        <h2>Pelicula: {movie.title}</h2>
                        <p id="details">
                            <p>Titulo:</p>  <input type="text" name="title" value={formik.values.title} onChange={formik.handleChange} />
                            <br />
                            <p>Director:</p>  <input type="text" name="director" value={formik.values.director} onChange={formik.handleChange} />
                            <br />
                            <p>Genero:</p>  <input type="text" name="genre" value={formik.values.genre} onChange={formik.handleChange} />
                            <br />
                            <p>Imagen:</p>  <input type="text" name="image" value={formik.values.image} onChange={formik.handleChange} />
                            <br />
                            <p>Preview Imagen:</p> <br /> <img src={formik.values.image} style={{ maxWidth: '200px' }} />
                            <br />
                            <p>Sinopsis:</p>  <textarea name="synopsis" value={formik.values.synopsis} onChange={formik.handleChange} />
                            <br />
                            <button className="boton-accion" type="submit">Guardar</button>
                            {<a className="boton-accion" href="#" onClick={() => handleDelete(movie.id)}>eliminar</a>}
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