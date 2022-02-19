Requisitos:

```
    Python
```

Correr el proyecto:

Inicializar y configurar base de datos

```
    python init_db.py
```


Iniciar servidor en Mac

```
    export FLASK_APP=main.py
    export FLASK_ENV=development
    flask run
```
-----
## Lista de API endpoints:
-----

Listado de peliculas
```
[GET] /api/movies
```

Listado de peliculas con imagen
```
[GET] /api/movies_with_image
```

Listado de peliculas filtradas por director
```
[GET] /api/movies_by_director/<director>
```

Obtener pelicula por su id
```
[GET] /api/movies/<id>
```

Listado de directores
```
[GET] /api/directors
```

Listado de generos
```
[GET] /api/genres
```

Alta de una pelicula
```
[POST] /api/movies
```

Baja de una pelicula
```
[DELETE] /api/movies/<id>
```

Modificación de una pelicula
```
[PUT] /api/movies/<id>
```
