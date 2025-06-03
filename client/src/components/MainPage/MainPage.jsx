import React, {useEffect} from 'react';
import classes from './MainPage.module.css';
import TabSection from "../TabSection/TabSection";
import alertify from 'alertifyjs';

console.log(localStorage.getItem('token'));

const MainPage = () => {
    const getFormattedDate = () => {
        const options = { weekday: "long", day: "2-digit", month: "2-digit" };
        return new Date().toLocaleDateString("ru-RU", options);
    };

    const [data, setData] = React.useState(null);

    useEffect(
         () => {


            const fetchData = async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    alertify.error('Пожалуйста, войдите в систему.');
                    return;
                }

                try {
                    const response = await fetch(`http://localhost:4000/nutrients/${token}`, {
                        headers: {'Content-Type': 'application/json'}
                    });

                    if (!response.ok) {
                        throw new Error('Ошибка при получении данных пользователя');
                    }

                    const result = await response.json();
                    setData(result);
                    console.log(result);
                } catch (error) {
                    console.error('Ошибка:', error);
                    alertify.error('Не удалось загрузить данные пользователя.');
                }
            }
             fetchData();
         }
            , []);

    const carb = 100;
    const prot = 100;
    const fat = 50;
    const fiber = 10;

    console.log(data.calories)

    const carbGoal = data.carbs;
    const protGoal = data.proteins;
    const fatGoal = data.fats;
    const fiberGoal = data.fiber;

    const addMeal = (id) => {
        switch (id) {
            case 'bf':
                console.log(id);
                break;
                case 'dn':
                    console.log(id);
                    break;
                    case 'lch':
                        console.log(id);
                        break;
        }
    }

    return (
        <>
        <div className={classes.container}>
            <header className={classes.header}>
                <h1>Календарь подсчета калорий</h1>
                <p>{getFormattedDate()}</p>
            </header>

            <main className={classes.main}>
                <section className={classes.tracker}>
                    <div className={classes.summary}>
                        <h2>Прием: <span>0 ккал</span></h2>
                        <h2>Расход: <span>300 ккал</span></h2>
                    </div>
                    <div className={classes.meals}>
                        <div className={classes.meal}><span className={classes.icon}>🍳<span className={classes.add} id="bf" onClick={(e) => addMeal(e.currentTarget.id)}>➕</span></span> Завтрак <span>0 ккал</span></div>
                        <div className={classes.meal}><span className={classes.icon}>🍛<span className={classes.add} id="lch" onClick={(e) => addMeal(e.currentTarget.id)}>➕</span></span> Обед <span>0 ккал</span></div>
                        <div className={classes.meal}><span className={classes.icon}>🥗<span className={classes.add} id="dn" onClick={(e) => addMeal(e.currentTarget.id)}>➕</span></span> Ужин <span>0 ккал</span></div>
                    </div>
                </section>

                <section className={classes.nutrients}>
                    <h3>Питательные вещества: </h3>
                    <br/>
                    <ul className={classes.list}>
                        <li className={classes.item}>Белки: <span>{prot}г /{protGoal}г</span></li>
                        <li className={classes.item}>Углеводы: <span>{carb}г /{carbGoal}г</span></li>
                        <li className={classes.item}>Жиры: <span>{fat}г /{fatGoal}г</span></li>
                        <li className={classes.item}>Клетчатка: <span>{fiber}г /{fiberGoal}г</span></li>
                    </ul>
                </section>
            </main>
        </div>
            <TabSection/>
        </>
    );
};

export default MainPage;