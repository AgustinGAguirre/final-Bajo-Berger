import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import { checkIfIsLoggedIn, getToken, getLoggedInUserId } from "../../utils";
import { useFormik } from 'formik';
import { DIRECTORS, GENRES, YEARS } from "./constants";
const Movie = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    let isLoggedIn = checkIfIsLoggedIn();
    const initialValues = {
        title: '',
        director: '',
        genre: '',
        image: '',
        synopsis: '',
        year: '',
    }

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async values => {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`, values, {
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            }).then(movie => {
                router.push("/")
            }).catch((e) => {
                console.error({ e });
                setError("Hubo un problema al crear la pelicula");
            });
        },
    });

    if (typeof window !== 'undefined' && !isLoggedIn) {
        router.push("/login")
    }

    const userId = getLoggedInUserId();

    return (
        <>
            <div id="container-details">
                <aside id="peliculas">
                    <form onSubmit={formik.handleSubmit}>
                        <h2>Nueva pelicula:</h2>
                        <p id="details">
                            <p>Titulo:</p>
                            <input placeholder="Ingresar titulo" type="text" name="title" value={formik.values.title} onChange={formik.handleChange} />
                            <br />
                            <p>Director:</p>
                            <select name="director" value={formik.values.director} onChange={formik.handleChange} >
                                <option value='' disabled selected>Elegir director</option>
                                {DIRECTORS.map((director) => (
                                    <option value={director}>{director}</option>
                                ))}
                            </select>
                            <br />
                            <p>Genero:</p>
                            <select name="genre" value={formik.values.genre} onChange={formik.handleChange}>
                                <option value='' disabled selected>Elegir género</option>
                                {GENRES.map((genre) => (
                                    <option value={genre}>{genre}</option>
                                ))}
                            </select>
                            <br />
                            <p>Año:</p>
                            <select name="year" value={formik.values.year} onChange={formik.handleChange}>
                                <option value='' disabled selected>Elegir año</option>
                                {YEARS.map((year) => (
                                    <option value={year}>{year}</option>
                                ))}
                            </select>
                            <br />
                            <p>Imagen:</p>
                            <input type="text" name="image" value={formik.values.image} onChange={formik.handleChange} placeholder="Elegir imagen" />
                            <br />
                            <p>Preview Imagen:</p> <br />
                            <img src={formik.values.image} style={{ maxWidth: '200px' }} />
                            <br />
                            <p>Sinopsis:</p>
                            <textarea name="synopsis" value={formik.values.synopsis} onChange={formik.handleChange} placeholder="Ingresar una sinopsis" />
                            <br />
                            <button className="boton-accion" type="submit">Guardar</button>
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