import React from 'react';
import classes from './AddItemPage.module.css';
import TabSection from "../TabSection/TabSection";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import alertify from "alertifyjs";

const AddItemPage = () => {
    const [calories, setCalories] = React.useState('');
    const [protein, setProtein] = React.useState('');
    const [fats, setFats] = React.useState('');
    const [carbs, setCarbs] = React.useState('');
    const [fiber, setFiber] = React.useState('');
    const time = new Date().getHours();
    const [mealType, setMealType] = React.useState('');
    React.useEffect( () => {
        switch (time) {
            case time < 12:
                setMealType('breakfast');
                break;
            case time < 18:
                setMealType('lunch');
                break;
            default:
                setMealType('dinner');
                break;
        }
    }
    , []);
    async function addItem() {
        const token = localStorage.getItem('token');

        try {
            await fetch('http://localhost:4000/dailyNutrients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    calories,
                    protein,
                    carbs,
                    fats,
                    fiber,
                    mealType: mealType,
                })
            });

            sessionStorage.removeItem('dailyNutrients');

            alertify.success("Питательные вещества успешно добавлены.", 3, () => {
                window.location.href = '/';
            })
        } catch (error) {
            alertify.error("Ошибка добавления питательных вещесив.");
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.newItemContainer}>
                <label className={classes.label}><span className={classes.name}>Калории (ккал):</span>
                    <TextInput value={calories} onChange={e => setCalories(e.target.value)} placeholder="Введите кол-во каллорий"></TextInput>
                </label>
                <label className={classes.label}><span className={classes.name}>Белки (г):</span>
                    <TextInput value={protein} onChange={e => setProtein(e.target.value)} placeholder="Введите кол-во белков"></TextInput>
                </label>
                <label className={classes.label}><span className={classes.name}>Жиры (г):</span>
                    <TextInput value={fats} onChange={e => setFats(e.target.value)} placeholder="Введите кол-во жиров"></TextInput>
                </label>
                <label className={classes.label}><span className={classes.name}>Углеводы (г):</span>
                    <TextInput value={carbs} onChange={e => setCarbs(e.target.value)} placeholder="Введите кол-во углеводов"></TextInput>
                </label>
                <label className={classes.label}><span className={classes.name}>Клетчатка (г):</span>
                    <TextInput value={fiber} onChange={e => setFiber(e.target.value)} placeholder="Введите кол-во клетчатки"></TextInput>
                </label>
                <label className={classes.label + " " + classes.radioInput}> <span className={classes.name}>Приём пищи:</span>
                    <input type="radio" name="mealType" value="breakfast" checked={mealType === 'breakfast'} onChange={() => setMealType('breakfast')} /> Завтрак
                    <input type="radio" name="mealType" value="lunch" checked={mealType === 'lunch'} onChange={() => setMealType('lunch')} /> Обед
                    <input type="radio" name="mealType" value="dinner" checked={mealType === 'dinner'} onChange={() => setMealType('dinner')} /> Ужин
                </label>
                <div className={classes.label}>
                    <Button onClick={addItem}>Сохранить</Button>
                </div>
            </div>
            <TabSection />
        </div>
    );
};

export default AddItemPage;