from flask import Flask, jsonify, request
from http import HTTPStatus
import sys
import json
import sqlite3

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
        "name": "Jurassic Park",
        "director": "Steven Spielger",
        "genero": "Accion",
        "image": "imagen1.png",
    },
    {
        "id": 2,
        "name": "V for Vendetta",
        "director": "James McTeigue",
        "genero": "Thriller",
        "image": "",
    },
    {
        "id": 3,
        "name": "The Avengers",
        "director": "Joe Russo",
        "genero": "Accion",
        "image": "",
    }
]


def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn


def auth(mail, password):
    if mail == usuarios_conocidos['mail'] and \
            password == usuarios_conocidos['password']:
        return 

@app.route("/api/movies", methods=['GET'])
def get_movies():
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM movies")
        data = cursor.fetchall()

    conn.close()
    return jsonify(data)

@app.route("/api/movies_with_image", methods=['GET'])
def get_movies_with_image():
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM movies WHERE image <> ''")
        data = cursor.fetchall()

    conn.close()
    return jsonify(data)

@app.route("/api/movies_by_director/<director>", methods=['GET'])
def get_movies_by_director(director):
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM movies WHERE director = ?", (director,))
        data = cursor.fetchall()

    conn.close()
    return jsonify(data)


@app.route("/api/movies/<id>", methods=['GET'])
def get_movies_by_id(id):
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM movies WHERE id = ?", (id,))
        data = cursor.fetchall()

    conn.close()
    return jsonify(data)

@app.route("/api/directors", methods=['GET'])
def get_director():
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT DISTINCT director FROM movies GROUP BY director")
        data = cursor.fetchall()
        flat_data = [item for sublist in data for item in sublist]

    conn.close()
    return jsonify(flat_data)


@app.route("/api/genres", methods=['GET'])
def get_generos():
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT DISTINCT genre FROM movies GROUP BY genre")
        data = cursor.fetchall()
        flat_data = [item for sublist in data for item in sublist]

    conn.close()
    return jsonify(flat_data)

@app.route("/api/movie", methods=['POST'])
def post_movie():
    data = request.get_json()

    movie = {
        "id": data["id"],
        "name": data["name"],
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