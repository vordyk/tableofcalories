import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation } from "./validation.js";
import * as userController from "./controllers/UserController.js";
import cors from "cors";

mongoose
    .connect('mongodb+srv://vordy262:roma2128@cluster0.8zcdijr.mongodb.net/tableofcalories?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => { console.log("MongoDB Connected"); })
    .catch((err) => console.log(err));

const app = express();

app.use(cors({
    origin: "*", // Можно указать конкретный домен, например: "http://example.com"
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const port= 4000; // порт 3000 занят реактом

app.use(express.json());

app.post('/reg', registerValidation, userController.register);
app.post('/login', loginValidation, userController.login);
app.get('/checkAuth', userController.checkAuth);

app.get('/settings', userController.getSettings);

app.listen(port, (e) => {
    console.log((!e) ? ('listening at localhost:'+port) : ("fuck up? " + e.message));
})