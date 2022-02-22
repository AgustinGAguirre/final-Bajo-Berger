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
    const [comment, setComment] = useState("");
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

    const handleAddComment = async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${id}/comments`, { comment }, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        }).then(movie => {
            router.reload(window.location.pathname)
        }).catch((e) => {
            console.error({ e });
            setError("Hubo un problema al crear el comentario");
        });
    }

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
                            Preview Imagen:<br /> <img src={formik.values.image} style={{ maxWidth: '200px' }} />
                            <br />
                            Sinopsis:  <textarea name="synopsis" value={formik.values.synopsis} onChange={formik.handleChange} />
                            <br />
                            <button type="submit">Guardar</button>
                            <br />
                            <br />


                            <div>
                                <textarea name="comment" onChange={(e) => setComment(e.target.value)}>{comment}</textarea>
                                <br />
                                <button type="button" onClick={handleAddComment}>Agregar comentario</button>
                            </div>

                            <h2>Comentarios</h2>
                            {comments?.map(comment => (
                                <p>{comment.description}</p>
                            ))}
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