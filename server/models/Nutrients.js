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
    caloriesGoal: {
        type: Number,
        required: true,
        default: 0
    },
    proteinGoal: {
        type: Number,
        required: true,
        default: 0
    },
    carbsGoal: {
        type: Number,
        required: true,
        default: 0
    },
    fatsGoal: {
        type: Number,
        required: true,
        default: 0
    },
    fiberGoal: {
        type: Number,
        required: true,
        default: 0
    },
}, { timestamps: true });

export default mongoose.model('Nutrients', NutrientsSchema);