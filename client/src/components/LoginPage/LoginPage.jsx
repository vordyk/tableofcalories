// import Button from './Button';
import TextInput from '../TextInput/TextInput';
import classes from './LoginPage.module.css';
import React, {useState} from 'react';
import Button from '../Button/Button';
import alertify from "alertifyjs";

const LoginPage = () => {
    if (localStorage.getItem("token")) {
        window.location.href = "/";
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login () {
        const res = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await res.json();

        if (!data.ok) {
            alertify.error(data.message);
            return;
        }

        alertify.success("Авторизация прошла успешно.");
        localStorage.setItem('token', data.token);
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);

    }

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Login</h1>
            <TextInput  placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextInput  placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <a href='http://localhost:3000/reg' className={classes.span}>Don't have account?</a>
            <Button onClick={login}>Login</Button>
        </div>
    );
};

export default LoginPage;