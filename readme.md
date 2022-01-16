Requisitos:

```
    Python
```

Correr el proyecto:

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

Crear una pelicula
```
[POST] /api/movies
```

Editar una pelicula
```
[PUT] /api/movies/<id>
```

Eliminar una pelicula
```
[DELETE] /api/movies/<id>
```