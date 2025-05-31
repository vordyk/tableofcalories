import mongoose from "mongoose";
import UserModel from "../models/User.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import ErrorModel from '../models/Error.js';
import SettingsModel from "../models/Settings.js";
import { Storage } from "megajs";

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

            await SettingsModel.create({
                userId: user._id
            });
        } catch (error) {
            await ErrorModel.create({
                message: error.message,
                stack: error.stack,
                controller: "UserController.register",
                meta: {
                    body: req.body,
                    headers: req.headers,
                    msg: "Ошибка сохранения пользователя в БД"
                }
            });
            return res.status(400).json({errors: err.array()});
        }

        return res.status(201).json({
            ok: true,
            ...user._doc
        })

    } catch (e) {
        await ErrorModel.create({
            message: e.message,
            stack: e.stack,
            controller: "UserController.register",
            meta: {
                body: req.body,
                headers: req.headers,
                msg: "Ошибка регистрации пользователя"
            }
        })
        res.status(500).json({
            ok: false,
            message: "Ошибка регистрации, возможно сервер перегружен. Попробуйте позже.",
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({
                ok: false,
                message: "Пользователь не найден."
            })
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                ok: false,
                message: "Неверный логин или пароль."
            })
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secret', {
            expiresIn: '30d'
        });

        const { password, ...userData } = user._doc;

        res.json({
            ok: true,
            ...userData,
            token
        })

    } catch (e) {
        await ErrorModel.create({
            message: e.message,
            stack: e.stack,
            controller: "UserController.login",
            meta: {
                body: req.body,
                headers: req.headers,
                msg: "Ошибка авторизации пользователя"
            }
        })
        res.status(500).json({
            ok: false,
            message: "Ошибка авторизации, возможно сервер перегружен. Попробуйте позже.",
        })
    }
}

export const checkAuth = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                ok: false,
                message: "Нет авторизации"
            });
        }

        const decoded = jwt.verify(token, 'secret');

        const user = await UserModel.findById(decoded._id);

        if (!user) {
            return res.status(404).json({
                ok: false,
                message: "Пользователь не найден"
            });
        }

        const { password, ...userData } = user._doc;

        res.json({
            ok: true,
            ...userData
        });

    } catch (e) {
        await ErrorModel.create({
            message: e.message,
            stack: e.stack,
            controller: "UserController.checkAuth",
            meta: {
                headers: req.headers,
                msg: "Ошибка проверки авторизации пользователя"
            }
        })
        res.status(500).json({
            ok: false,
            message: "Ошибка проверки авторизации, возможно сервер перегружен. Попробуйте позже.",
        })
    }
}

export const getSettings = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                ok: false,
                message: "Нет авторизации"
            });
        }

        const decoded = jwt.verify(token, 'secret');

        const settings = await SettingsModel.findOne({ userId: decoded._id });

        if (!settings) {
            return res.status(404).json({
                ok: false,
                message: "Настройки не найдены"
            });
        }

        res.json({
            ok: true,
            ...settings._doc
        });

    } catch (e) {
        await ErrorModel.create({
            message: e.message,
            stack: e.stack,
            controller: "UserController.getSettings",
            meta: {
                headers: req.headers,
                msg: "Ошибка получения настроек пользователя"
            }
        })
        res.status(500).json({
            ok: false,
            message: "Ошибка получения настроек, возможно сервер перегружен. Попробуйте позже.",
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                ok: false,
                message: "Нет авторизации"
            });
        }

        const decoded = jwt.verify(token, 'secret');

        const user = await UserModel.findByIdAndDelete(decoded._id);

        if (!user) {
            return res.status(404).json({
                ok: false,
                message: "Пользователь не найден"
            });
        }

        await SettingsModel.deleteOne({ userId: decoded._id });

        res.json({
            ok: true,
            message: "Пользователь успешно удален."
        });

    } catch (e) {
        await ErrorModel.create({
            message: e.message,
            stack: e.stack,
            controller: "UserController.deleteUser",
            meta: {
                headers: req.headers,
                msg: "Ошибка удаления пользователя"
            }
        })
        res.status(500).json({
            ok: false,
            message: "Ошибка удаления пользователя, возможно сервер перегружен. Попробуйте позже.",
        })
    }
}

export const uploadAvatar = async (req, res) => {
    const email = "vordy262@gmail.com";
    const password = "Roma28112011!";

    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ ok: false, message: "Нет авторизации" });
        }

        const decoded = jwt.verify(token, 'secret');
        const user = await UserModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ ok: false, message: "Пользователь не найден" });
        }

        const file = req.file;
        if (!file) {
            return res.status(400).json({ ok: false, message: "Файл не загружен" });
        }

        const storage = new Storage({ email, password });
        await storage.ready;

        const fileName = `${user._id}_${Date.now()}.jpg`;
        const uploadStream = storage.upload({ name: fileName, allowUploadBuffering: true });
        uploadStream.end(file.buffer);

        uploadStream.on('complete', async () => {
            user.avatar = fileName;
            await user.save();

            res.json({
                ok: true,
                message: 'Аватар успешно загружен!',
                avatarFileName: fileName
            });
        });

        uploadStream.on('error', (err) => {
            res.status(500).json({ ok: false, message: 'Ошибка загрузки: ' + err.message });
        });

    } catch (e) {
        await ErrorModel.create({
            message: e.message,
            stack: e.stack,
            controller: "UserController.uploadAvatar",
            meta: { headers: req.headers, msg: "Ошибка загрузки аватара пользователя" }
        });
        res.status(500).json({ ok: false, message: "Ошибка загрузки аватара, попробуйте позже." });
    }
}

export const getAvatar = async (req, res) => {
    const email = "vordy262@gmail.com";
    const password = "Roma28112011!";

    try {
        const user = await UserModel.findById(req.params.userId);
        if (!user || !user.avatar) {
            return res.status(404).send("Аватар не найден");
        }

        const storage = new Storage({ email, password });
        await storage.ready;

        const file = storage.root.children.find(f => f.name === user.avatar);
        if (!file) {
            return res.status(404).send("Файл не найден в MEGA");
        }

        const stream = file.download();
        res.setHeader('Content-Type', 'image/jpeg');
        stream.pipe(res);
    } catch (e) {
        res.status(500).send("Ошибка получения аватара");
    }
};

export const getUser = async (req, res) => {
    try {
        const token = req.params.token;
        if (!token) {
            return res.status(401).json({
                ok: false,
                message: "Нет авторизации"
            });
        }

        const decoded = jwt.verify(token, 'secret');

        const user = await UserModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({
                ok: false,
                message: "Пользователь не найден"
            });
        }

        const { password, ...userData } = user._doc;

        res.json({
            ok: true,
            ...userData
        });
    } catch (e) {
        await ErrorModel.create({
            message: e.message,
            stack: e.stack,
            controller: "UserController.getUser",
            meta: {
                params: req.params,
                msg: "Ошибка получения пользователя"
            }
        })
    }
}