import mongoose from 'mongoose';

const NutrientsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    calories: {
        type: Number,
        required: true,
        default: 0
    },
    protein: {
        type: Number,
        required: true,
        default: 0
    },
    carbs: {
        type: Number,
        required: true,
        default: 0
    },
    fats: {
        type: Number,
        required: true,
        default: 0
    },
    fiber: {
        type: Number,
        required: true,
        default: 0
    },
}, { timestamps: true });

export default mongoose.model('Nutrients', NutrientsSchema);