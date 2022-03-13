# Trabajo final Programación II y Laboratorio de computación II

Participantes: Julio Truzzi y Agustín 

![image](https://user-images.githubusercontent.com/6401468/158040667-91e646c9-7120-4772-b640-b8b5ca926658.png)
![image](https://user-images.githubusercontent.com/6401468/158040674-e9040d41-062b-4b44-923d-d5712137a00e.png)
![image](https://user-images.githubusercontent.com/6401468/158040683-7f8db0d6-c432-4d13-a8d5-2588456f1e04.png)
![image](https://user-images.githubusercontent.com/6401468/158040696-174d2cdf-fc4c-48c9-81fe-04dfc483f0d6.png)
![image](https://user-images.githubusercontent.com/6401468/158040699-17cbf178-15da-4fdd-ad95-568a238d20df.png)
![image](https://user-images.githubusercontent.com/6401468/158040707-ee54fdec-b44d-4544-bc58-19c47726eb25.png)


## Backend

[Readme BACKEND](https://github.com/AgustinGAguirre/final-Bajo-Berger/tree/main/backend#readme)

Requisitos:

```
    Python v3
```

Correr el proyecto:

Inicializar y configurar base de datos

```
    cd db
    python3 init_db.py
```


Iniciar servidor en Linux/Mac

```
    export FLASK_APP=main.py
    export FLASK_ENV=development
    flask run
```

Iniciar servidor en Windows

```
    SET FLASK_APP=main.py
    SET FLASK_ENV=development
    flask run
```

o simplemente llamar al archivo siguiente archivo
```
    sh start.sh
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

## Frontend
[Readme FRONTEND](https://github.com/AgustinGAguirre/final-Bajo-Berger/tree/main/frontend#readme)

## Getting Started

```terminal
npm install
npm run dev
```
