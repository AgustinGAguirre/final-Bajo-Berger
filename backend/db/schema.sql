DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year TEXT NOT NULL,
    genre TEXT NOT NULL,
    synopsis TEXT NOT NULL,
    director TEXT NOT NULL,
    image TEXT NOT NULL
);