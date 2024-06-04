import express from 'express';
import axios from 'axios';
import { MovieModel } from '../model/Movie.js';
import { verifyToken } from './users.js';

const router = express.Router();



router.post('/add', verifyToken, async (req, res) => {
    const { title, imdbID, poster, year } = req.body;
    let movie = await MovieModel.findOne({ imdbID });
    if (!movie) {
        movie = new MovieModel({ title, imdbID, poster, year });
        await movie.save();
    }
    res.json(movie);
});

export { router as movieRouter };
