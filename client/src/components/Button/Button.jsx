import React from 'react';
import classes from './Button.module.css'

const Button = ({ children, ...props }) => {
    return (
        <>
            <button className={classes.btn} {...props}>{children}</button>
        </>
    );
};

export default Button;