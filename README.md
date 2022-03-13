# Trabajo final Programación II y Laboratorio de computación II

Participantes: Julio Truzzi y Agustín 

## Capturas de pantalla 
#### Versión de escritorio:

![image](https://user-images.githubusercontent.com/6401468/158040667-91e646c9-7120-4772-b640-b8b5ca926658.png)
![image](https://user-images.githubusercontent.com/6401468/158040674-e9040d41-062b-4b44-923d-d5712137a00e.png)
![image](https://user-images.githubusercontent.com/6401468/158040683-7f8db0d6-c432-4d13-a8d5-2588456f1e04.png)
![image](https://user-images.githubusercontent.com/6401468/158040696-174d2cdf-fc4c-48c9-81fe-04dfc483f0d6.png)
![image](https://user-images.githubusercontent.com/6401468/158040699-17cbf178-15da-4fdd-ad95-568a238d20df.png)
![image](https://user-images.githubusercontent.com/6401468/158040707-ee54fdec-b44d-4544-bc58-19c47726eb25.png)

#### Version responsive:
![image](https://user-images.githubusercontent.com/6401468/158040792-6d9b84f6-4180-4929-9578-e4ec291c2374.png)
![image](https://user-images.githubusercontent.com/6401468/158040822-5d8baf53-1181-4b5b-b7b4-8531ccd7dd4a.png)
![image](https://user-images.githubusercontent.com/6401468/158040802-f5117919-2f00-4355-9d3b-6d84579ba80c.png)
![image](https://user-images.githubusercontent.com/6401468/158040809-c6688f59-fdb4-4a7f-a7fd-dcbf712fc3ad.png)
![image](https://user-images.githubusercontent.com/6401468/158040817-3906fa52-1216-40ee-9b13-f9b803de3206.png)

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
    cd backend
    export FLASK_APP=main.py
    export FLASK_ENV=development
    flask run
```

Iniciar servidor en Windows

```
    cd backend
    SET FLASK_APP=main.py
    SET FLASK_ENV=development
    flask run
```

o simplemente llamar al archivo siguiente archivo
```
    cd backend
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
cd frontend
npm install
npm run dev
```
