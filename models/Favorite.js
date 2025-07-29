import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the model
export default mongoose.models.Favorite || mongoose.model('Favorite', FavoriteSchema);
