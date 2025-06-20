import React, {useEffect} from 'react';
import classes from './MainPage.module.css';
import TabSection from "../TabSection/TabSection";
import alertify from 'alertifyjs';
import LoadingPage from "../LoadingPage/LoadingPage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faBreadSlice, faUtensils, faBowlFood, faRotateLeft} from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "./ProgressBar";
import ActiveSection from "./ActiveSection/ActiveSection";
import NutrientsSection from "./NutrientsSection/NutrientsSection";
import Button from "../Button/Button";

console.log(localStorage.getItem('token'));

const MainPage = () => {
    const getFormattedDate = () => {
        const options = { weekday: "long", day: "2-digit", month: "2-digit" };
        return new Date().toLocaleDateString("ru-RU", options);
    };

    const today = new Date().setHours(0, 0, 0, 0);

    const [nutrients, setNutrients] = React.useState(null);
    const [dailyNutrients, setDailyNutrients] = React.useState(null);
    const [date, setDate] = React.useState(today);
    const [titleDate, setTitleDate] = React.useState(getTodayDate(new Date()));

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
                    sessionStorage.setItem('nutrients', JSON.stringify(result));
                } catch (error) {
                    console.error('Ошибка:', error);
                    alertify.error('Не удалось загрузить данные пользователя.');
                }
            };
            fetchData();
        }
    }, []);

    useEffect(() => {
        const storageNutrients = sessionStorage.getItem('dailyNutrients');
        if (storageNutrients) {
            setDailyNutrients(JSON.parse(storageNutrients));
        } else {
            const fetchData = async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    alertify.error('Пожалуйста, войдите в систему.');
                    return;
                }
                try {
                    const response = await fetch(`http://localhost:4000/dailyNutrients?date=${date}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const result = await response.json();
                    if (!result.ok) {
                        throw new Error('Ошибка при получении данных пользователя');
                    }
                    setDailyNutrients(result.data);
                    sessionStorage.setItem('dailyNutrients', JSON.stringify(result.data));
                } catch (error) {
                    console.error('Ошибка:', error);
                    alertify.error('Не удалось загрузить данные пользователя.');
                }
            };
            fetchData();
        }
    }, [date]);

    function getTodayDate(dateObj) {
        const options = { weekday: "long", day: "2-digit", month: "2-digit" };
        const formatted = dateObj.toLocaleDateString("ru-RU", options);
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }

    if (!nutrients || !dailyNutrients || !dailyNutrients.meals) return <LoadingPage />;

    const caloriesGoal = nutrients.caloriesGoal;
    const carbGoal = nutrients.carbsGoal;
    const proteinGoal = nutrients.proteinGoal;
    const fatGoal = nutrients.fatsGoal;
    const fiberGoal = nutrients.fiberGoal;

    const calories = (dailyNutrients.meals.breakfast.calories || 0)
        + (dailyNutrients.meals.lunch.calories || 0)
        + (dailyNutrients.meals.dinner.calories || 0);

    const breakfastCalories = dailyNutrients.meals.breakfast.calories || 0;
    const lunchCalories = dailyNutrients.meals.lunch.calories || 0;
    const dinnerCalories = dailyNutrients.meals.dinner.calories || 0;

    const carbs = dailyNutrients.meals.breakfast.carbs + dailyNutrients.meals.dinner.carbs + dailyNutrients.meals.lunch.carbs;
    const protein = dailyNutrients.meals.breakfast.protein + dailyNutrients.meals.dinner.protein + dailyNutrients.meals.lunch.protein;
    const fats = dailyNutrients.meals.breakfast.fats + dailyNutrients.meals.dinner.fats + dailyNutrients.meals.lunch.fats;
    const fiber = dailyNutrients.meals.breakfast.fiber + dailyNutrients.meals.dinner.fiber + dailyNutrients.meals.lunch.fiber;

    const toSearch = () => {
        window.location.href = '/search';
    }

    if (carbGoal + proteinGoal + fatGoal + fiberGoal === 0) {
        alertify.warning("Хотите перейти к настройке целей по питательным веществам? <b>Перейдите в профиль и нажмите на кнопку 'Настроить цели'.</b>", 5);
    }

    return (
        <>
        <div className={classes.container}>
            <header className={classes.header}>
                <Button onClick={() => {
                    const newDate = new Date(date);
                    newDate.setDate(newDate.getDate() - 1);
                    sessionStorage.removeItem('dailyNutrients');
                    setTitleDate(getTodayDate(newDate));
                    setDate(newDate.setHours(0, 0, 0, 0));
                }
                }>Вчера</Button>
                <h1 className={classes.headerTitle}>{titleDate}</h1>
                <Button onClick={() => {
                    const newDate = new Date(date);
                    newDate.setDate(newDate.getDate() + 1);
                    sessionStorage.removeItem('dailyNutrients');
                    setTitleDate(getTodayDate(newDate));
                    setDate(newDate.setHours(0, 0, 0, 0));
                }
                }>Сегодня</Button>
            </header>

            <main className={classes.main}>
                <section className={classes.tracker}>
                    <div className={classes.summary}>
                        <ProgressBar value={calories} goal={caloriesGoal} />
                        <h3 className={classes.calories}>Прием: <span>{calories} ккал</span></h3>
                        <h3 className={classes.calories}>Цель: <span>{caloriesGoal} ккал</span></h3>
                    </div>
                    <div className={classes.meals}>
                        <div className={classes.meal}><span className={classes.icon}><FontAwesomeIcon icon={faBreadSlice} /><span className={classes.add} onClick={toSearch}> <FontAwesomeIcon icon={faPlus} /></span></span> Завтрак <span>{breakfastCalories} ккал</span></div>
                        <div className={classes.meal}><span className={classes.icon}><FontAwesomeIcon icon={faUtensils} /><span className={classes.add} onClick={toSearch}> <FontAwesomeIcon icon={faPlus} /></span></span> Обед <span>{lunchCalories} ккал</span></div>
                        <div className={classes.meal}><span className={classes.icon}><FontAwesomeIcon icon={faBowlFood} /><span className={classes.add} onClick={toSearch}> <FontAwesomeIcon icon={faPlus} /></span></span> Ужин <span>{dinnerCalories} ккал</span></div>
                    </div>
                </section>
                <NutrientsSection nutrients={{
                    carbs: carbs,
                    protein: protein,
                    fats: fats,
                    fiber: fiber,
                    carbsGoal: carbGoal,
                    proteinGoal: proteinGoal,
                    fatsGoal: fatGoal,
                    fiberGoal: fiberGoal
                }}/>

                <ActiveSection />
                <section className={classes.width} />
            </main>
        </div>
            <TabSection/>
        </>
    );
};

export default MainPage;