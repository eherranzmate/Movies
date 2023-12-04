const mongoose = require ('mongoose');
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const {upload} = require('../middleware/file.middleware')
const { uploadToCloudinary } = require('../middleware/file.middleware');

router.get("/", async (req, res)=> {
    try {
      const movies = await Movie.find();
      return res.status(200).json(movies);
    } catch {
      return res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
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

router.get("title/:title", async (req, res)=> {
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

router.get("/genre/:genre", async (req, res)=> {
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

router.get('/year/:year', async (req, res) => {
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
  });

  router.post('/create', [upload.single('picture'),uploadToCloudinary], async (req, res, next) =>{
    try{
        const moviePicture = req.file ? req.file_url : null; //req.file.path para sacar la ruta
        const newMovie = new Movie({
          title: req.body.title,
          director: req.body.director,
          year: req.body.year ,
          genre: req.body.genre,
          picture: moviePicture
        });
        const createdMovie = await newMovie.save();
        return res.status(201).json(createdMovie)
        
    } catch(err){
        next(err)     
    }
});

router.put("/:id", async (req, res, next) => {
  try {
      const id = req.params.id;
      const movieModify = new Movie(req.body);
      movieModify._id = id
      const movieUpdated = await Movie.findByIdAndUpdate(id, movieModify);
      if(!movieUpdated) {
          let error = new Error('Película no encontrada');
          error.status = 404;
          throw error;
      } else {
          res.status(200).json(movieUpdated);
      }
      
  } catch(err) {
      next(err)
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
      const id = req.params.id;
      const deletedMovie = await Movie.findByIdAndDelete(id);
      if(deletedMovie) res.status(200).json(deletedMovie);
      else {
          let error = new Error('Película no encontrada');
          error.status = 404;
          throw error;
      }
  } catch(err){
      next(err)
  }
});

module.exports = router;