import classes from './TextInput.module.css';

import React from 'react';

const TextInput = ({ size, ...props }) => {
    return (
        <>
            <input {...props} className={(!size) ? classes.inputdef + ' ' + classes.input : classes.inputmini + ' ' + classes.input } />
        </>
    );
};

export default TextInput;