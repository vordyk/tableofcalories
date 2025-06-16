import React from 'react';
import classes from './AddItemPage.module.css';
import TabSection from "../TabSection/TabSection";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import alertify from "alertifyjs";

const AddItemPage = () => {
    const [calories, setCalories] = React.useState('');
    const [proteins, setProteins] = React.useState('');
    const [fats, setFats] = React.useState('');
    const [carbs, setCarbs] = React.useState('');
    const [fiber, setFiber] = React.useState('');

    function addItem() {
        const nutrients = {
            calories: calories,
            proteins: proteins,
            fats: fats,
            carbs: carbs,
            fiber: fiber
        }

        try {
            sessionStorage.setItem("nutrients", JSON.stringify(nutrients));
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
                <label className={classes.label}> Калории (ккал):
                    <TextInput value={calories} onChange={e => setCalories(e.target.value)} placeholder="Введите кол-во каллорий"></TextInput>
                </label>
                <label className={classes.label}> Белки (г):
                    <TextInput value={proteins} onChange={e => setProteins(e.target.value)} placeholder="Введите кол-во белков"></TextInput>
                </label>
                <label className={classes.label}> Жиры (г):
                    <TextInput value={fats} onChange={e => setFats(e.target.value)} placeholder="Введите кол-во жиров"></TextInput>
                </label>
                <label className={classes.label}> Углеводы (г):
                    <TextInput value={carbs} onChange={e => setCarbs(e.target.value)} placeholder="Введите кол-во углеводов"></TextInput>
                </label>
                <label className={classes.label}> Клетчатка (г):
                    <TextInput value={fiber} onChange={e => setFiber(e.target.value)} placeholder="Введите кол-во клетчатки"></TextInput>
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