import React from 'react';
import classes from "./RegPage.module.css";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";

const RegPage = () => {
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

        const res = fetch("http://localhost:3001/reg", {
            method: "POST",
            body: JSON.stringify(data),
        })

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