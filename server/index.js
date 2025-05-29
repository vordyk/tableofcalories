import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation } from "./validation.js";
import * as userController from "./controllers/UserController.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Получаем __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose
    .connect('mongodb+srv://vordy262:roma2128@cluster0.8zcdijr.mongodb.net/tableofcalories?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => { console.log("MongoDB Connected"); })
    .catch((err) => console.log(err));

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// API-роуты
app.post('/reg', registerValidation, userController.register);
app.post('/login', loginValidation, userController.login);
app.get('/checkAuth', userController.checkAuth);
app.delete('/users', userController.deleteUser);
app.get('/settings', userController.getSettings);

// Раздача статики React-приложения
app.use(express.static(path.join(__dirname, '../client/build')));

// Для поддержки client-side routing (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, (e) => {
    console.log((!e) ? ('listening at localhost:' + port) : ("fuck up? " + e.message));
});