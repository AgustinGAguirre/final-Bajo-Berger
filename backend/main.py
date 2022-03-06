from flask import Flask, jsonify, redirect, request, send_from_directory
from flask_cors import CORS, cross_origin
from http import HTTPStatus
import sys
import sys
import sqlite3
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)

app.config["JWT_SECRET_KEY"] = "super-secret"
app.config['CORS_HEADERS'] = 'Content-Type'

USERS = dict()
USERS["julio"] = "1234"
USERS["agus"] = "abcd"


def get_db_connection():
    conn = sqlite3.connect('db/database.db')
    conn.row_factory = sqlite3.Row
    return conn


def row_to_dict(cursor: sqlite3.Cursor, row: sqlite3.Row) -> dict:
    data = {}
    for idx, col in enumerate(cursor.description):
        data[col[0]] = row[idx]
    return data


@app.route('/public/<path:path>')
def send_js(path):
    return send_from_directory('public', path)


@app.route("/api/login", methods=['POST'])
def login():
    params = request.get_json()
    username = params['username']
    password = params['password']

    if (not username in USERS):
        return jsonify(), HTTPStatus.BAD_REQUEST

    if USERS[username] == password:
        token = create_access_token(identity=username)
        return jsonify({"token": token})

    return jsonify(), HTTPStatus.BAD_REQUEST


@app.route("/api/movies", methods=['GET'])
def get_movies():
    movies = []
    director = request.args.get('director')
    query = "SELECT * FROM movies"
    if director:
        query = f"{query} where director = '{director}'"
    query = f"{query} limit 10"
    with sqlite3.connect('db/database.db') as conn:
        conn.row_factory = row_to_dict
        cursor = conn.cursor()
        cursor.execute(query)
        movies = cursor.fetchall()

    conn.close()
    return jsonify(movies)


@app.route("/api/movies_with_image", methods=['GET'])
def get_movies_with_image():
    with sqlite3.connect('db/database.db') as conn:
        conn.row_factory = row_to_dict
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM movies WHERE image <> ''")
        movies = cursor.fetchall()

    conn.close()
    return jsonify(movies)


@app.route("/api/movies/<id>", methods=['GET'])
def get_movies_by_id(id):
    with sqlite3.connect('db/database.db') as conn:
        conn.row_factory = row_to_dict
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM movies WHERE id = ?", (id,))
        movie = cursor.fetchall()

    conn.close()
    return jsonify(movie[0])


@app.route("/api/directors", methods=['GET'])
def get_director():
    with sqlite3.connect('db/database.db') as conn:
        conn.row_factory = row_to_dict
        cursor = conn.cursor()
        cursor.execute(
            "SELECT DISTINCT director FROM movies GROUP BY director")
        directors_cursor = cursor.fetchall()
        directors = []
        for director in directors_cursor:
            directors.append(director["director"])

    conn.close()
    return jsonify(directors)


@app.route("/api/genres", methods=['GET'])
def get_generos():
    with sqlite3.connect('db/database.db') as conn:
        conn.row_factory = row_to_dict
        cursor = conn.cursor()
        cursor.execute("SELECT DISTINCT genre FROM movies GROUP BY genre")
        genres = cursor.fetchall()
        flat_data = [item for sublist in genres for item in sublist]

    conn.close()
    return jsonify(flat_data)


@app.route("/api/movies", methods=['POST'])
@jwt_required()
def post_movie():
    params = request.get_json()
    print("params: ", params)

    try:
        with sqlite3.connect('db/database.db') as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO movies (title, director, genre, image, synopsis) VALUES (?, ?, ?, ?, ?)",
                           (params['title'], params['director'],
                            params['genre'], params['image'], params['synopsis'])
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
@jwt_required()
def update_movie(id):
    params = request.get_json()

    try:
        with sqlite3.connect('db/database.db') as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE movies SET title = ?, director = ?, genre = ?, image = ?, synopsis = ? WHERE id = ?",
                           (params['title'], params['director'],
                            params['genre'], params['image'], params['synopsis'], id)
                           )
            conn.commit()
            return jsonify({"ok": True}), HTTPStatus.CREATED
    except Exception as e:
        exc_info = sys.exc_info()
        print(e)
        print(exc_info)
        return jsonify({"error": "No se pudo crear la pelicula"}), HTTPStatus.BAD_REQUEST


@app.route("/api/movies/<id>/comments", methods=['GET'])
@jwt_required()
def get_comments(id):
    user = get_jwt_identity()
    print("user", user)
    with sqlite3.connect('db/database.db') as conn:
        conn.row_factory = row_to_dict
        cursor = conn.cursor()
        cursor.execute(
            "SELECT user, description FROM comments where user=? and movie_id=?", (user, id))
        comments = cursor.fetchall()

    conn.close()
    return jsonify(comments)


@app.route("/api/movies/<id>/comments", methods=['POST'])
@jwt_required()
def add_comment(id):
    params = request.get_json()

    try:
        with sqlite3.connect('db/database.db') as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO comments (description, movie_id, user) VALUES (?, ?, ?)",
                           (params['comment'], id, get_jwt_identity())
                           )
            conn.commit()
            return jsonify(), HTTPStatus.CREATED
    except Exception as e:
        exc_info = sys.exc_info()
        print(exc_info)
        return jsonify({"error": "No se pudo crear el comentario"}), HTTPStatus.BAD_REQUEST


@app.route("/api/movies/<id>", methods=['DELETE'])
@jwt_required()
def delete_movie(id):
    try:
        with sqlite3.connect('db/database.db') as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE from movies where id = ?", (id,))
            conn.commit()
            return jsonify({"ok": True}), HTTPStatus.OK
    except Exception as e:
        exc_info = sys.exc_info()
        print(exc_info)
        return jsonify({"error": "No se pudo eliminar la pelicula"}), HTTPStatus.BAD_REQUEST


app.run(host='127.0.0.1', port=5000)
