import React from 'react';
import classes from './ActiveSection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import ActiveSectionWidget from './ActiveSectionWidget';

// ...

const ActiveSection = () => {
    const activeMinute = 10;
    const activeMinuteGoal = 30;

    const caloriesBurned = 140;
    const caloriesBurnedGoal = 300;

    return (
        <section className={classes.section}>
            <ActiveSectionWidget value={caloriesBurned} goal={caloriesBurnedGoal} />
            <div className={classes.active}>
                <h1 className={classes.activeTitle}>Активность:</h1>
                <p className={classes.activeText}>Сожженные каллории:</p>
                <p className={classes.activeText}>{caloriesBurned} / {caloriesBurnedGoal} ккал</p>
                <p className={classes.activeText}>Активность за сегодня:</p>
                <p className={classes.activeText}>{activeMinute} / {activeMinuteGoal} минут</p>
            </div>
        </section>
    );
};

export default ActiveSection;