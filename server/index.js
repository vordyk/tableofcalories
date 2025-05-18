import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerValidation } from "./validation.js";
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

const port= 3001; // порт 3000 занят реактом

app.use(express.json());

app.post('/reg', registerValidation, userController.register);

app.listen(port, (e) => {
    console.log((!e) ? ('listening at localhost:'+port) : ("fuck up? " + e.message));
})