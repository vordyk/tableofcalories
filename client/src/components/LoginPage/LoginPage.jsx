// import Button from './Button';
import TextInput from '../TextInput/TextInput';
import classes from './LoginPage.module.css';
import React, {useState} from 'react';
import Button from '../Button/Button';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Login</h1>
            <TextInput  placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextInput  placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <a href='http://localhost:3000/reg' className={classes.span}>Don't have account?</a>
            <Button>Login</Button>
        </div>
    );
};

export default LoginPage;