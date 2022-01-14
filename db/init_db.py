import sqlite3

connection = sqlite3.connect('database.db')


with open('db/schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO movies (name, director, genre, image) VALUES (?, ?, ?, ?)",
            ('Jurassic Park', 'Steven Spielger', 'Accion', 'imagen1.png')
            )

cur.execute("INSERT INTO movies (name, director, genre, image) VALUES (?, ?, ?, ?)",
            ('V for Vendetta', 'James McTeigue', 'Thriller', '')
            )

cur.execute("INSERT INTO movies (name, director, genre, image) VALUES (?, ?, ?, ?)",
            ('The Avengers', 'Joe Russo', 'Accion', 'imagen3.png')
            )

connection.commit()
connection.close()