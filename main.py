from flask import Flask, jsonify, request, render_template, send_from_directory
from http import HTTPStatus
import sys
import traceback
import sys
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


def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn


def auth(mail, password):
    if mail == usuarios_conocidos['mail'] and \
            password == usuarios_conocidos['password']:
        return


def row_to_dict(cursor: sqlite3.Cursor, row: sqlite3.Row) -> dict:
    data = {}
    for idx, col in enumerate(cursor.description):
        data[col[0]] = row[idx]
    return data

@app.route('/public/<path:path>')
def send_js(path):
    return send_from_directory('public', path)

@app.route("/")
def home():
    movies = []
    with sqlite3.connect('database.db') as conn:
        conn.row_factory = row_to_dict
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM movies")
        movies = cursor.fetchall()

    conn.close()
    return render_template("home.html", movies=movies)

@app.route("/movies")
def movies():
    movies = []
    with sqlite3.connect('database.db') as conn:
        conn.row_factory = row_to_dict
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM movies LIMIT 10")
        movies = cursor.fetchall()

    conn.close()
    return render_template("movies.html", movies=movies)


@app.route("/api/movies", methods=['GET'])
def get_movies():
    movies = []
    with sqlite3.connect('database.db') as conn:
        conn.row_factory = row_to_dict
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM movies")
        movies = cursor.fetchall()

    conn.close()
    return jsonify(movies)


@app.route("/api/movies_with_image", methods=['GET'])
def get_movies_with_image():
    with sqlite3.connect('database.db') as conn:
        conn.row_factory = row_to_dict
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM movies WHERE image <> ''")
        movies = cursor.fetchall()

    conn.close()
    return jsonify(movies)


@app.route("/api/movies_by_director/<director>", methods=['GET'])
def get_movies_by_director(director):
    with sqlite3.connect('database.db') as conn:
        conn.row_factory = row_to_dict
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM movies WHERE director = ?", (director,))
        movies = cursor.fetchall()

    conn.close()
    return jsonify(movies[0])


@app.route("/api/movies/<id>", methods=['GET'])
def get_movies_by_id(id):
    with sqlite3.connect('database.db') as conn:
        conn.row_factory = row_to_dict
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM movies WHERE id = ?", (id,))
        movie = cursor.fetchall()

    conn.close()
    return jsonify(movie[0])


@app.route("/api/directors", methods=['GET'])
def get_director():
    with sqlite3.connect('database.db') as conn:
        conn.row_factory = row_to_dict
        cursor = conn.cursor()
        cursor.execute(
            "SELECT DISTINCT director FROM movies GROUP BY director")
        directors = cursor.fetchall()
        flat_data = [item for sublist in directors for item in sublist]

    conn.close()
    return jsonify(flat_data)


@app.route("/api/genres", methods=['GET'])
def get_generos():
    with sqlite3.connect('database.db') as conn:
        conn.row_factory = row_to_dict
        cursor = conn.cursor()
        cursor.execute("SELECT DISTINCT genre FROM movies GROUP BY genre")
        genres = cursor.fetchall()
        flat_data = [item for sublist in genres for item in sublist]

    conn.close()
    return jsonify(flat_data)


@app.route("/api/movies", methods=['POST'])
def post_movie():
    params = request.get_json()
    print("params: ", params)

    try:
        with sqlite3.connect('database.db') as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO movies (name, director, genre, image) VALUES (?, ?, ?, ?)",
                           (params['name'], params['director'],
                            params['genre'], params['image'])
                           )
            json_docs = []
            for doc in cursor:
                json_doc = jsonify(doc)
                json_docs.append(json_doc)
            conn.commit()
            return jsonify(json_docs), HTTPStatus.CREATED
    except Exception as e:
        exc_info = sys.exc_info()
        print(exc_info)
        return jsonify({"error": "No se pudo crear la pelicula"}), HTTPStatus.BAD_REQUEST


@app.route("/api/movies/<id>", methods=['PUT'])
def update_movie(id):
    params = request.get_json()

    try:
        with sqlite3.connect('database.db') as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE movies SET name = ?, director = ?, genre = ?, image = ? WHERE id = ?",
                           (params['name'], params['director'],
                            params['genre'], params['image'], id)
                           )
            conn.commit()
            return jsonify({"ok": True}), HTTPStatus.CREATED
    except Exception as e:
        exc_info = sys.exc_info()
        print(exc_info)
        return jsonify({"error": "No se pudo crear la pelicula"}), HTTPStatus.BAD_REQUEST


@app.route("/api/movies/<id>", methods=['DELETE'])
def delete_movie(id):
    try:
        with sqlite3.connect('database.db') as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE from movies where id = ?", (id,))
            conn.commit()
            return jsonify({"ok": True}), HTTPStatus.OK
    except Exception as e:
        exc_info = sys.exc_info()
        print(exc_info)
        return jsonify({"error": "No se pudo eliminar la pelicula"}), HTTPStatus.BAD_REQUEST


app.run(host='127.0.0.1', port=5000)
