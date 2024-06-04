import express from 'express';
import { ListModel } from '../model/List.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    const { name, userId, isPublic } = req.body;
    try {
        const list = new ListModel({ name, userId, isPublic });
        await list.save();
        res.json(list);
    } catch (error) {
        console.error('Error creating list:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/add-movie', async (req, res) => {
    const { listId, movies } = req.body;
    try {
        const list = await ListModel.findById(listId);
        if (list) {
            list.movies.push(...movies); // Add movies to the list
            await list.save();
            res.json(list);
        } else {
            res.status(404).json({ message: 'List not found' });
        }
    } catch (error) {
        console.error('Error adding movie to list:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const lists = await ListModel.find({ userId });
        res.json(lists);
    } catch (error) {
        console.error('Error fetching lists:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export { router as listRouter };
