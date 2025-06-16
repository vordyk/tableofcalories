import React from 'react';
import classes from './Card.module.css';

const Card = ({title, text, imgUrl}) => {
    return (
        <div className={classes.card}>
            <h3 className={classes.cardTitle}>{title}</h3>
            <img src={imgUrl} alt={title} className={classes.cardImage} />
            <p className={classes.cardText}>{text}</p>
        </div>
    );
};

export default Card;