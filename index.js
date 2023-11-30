require('./utils/db');
const express = require('express');
const router = express.Router();
const Movie = require('./models/Movie.js');
const PORT = 3000;
const server = express()

const moviesRouter = require('./routes/movies.routes.js');
const cinemasRouter = require('./routes/cinema.routes.js');



server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use('/movies', moviesRouter);
server.use('/cinemas', cinemasRouter);

server.use((err, req, res, next) => {
	return res.status(err.status ||500).json(err.message ||'Unexpected error');
});


server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
