import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    movies: [{ type: String }], // Movies stored as an array of strings
    isPublic: { type: Boolean, default: true }
});

const ListModel = mongoose.model('List', ListSchema);

export { ListModel };
