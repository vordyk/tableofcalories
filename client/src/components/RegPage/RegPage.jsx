import React from 'react';
import classes from "./RegPage.module.css";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

const RegPage = () => {
    if (localStorage.getItem("token")) {
        window.location.href = "/";
    }

    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function reg() {
        const data = {
            username: username,
            email: email,
            password: password,
        }


        console.log(data)

        const res = fetch("http://localhost:4000/reg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(
            (value) => {
                if (value instanceof Error) {
                    console.log(value);
                    alertify.error(value.message);
                } else {
                    console.log(value);
                    alertify.success("Регистрация прошла успешна. Нажмите для перехода на страницу входа.", 3000, () => {
                        setTimeout(window.location.href = "/login", 3000);
                    })
                }
            }
        )

        console.log(res)
    }

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Sign In</h1>
            <TextInput value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username"></TextInput>
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"></TextInput>
            <TextInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"></TextInput>
            <a className={classes.span}  href="http://localhost:3000/login">Already have an account?</a>
            <Button onClick={reg}>Reg</Button>
        </div>
    );
};

export default RegPage;