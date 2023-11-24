require('./utils/db')
const express = require('express');
const router = express.Router();
const Movie = require('./models/Movie.js')
const PORT = 3000;
const server = express()

router.get("/movies", async (req, res)=> {
    try {
      const movies = await Movie.find();
      return res.status(200).json(movies);
    } catch {
      return res.status(500).json(err);
    }
});

router.get('/movies/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const moviesById = await Movie.findById(id);
		if (moviesById) {
			return res.status(200).json(moviesById);
		} else {
			return res.status(404).json('No se ha encontrado');
		}
	} catch (err) {
		return res.status(500).json(err);
	}
});

router.get("/movies/title/:title", async (req, res)=> {
    const title = req.params.title;
    try {
      const moviesByTitle = await Movie.find({title: title})
        if (!moviesByTitle.length) {
            return res.status(400).json('No existe')
        }
        return res.status(200).json(moviesByTitle);

    } 
    catch(err) {
      return res.status(500).json(err);
    }
});

router.get("/movies/genre/:genre", async (req, res)=> {
    const genre = req.params.genre;
    try {
      const moviesByGenre = await Movie.find({genre: genre})
        if (!moviesByGenre.length) {
            return res.status(400).json('No existe')
        }
        return res.status(200).json(moviesByGenre);

    } 
    catch(err) {
      return res.status(500).json(err);
    }
});

router.get('/movies/year/:year', async (req, res) => {
    const {year} = req.params; 
    try {
      const moviesByYear = await Movie.find({year: {$gt: year}});
      if (!moviesByYear.length) {
        return res.status(404).json('No existe')
      }
        
      return res.status(200).json(moviesByYear);
    } 
    catch(err) {
      return res.status(500).json(err);
    }
  })



server.use('/', router);

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
