import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './api/users.js';
import { movieRouter } from './api/movie.js';
import { listRouter } from './api/list.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected successfully to the database');
        app.listen(PORT, () => { // Corrected port variable to PORT
            console.log('Server is running on port ' + PORT); // Corrected port variable to PORT
        });
    })
    .catch((err) => {
        console.error('Failed to connect to the database:', err);
    });

app.use('/api/users', userRouter);
app.use('/api/movie', movieRouter);
app.use('/api/list', listRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Movie Library API');
});

// Removed redundant app.listen call

