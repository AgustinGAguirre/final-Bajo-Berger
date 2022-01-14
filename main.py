from flask import Flask, jsonify, request
from http import HTTPStatus


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
        "director": "Steven Spielger"
    },
    {
        "id": 2,
        "pelicula": "V for Vendetta",
        "director": "James McTeigue"
    },
    {
        "id": 3,
        "pelicula": "The Avengers",
        "director": "Joe Russo"
    }
]


def auth(mail, password):
    if mail == usuarios_conocidos['mail'] and \
            password == usuarios_conocidos['password']:
        return 


@app.route("/", methods=['GET'])
def get_movies():
    return jsonify(movies[-9: 0])


@app.route("/movies/<id>", methods=['GET'])
def get_movies_by_id(id):
    int_id = int(id)

    for movie in movies:
        if movie["id"] == int_id:
            return jsonify(movie)

    return jsonify({}), HTTPStatus.BAD_REQUEST


@app.route("/movies/director", methods=['GET'])
def get_director(movies):
    directors = list()

    for movie in movies.items:
        directors.append(movie["director"])

    return jsonify(directors)


@app.route("/", methods=['POST'])
def post_movie():
    data = request.get_json()

    movie = {
        "id": data["id"],
        "pelicula": data["pelicula"],
        "director": data["director"]
    }

    movies.append(movie)

    return jsonify(movies)


@app.route("/movies/<id>", methods=["PUT"])
def put_info(id):
    int_id = int(id)
    data = request.get_json()

    for id_movie in movies:
        if id_movie['id'] == int_id:
            id_movie['id'] = data['id']

            return jsonify(id_movie)

    return 'error'


@app.route('/movies/<id>', methods=['DELETE'])
def delete_movie(id):
    int_id = int(id)

    for movie in movies:
        if movie['id'] == int_id:
            movies.remove(movie)
            return jsonify(movies)

    return 'error'

app.run(host='127.0.0.1', port=3000)