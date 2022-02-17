import sqlite3

connection = sqlite3.connect('database.db')


with open('db/schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()
# título, año, year, género, sinopsis
# y el link a una imagen representativa.

cur.execute("INSERT INTO movies (title, year, genre, synopsis, director, image) VALUES (?, ?, ?, ?, ?, ?)",
            ('Jurassic Park',
             '1993',
             'Accion',
             'El multimillonario John Hammond hace realidad su sueño de clonar dinosaurios del Jurásico y crear con ellos un parque temático en una isla. Antes de abrir el parque al público general, Hammond invita a una pareja de científicos y a un matemático para que comprueben la viabilidad del proyecto. Sin embargo, el sistema de seguridad falla y los dinosaurios se escapan.', 
             'Steven Spielberg',
             'public/images/movies/jurassic.jpg')
            )

cur.execute("INSERT INTO movies (title, year, genre, synopsis, director, image) VALUES (?, ?, ?, ?, ?, ?)",
            ('V for Vendetta',
             '2005',
             'Thriller',
             'Después de una guerra mundial, Londres es un estado policiaco ocupado por un gobierno fascista. Un vigilante conocido sólo como V (Hugo Weaving) utiliza tácticas terroristas para luchar contra el estado totalitario en el que ahora vive. Cuando V salva de la policía secreta a una niña llamada Evey (Natalie Portman), él descubre una aliada en su batalla en contra de los opresores de Inglaterra.',
             'James McTeigue',
             'public/images/movies/vendetta.jpg')
            )

cur.execute("INSERT INTO movies (title, year, genre, synopsis, director, image) VALUES (?, ?, ?, ?, ?, ?)",
            ('The Avengers',
             '2012',
             'Accion',
             'El director de la Agencia SHIELD decide reclutar a un equipo para salvar al mundo de un desastre casi seguro cuando un enemigo inesperado surge como una gran amenaza para la seguridad mundial.',
             'Joe Russo',
             'public/images/movies/avengers.jpg')
            )

cur.execute("INSERT INTO movies (title, year, genre, synopsis, director, image) VALUES (?, ?, ?, ?, ?, ?)",
            ('Avatar',
             '2009',
             'Ciencia ficcion',
             'En un exuberante planeta llamado Pandora viven los Navi, seres que aparentan ser primitivos pero que en realidad son muy evolucionados. Debido a que el ambiente de Pandora es venenoso, los híbridos humanos/Navi, llamados Avatares, están relacionados con las mentes humanas, lo que les permite moverse libremente por Pandora. Jake Sully, un exinfante de marina paralítico se transforma a través de un Avatar, y se enamora de una mujer Navi.',
             'James Cameron',
             'public/images/movies/avatar.jpg')
            )

cur.execute("INSERT INTO movies (title, year, genre, synopsis, director, image) VALUES (?, ?, ?, ?, ?, ?)",
            ('Titanic',
             '1997',
             'Drama',
             'Jack es un joven artista que gana un pasaje para viajar a América en el Titanic, el transatlántico más grande y seguro jamás construido. A bordo del buque conoce a Rose, una chica de clase alta que viaja con su madre y su prometido Cal, un millonario engreído a quien solo interesa el prestigio de la familia de su prometida. Jack y Rose se enamoran a pesar de las trabas que ponen la madre de ella y Cal en su relación. Mientras, el lujoso transatlántico se acerca a un inmenso iceberg.',
             'James Cameron',
             'public/images/movies/titanic.jpg')
            )

cur.execute("INSERT INTO movies (title, year, genre, synopsis, director, image) VALUES (?, ?, ?, ?, ?, ?)",
            ('Tron',
             '1982',
             'Ciencia ficcion',
             'Jeff Bridges da vida a un programador de videojuegos de éxito que se introduce en los circuitos de su ordenador donde los programas tienen vida propia.',
             'Steven Lisberger',
             'public/images/movies/tron.jpg')
            )

cur.execute("INSERT INTO movies (title, year, genre, synopsis, director, image) VALUES (?, ?, ?, ?, ?, ?)",
            ('El Rey Leon',
             '1994',
             'Infantil',
             'Tras la muerte de su padre, Simba deberá enfrentarse a su tío para recuperar el trono de Rey de la Selva. Timón y Pumba le acompañarán en su misión.',
             'Rob Minkoff',
             'public/images/movies/reyleon.jpg')
            )

cur.execute("INSERT INTO movies (title, year, genre, synopsis, director, image) VALUES (?, ?, ?, ?, ?, ?)",
            ('Shrek',
             '2001',
             'Comedia',
             'Hace mucho tiempo, en una lejana ciénaga, vivía un ogro llamado Shrek. Un día, su preciada soledad se ve interrumpida por un montón de personajes de cuento de hadas que invaden su casa. Todos fueron desterrados de su reino por el malvado Lord Farquaad. Decidido a devolverles su reino y recuperar la soledad de su ciénaga, Shrek llega a un acuerdo con Lord Farquaad y va a rescatar a la princesa Fiona, la futura esposa del rey. Sin embargo, la princesa esconde un oscuro secreto.',
             'Vicky Jenson',
             'public/images/movies/shrek.jpg')
            )

cur.execute("INSERT INTO movies (title, year, genre, synopsis, director, image) VALUES (?, ?, ?, ?, ?, ?)",
            ('Harry Potter y la piedra filosofal',
             '2001',
             'Fantasia',
             'El día de su cumpleaños, Harry Potter descubre que es hijo de dos conocidos hechiceros, de los que ha heredado poderes mágicos. Debe asistir a una famosa escuela de magia y hechicería, donde entabla una amistad con dos jóvenes que se convertirán en sus compañeros de aventura. Durante su primer año en Hogwarts, descubre que un malévolo y poderoso mago llamado Voldemort está en busca de una piedra filosofal que alarga la vida de quien la posee.',
             'Chris Columbus',
             'public/images/movies/hp.jpg')
            )

cur.execute("INSERT INTO movies (title, year, genre, synopsis, director, image) VALUES (?, ?, ?, ?, ?, ?)",
            ('Bolt',
             '2008',
             'Infantil',
             'Bolt es un perro superhéroe estrella de un exitoso programa de televisión que piensa que sus poderes son reales. Cuando cree que su dueña está en peligro, se embarca en un largo viaje a la otra punta de los Estados Unidos para salvarle la vida.',
             'Byron Howard',
             'public/images/movies/bolt.jpg')
            )

cur.execute("INSERT INTO movies (title, year, genre, synopsis, director, image) VALUES (?, ?, ?, ?, ?, ?)",
            ('Deadpool',
             '2016',
             'Accion',
             'Wade Wilson, tras ser sometido a un cruel experimento científico, adquiere poderes especiales que le convierten en Deadpool. Armado con sus nuevas habilidades y un retorcido sentido del humor tratará de dar caza al hombre que casi destruye su vida.',
             'Tim Miller',
             'public/images/movies/deadpool.jpg')
            )

cur.execute("INSERT INTO movies (title, year, genre, synopsis, director, image) VALUES (?, ?, ?, ?, ?, ?)",
            ('Spiderman',
             '2002',
             'Accion',
             'Peter Parker es un adolescente huérfano brillante científicamente, pero inepto socialmente que vive con sus tíos, Ben y May. Está enamorado de su vecina, Mary Jane Watson y es amigo de Harry Osborn. ... Un día la clase de Peter hace una excursión a un laboratorio de genética donde Peter es mordido por una super-araña',
             'Sam Raimi',
             'public/images/movies/spiderman.jpg')
            )

cur.execute("INSERT INTO movies (title, year, genre, synopsis, director, image) VALUES (?, ?, ?, ?, ?, ?)",
            ('Superman',
             '1978',
             'Accion',
             'Desde una galaxia remota, un recién nacido es enviado por sus padres al espacio debido a la inminente destrucción del planeta donde viven. La nave aterriza en la Tierra y el niño es adoptado por unos granjeros que le inculcan los mejores valores humanos. Con los años, el joven se irá a Metrópolis y allí usará sus poderes sobrenaturales para luchar contra el mal.',
             'Richard Donner',
             'public/images/movies/superman.jpg')
            )

cur.execute("INSERT INTO movies (title, year, genre, synopsis, director, image) VALUES (?, ?, ?, ?, ?, ?)",
            ('Batman',
             '1989',
             'Accion',
             'El caballero oscuro conocido como Batman defiende a la corrupta e insegura ciudad de Gotham de su enemigo principal, un payaso homicida conocido como Joker.',
             'Matt Reeves',
             'public/images/movies/batman.jpg')
            )


connection.commit()
connection.close()