from flask import Flask, jsonify, request
from http import HTTPStatus
import sys

app = Flask(__name__)

usuarios_conocidos = [
    {
        'mail': 'jmbajo@gmail.com',
        'password': 'programacionbackend'
    },
    {
        'mail': 'carlosberger@gmail.com',
        'password': 'programacionfrontend'
    }
]


movies = [
    {
        "id": 1,
        "pelicula": "Jurassic Park",
        "director": "Steven Spielger",
        "genero": "Accion",
        "image": "imagen1.png",
    },
    {
        "id": 2,
        "pelicula": "V for Vendetta",
        "director": "James McTeigue",
        "genero": "Thriller",
        "image": "",
    },
    {
        "id": 3,
        "pelicula": "The Avengers",
        "director": "Joe Russo",
        "genero": "Accion",
        "image": "",
    }
]


def auth(mail, password):
    if mail == usuarios_conocidos['mail'] and \
            password == usuarios_conocidos['password']:
        return 

@app.route("/api/movies", methods=['GET'])
def get_movies():
    response = movies
    director = request.args.get('director')
    if (director is not None):
        response = filter(lambda movie: movie["director"] == director, response)

    filterWithImage = request.args.get('filterWithImage', default=False, type=lambda v: v.lower() == 'true')
    #filter movies by empty image key
    if (filterWithImage):
        response = filter(lambda movie: movie["image"] != "", response)

    return jsonify(list(response))


@app.route("/api/movies/<id>", methods=['GET'])
def get_movies_by_id(id):
    int_id = int(id)

    for movie in movies:
        if movie["id"] == int_id:
            return jsonify(movie)

    return jsonify({}), HTTPStatus.BAD_REQUEST

@app.route("/api/directors", methods=['GET'])
def get_director():
    directors = list()

    for movie in movies:
        directors.append(movie["director"])

    return jsonify(directors)


@app.route("/api/generos", methods=['GET'])
def get_generos():
    generos = list()

    for movie in movies:
        generos.append(movie["genero"])

    generos_unique = list(set(generos))
    return jsonify(generos_unique)

@app.route("/api/movie", methods=['POST'])
def post_movie():
    data = request.get_json()

    movie = {
        "id": data["id"],
        "pelicula": data["pelicula"],
        "director": data["director"]
    }

    movies.append(movie)

    return jsonify(movies)


@app.route("/api/movies/<id>", methods=["PUT"])
def put_info(id):
    int_id = int(id)
    data = request.get_json()

    for id_movie in movies:
        if id_movie['id'] == int_id:
            id_movie['id'] = data['id']

            return jsonify(id_movie)

    return 'error'


@app.route('/api/movies/<id>', methods=['DELETE'])
def delete_movie(id):
    int_id = int(id)

    for movie in movies:
        if movie['id'] == int_id:
            movies.remove(movie)
            return jsonify(movies)

    return 'error'

app.run(host='127.0.0.1', port=3000)