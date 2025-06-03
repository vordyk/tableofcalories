import React from 'react';
import classes from './LoadingPage.module.css';
import { useState, useEffect } from 'react';

const LoadingPage = () => {
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowWarning(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Загрузка...</h1>
            <span className={classes.loader}></span>
            {showWarning && (
                <p className={classes.p}>Загрузка необычно долгая, проверьте своё интернет-соединение, <a href="/">вернуться на главную.</a> </p>
            )}
        </div>
    );
};

export default LoadingPage;