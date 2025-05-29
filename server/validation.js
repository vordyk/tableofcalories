import {body} from "express-validator";

export const registerValidation = [
    body("email").isEmail(),
    body("password").isLength({min:4, max:32}),
    body("username").isLength({min:4, max:32}),
]

export const loginValidation = [
    body("email").isEmail(),
]