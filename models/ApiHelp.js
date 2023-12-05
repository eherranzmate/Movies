[
    {
        método: "GET",
        ruta: "/movies",
        descripción: "Búsqueda de todas las películas"
    },
    {
        método: "GET",
        ruta: "/movies/:id",
        descripción: "Búsqueda de las películas por id"
    },
    {
        método: "GET",
        ruta: "/movies/title/:title",
        descripción: "Búsqueda de las películas por título"
    },
    {
        método: "GET",
        ruta: "/movies/genre/:genre",
        descripción: "Búsqueda de las películas por género"
    },
    {
        método: "GET",
        ruta: "/movies/year/:year",
        descripción: "Búsqueda de las películas por año"
    },

    {
        método: "POST",
        ruta: "movies/create",
        descripción: "Inserción de películas en la base de datos"
    },

    {
        método: "PUT",
        ruta: "movies/:id",
        descripción: "Búsqueda de una película por id y la actualiza"
    },
    {
        método: "DELETE",
        ruta: "movies/:id",
        descripción: " Búsqueda de una película por id y la borra"
    },
];

[
    {
        método: "POST",
        ruta: "/cinemas/create",
        descripción: "Inserción de cines en la base de datos"
    },

    {
        método: "GET",
        ruta: "/cinemas/",
        descripción: "Búsqueda de todos los cines"
    },
    {
        método: "PUT",
        ruta: "/cinemas/:id/add-movies",
        descripción: "Búsqueda de un cine por id y añade películas"
    },
    {
        método: "PUT",
        ruta: "/cinemas/:id/add-movies-by-genre'",
        descripción: "Búsqueda de un cine por id y añade películas del mismo género"
    },

    {
        método: "PUT",
        ruta: "/cinemas/:id",
        descripción: " Búsqueda de un cine por id y lo actualiza"
    },
];

[
    {
        método: "GET",
        ruta: "/users",
        descripción: "Busqueda de todos los usuarios"
    },
    {
        método: "POST",
        ruta: "/users/register",
        descripción: "Registro de usuarios"
    },
    {
        método: "POST",
        ruta: "/users/login",
        descripción: "Inicio de sesión"
    },
    {
        método: "POST",
        ruta: "/users/logout",
        descripción: "Fin de sesión"
    },

];
