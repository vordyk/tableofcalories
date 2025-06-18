import mongoose from 'mongoose';

const MealSchema = new mongoose.Schema({
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
    fiber: { type: Number, default: 0 }
}, { _id: false });

const DailyNutrientsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    meals: {
        breakfast: { type: MealSchema, default: () => ({}) },
        lunch: { type: MealSchema, default: () => ({}) },
        dinner: { type: MealSchema, default: () => ({}) }
    }
}, { timestamps: true });

export default mongoose.model('DailyNutrients', DailyNutrientsSchema);