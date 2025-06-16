import React, {useEffect} from 'react';
import classes from './MainPage.module.css';
import TabSection from "../TabSection/TabSection";
import alertify from 'alertifyjs';
import LoadingPage from "../LoadingPage/LoadingPage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faBreadSlice, faUtensils, faBowlFood} from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "./ProgressBar";
import ActiveSection from "../ActiveSection/ActiveSection";

console.log(localStorage.getItem('token'));

const MainPage = () => {
    const getFormattedDate = () => {
        const options = { weekday: "long", day: "2-digit", month: "2-digit" };
        return new Date().toLocaleDateString("ru-RU", options);
    };

    const [nutrients, setNutrients] = React.useState(null);


    useEffect(() => {
        const storageNutrients = sessionStorage.getItem('nutrients');
        if (storageNutrients) {
            setNutrients(JSON.parse(storageNutrients));
        } else {
            const fetchData = async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    alertify.error('Пожалуйста, войдите в систему.');
                    return;
                }
                try {
                    const response = await fetch(`http://localhost:4000/nutrients/${token}`, {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    const result = await response.json();
                    if (!result.ok) {
                        throw new Error('Ошибка при получении данных пользователя');
                    }
                    setNutrients(result);
                    sessionStorage.setItem('nutrients', JSON.stringify(result)); // кешируем
                } catch (error) {
                    console.error('Ошибка:', error);
                    alertify.error('Не удалось загрузить данные пользователя.');
                }
            };
            fetchData();
        }
    }, []);


    if (!nutrients) return <LoadingPage></LoadingPage>;

    const caloriesGoal = nutrients.caloriesGoal;
    const carbGoal = nutrients.carbsGoal;
    const proteinGoal = nutrients.proteinGoal;
    const fatGoal = nutrients.fatsGoal;
    const fiberGoal = nutrients.fiberGoal;

    const calories = nutrients.calories;
    const carbs = nutrients.carbs;
    const protein = nutrients.protein;
    const fats = nutrients.fats;
    const fiber = nutrients.fiber;

    if (carbGoal + proteinGoal + fatGoal + fiberGoal === 0) {
            alertify.warning("Хотите перейти к настройке целей по питательным веществам? <b>Перейдите в профиль и нажмите на кнопку 'Настроить цели'.</b>", 5);
    }

    const toSearch = () => {
        window.location.href = '/search';
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
                        <ProgressBar value={calories} goal={caloriesGoal} />
                        <h2>Прием: <span>0 ккал</span></h2>
                        <h2>Цель: <span>{caloriesGoal} ккал</span></h2>
                    </div>
                    <div className={classes.meals}>
                        <div className={classes.meal}><span className={classes.icon}><FontAwesomeIcon icon={faBreadSlice} /><span className={classes.add} onClick={toSearch}> <FontAwesomeIcon icon={faPlus} /></span></span> Завтрак <span>0 ккал</span></div>
                        <div className={classes.meal}><span className={classes.icon}><FontAwesomeIcon icon={faUtensils} /><span className={classes.add} onClick={toSearch}> <FontAwesomeIcon icon={faPlus} /></span></span> Обед <span>0 ккал</span></div>
                        <div className={classes.meal}><span className={classes.icon}><FontAwesomeIcon icon={faBowlFood} /><span className={classes.add} onClick={toSearch}> <FontAwesomeIcon icon={faPlus} /></span></span> Ужин <span>0 ккал</span></div>
                    </div>
                </section>

                <section className={classes.nutrients}>
                    <h3>Питательные вещества: </h3>
                    <br/>
                    <ul className={classes.list}>
                        <li className={classes.item}>Белки: <span>{protein} / {proteinGoal}г</span></li>
                        <li className={classes.item}>Углеводы: <span>{carbs} / {carbGoal}г</span></li>
                        <li className={classes.item}>Жиры: <span>{fats} / {fatGoal}г</span></li>
                        <li className={classes.item}>Клетчатка: <span> {fiber} / {fiberGoal}г</span></li>
                    </ul>
                </section>

                <ActiveSection />
            </main>
        </div>
            <TabSection/>
        </>
    );
};

export default MainPage;