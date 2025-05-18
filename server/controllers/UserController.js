import mongoose from "mongoose";
import UserModel from "../models/User.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const err = validationResult(req);

        if (!err.isEmpty()) {
            console.log(err);
            return res.status(400).json({errors: err.array() });
        }

        const password  = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });

        let user = 0;

        try {
            user = await doc.save();
        } catch (error) {
            console.log(error);
            return res.status(400).json({errors: err.array()});
        }

        return res.status(201).json({
            ok: true,
            ...user._doc
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            message: "Ошибка регистрации, возможно сервер перегружен. Попробуйте позже.",
        })
    }
}