DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS comments;

CREATE TABLE movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year TEXT NOT NULL,
    genre TEXT NOT NULL,
    synopsis TEXT NOT NULL,
    director TEXT NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE comments (
    movie_id INTEGER,
    user TEXT NOT NULL,
    description TEXT NOT NULL
);