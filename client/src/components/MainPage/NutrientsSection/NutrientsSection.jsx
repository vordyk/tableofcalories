import React from 'react';
import CircleWidget from "../CircleWidget";
import classes from './NutrientsSection.module.css';

const NutrientsSection = ({ nutrients }) => {
    return (
        <>
            <section className={classes.nutrients}>
                <ul className={classes.list}>
                    <li className={classes.item}><span>Белки:</span><CircleWidget value={nutrients.protein} color="orange" icon="faEgg" goal={nutrients.proteinGoal} /><span>{nutrients.protein} / {nutrients.proteinGoal}</span></li>
                    <li className={classes.item}><span>Жиры:</span><CircleWidget value={nutrients.fats} color="blue" icon="faBrain" goal={nutrients.fatsGoal} />{nutrients.fats} / {nutrients.fatsGoal}</li>
                    <li className={classes.item}><span>Углеводы:</span><CircleWidget value={nutrients.carbs} color="blue" icon="faBowlFood" goal={nutrients.carbsGoal} />{nutrients.carbs} / {nutrients.carbsGoal}</li>
                    <li className={classes.item}><span>Клетчатка:</span><CircleWidget value={nutrients.fiber} color="blue" icon="faSeedling" goal={nutrients.fiberGoal} />{nutrients.fiber} / {nutrients.fiberGoal}</li>
                </ul>
            </section>
        </>
    );
};

export default NutrientsSection;