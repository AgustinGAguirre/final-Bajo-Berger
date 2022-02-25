import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import { checkIfIsLoggedIn, getToken } from "../../../utils";
const Movie = () => {
    const router = useRouter();
    const { id } = router.query;
    const [movie, setMovie] = useState([]);
    const [error, setError] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    let isLoggedIn = checkIfIsLoggedIn();

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
            <div id="container-details">
                <aside id="peliculas">
                    <h2>Pelicula: {movie.title}</h2>
                    <p id="details">
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
                </aside>
            </div>
        </>
    )
}

export default Movie;