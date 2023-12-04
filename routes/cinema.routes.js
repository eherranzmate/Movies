const mongoose = require ('mongoose');
const express = require('express');
const router = express.Router();
const Cinema = require('../models/Cinema');
const Movie = require('../models/Movie');

router.post('/create', async (req, res, next) =>{
    try{
        const newCinema = new Cinema({
            name: req.body.name,
            location: req.body.location,
            movies: []
        });
        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema)

    } catch(err){
        next(err)     
    }
});

router.get('/', async (req, res, next) => {
    try{
        const cinemas = await Cinema.find().populate('movies');
        return res.status(201).json(cinemas)
    } catch(err) {
        next(err)

    }

})

// añadir películas al cine
router.put('/:id/add-movies', async (req, res, next) => {
    try{
        const cinemaId = req.params.id;
        const movieIds = req.body.movieIds;
        const updatedCinema = await Cinema.findByIdAndUpdate(cinemaId, {
            $push: {movies: {$each: movieIds}},
        });

        return res.status(200).json(updatedCinema);

    } catch(err) {
        next(err)
    }        
});

// meter en un cine, todas las películas de un determinado género
router.put('/:id/add-movies-by-genre', async (req, res, next) => {
    try{
        const cinemaId = req.params.id;
        const genre = req.body.genre;
        const moviesToAdd = await Movie.find({genre: genre});
        const updatedCinema = await Cinema.findByIdAndUpdate(cinemaId, {
            $push: {movies: {$each: moviesToAdd}} //$addToSet para meter las películas sin repetirlas.
        })

        return res.status(200).json(updatedCinema);

    } catch(err) {
        next(err)
    }        
});

router.put("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const characterModify = new Character(req.body);
        characterModify._id = id
        const characterUpdated = await Character.findByIdAndUpdate(id, characterModify);
        if(!characterUpdated) {
            let error = new Error('Personaje no encontrado');
            error.status = 404;
            throw error;
        } else {
            res.status(200).json(characterUpdated);
        }
        
    } catch(err) {
        next(err)
    }
});

module.exports = router

