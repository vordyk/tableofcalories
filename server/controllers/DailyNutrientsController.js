import jwt from 'jsonwebtoken';
import DailyNutrientsModel from "../models/DailyNutrients.js";

export const addNutrients = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ ok: false, error: 'Нет токена' });

    const token = authHeader.split(' ')[1];
    let userId;
    try {
        const decoded = jwt.verify(token, 'secret');
        userId = decoded._id;
    } catch (e) {
        return res.status(401).json({ ok: false, error: 'Неверный токен' });
    }

    const { calories, protein, carbs, fats, fiber, mealType } = req.body;
    if (!['breakfast', 'lunch', 'dinner'].includes(mealType)) {
        return res.status(400).json({ ok: false, error: 'Некорректный тип приёма пищи' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
        let record = await DailyNutrientsModel.findOne({ userId, date: today });
        if (record) {
            record.meals[mealType].calories += Number(calories);
            record.meals[mealType].protein += Number(protein);
            record.meals[mealType].carbs += Number(carbs);
            record.meals[mealType].fats += Number(fats);
            record.meals[mealType].fiber += Number(fiber);
            await record.save();
        } else {
            record = new DailyNutrientsModel({
                userId,
                date: today,
                meals: {
                    breakfast: {},
                    lunch: {},
                    dinner: {},
                    [mealType]: {
                        calories,
                        protein,
                        carbs,
                        fats,
                        fiber
                    }
                }
            });
            await record.save();
        }
        res.json({ ok: true, data: record });
    } catch (e) {
        res.status(500).json({ ok: false, error: e.message });
    }
};

export const getNutrients = async (req, res) => {
    const authHeader = req.headers.authorization;
    const dateParam = req.query.date;
    const date = dateParam ? new Date(Number(dateParam)) : new Date();
    date.setHours(0, 0, 0, 0);
    if (!authHeader) return res.status(401).json({ ok: false, error: 'Нет токена' });

    const token = authHeader.split(' ')[1];
    let userId;
    try {
        const decoded = jwt.verify(token, 'secret');
        userId = decoded._id;
    } catch (e) {
        return res.status(401).json({ ok: false, error: 'Неверный токен' });
    }

    const today = date;
    today.setHours(0, 0, 0, 0);

    try {
        let record = await DailyNutrientsModel.findOne({ userId, date: today });
        if (!record) {
            record = {
                meals: {
                    breakfast: { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 },
                    lunch: { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 },
                    dinner: { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 }
                }
            };
        }
        res.json({ ok: true, data: record });
    } catch (e) {
        res.status(500).json({ ok: false, error: e.message });
    }
};