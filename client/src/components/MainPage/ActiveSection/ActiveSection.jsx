import React from 'react';
import classes from './ActiveSection.module.css';
import CircleWidget from "../CircleWidget";

const ActiveSection = () => {
    const activeMinute = 10;
    const activeMinuteGoal = 30;

    const caloriesBurned = 40;
    const caloriesBurnedGoal = 300;


    return (
        <section className={classes.section}>
            <div className={classes.widgets}>
                <CircleWidget value={caloriesBurned} color="blue" icon="faFire" goal={caloriesBurnedGoal} />
            </div>
            <div className={classes.active}>
                <p className={classes.activeText}>Сожженные каллории:</p>
                <p className={classes.activeText}>{caloriesBurned} / {caloriesBurnedGoal} ккал</p>
                <p className={classes.activeText}>Активность за сегодня:</p>
                <p className={classes.activeText}>{activeMinute} / {activeMinuteGoal} минут</p>
            </div>
        </section>
    );
};

export default ActiveSection;