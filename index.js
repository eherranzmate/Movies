require('./utils/db');
const express = require('express');
const router = express.Router();
const session = require('express-session'); 
const MongoStore = require('connect-mongo');
const Movie = require('./models/Movie.js');
const PORT = 3000;
const {isAuthenticated} = require('./middleware/auth.middleware')
const server = express()
const cors = require("cors");
const moviesRouter = require('./routes/movies.routes.js');
const cinemasRouter = require('./routes/cinema.routes.js');
const userRouter = require('./routes/user.routes');

const passport = require('passport');
require('./authentication/passport'); 

server.use(
  session({
    secret: 'upgradehub_node', // ¡Este secreto tendremos que cambiarlo en producción!
    resave: false, // Solo guardará la sesión si hay cambios en ella.
    saveUninitialized: false, // Lo usaremos como false debido a que gestionamos nuestra sesión con Passport
    cookie: {
      maxAge: 3600000 // Milisegundos de duración de nuestra cookie, en este caso será una hora.
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL
    })
  })
);

server.use(passport.initialize());
server.use(passport.session());
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use('/movies',isAuthenticated, moviesRouter);
server.use('/cinemas',isAuthenticated, cinemasRouter);
server.use('/users', userRouter);

server.use((err, req, res, next) => {
	return res.status(err.status ||500).json(err.message ||'Unexpected error');
});

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});


