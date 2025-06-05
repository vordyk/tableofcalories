import React, {useEffect} from 'react';
import classes from "./GoalsPage.module.css";
import TabSection from "../TabSection/TabSection";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import alertify from "alertifyjs";

const GoalsPage = () => {
    const nutrientGoals = localStorage.getItem('nutrientGoals');
    const data = JSON.parse(nutrientGoals);

    const [calories, setCalories] = React.useState(data.calories);
    const [carbs, setCarbs] = React.useState(data.carbs);
    const [fats, setFats] = React.useState(data.fats);
    const [protein, setProtein] = React.useState(data.protein);
    const [fiber, setFiber] = React.useState(data.fiber);

    useEffect(() => {
        alertify.warning("Не трогайте поле, если не хотите менять цель. <b>Если вы хотите изменить цель, то введите новое значение и нажмите кнопку 'Сохранить'.</b>", 5);
    }, []);

    async function saveGoals() {
        const token = localStorage.getItem("token");
        const goals = {
            calories: calories,
            carbs: carbs,
            fats: fats,
            protein: protein,
            fiber: fiber
        }

        const res = await fetch("http://localhost:4000/nutrientsGoals/" + token, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(goals)
        })

        if (res.ok) {
            alertify.success("Цели успешно изменены", 3, () => {
                localStorage.setItem("nutrientGoals", JSON.stringify(goals));
                window.location.href = '/profile';
            });
        } else {
            alertify.error("Ошибка при изменении целей: " + JSON.parse(res).message, 3, () => {
                console.error("Ошибка при изменении целей:", JSON.parse(res).message);
            });
        }
    }

    return (
        <div className={classes.container}>
            <form className={classes.form}>
                <h1 className={classes.title} title="Ваши текущие цели.">Цели:</h1>
                <label htmlFor="calories" className={classes.label}>Калории (ккал):
                    <TextInput value={calories} onChange={e => setCalories(e.target.value)} placeholder="Введите новую цель для ккал."></TextInput>
                </label>
                <label htmlFor="carbs" className={classes.label}>Углеводы (г):
                    <TextInput value={carbs} onChange={e => setCarbs(e.target.value)} placeholder="Введите новую цель для углеводов."></TextInput>
                </label>
                <label htmlFor="fats" className={classes.label}>Жиры (г):
                    <TextInput value={fats} onChange={e => setFats(e.target.value)} placeholder="Введите новую цель для жиров."></TextInput>
                </label>
                <label htmlFor="protein" className={classes.label}>Белок (г):
                    <TextInput value={protein} onChange={e => setProtein(e.target.value)} placeholder="Введите новую цель для белка."></TextInput>
                </label>
                <label htmlFor="fiber" className={classes.label}>Клетчатка (г):
                    <TextInput value={fiber} onChange={e => setFiber(e.target.value)} placeholder="Введите новую цель для клетчатки."></TextInput>
                </label>
                <div className={classes.btnWrap}>
                    <Button type="button" onClick={saveGoals}>Сохранить</Button>
                </div>
            </form>
            <TabSection />
        </div>
    );
};

export default GoalsPage;