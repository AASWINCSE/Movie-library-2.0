import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imdbID: { type: String, required: true, unique: true },
    poster: { type: String },
    year: { type: String }
});

export const MovieModel = mongoose.model("movies", MovieSchema);
