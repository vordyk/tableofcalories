import React from 'react';
import classes from "../ProfilePage/ProfilePage.module.css";
import FileInput from "../FileInput/FileInput";
import TabSection from "../TabSection/TabSection";
import TextInput from "../TextInput/TextInput";
import LoadingPage from "../LoadingPage/LoadingPage";
import classesEdit from "./EditPage.module.css"
import Button from "../Button/Button";
import alertify from "alertifyjs";

const EditPage = () => {
    alertify.warning("Если вы не хотите менять username или email, просто оставьте поля прежними и нажмите 'Сохранить'. <b>Для изменения аватара нажмите на него 2 раза в профиле.</b>", 5)

    const data = JSON.parse(localStorage.getItem('profile')) || {};

    const [username, setUsername] = React.useState(data.username);
    const [email, setEmail] = React.useState(data.email);

    async function saveEdit() {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:4000/users", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Beareer: " + token,
            },
            body: JSON.stringify({
                username: username,
                email: email,
            }),
        });

        const data = await res.json();

        if (data.ok) {
            alertify.success("Данные успешно изменены", 3, () => {
                localStorage.removeItem("profile");
                window.location.href = '/profile';
            })
        } else {
            alertify.error("Ошибка при изменении данных: " + data.message + '.', 3, () => {
                console.error(data);
            });
        }
    }

    if (!data) return <><LoadingPage /> <TabSection /></>;

    return (
        <div className={classes.container}>
            <ul className={classesEdit.ItemsEdit}>
                <li className={classes.dataItems}>Ваш username: {username || 'Имя пользователя не указано'}</li>
                <label className={classesEdit.label} htmlFor="username">Изменить username:
                    <TextInput id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <li className={classes.dataItems}>Ваш email: {email || 'Email не указан'}</li>
                <label className={classesEdit.label} htmlFor="email">Изменить email:
                    <TextInput id="email" value={email}  onChange={(e) => setEmail(e.target.value)} />
                </label>
                <Button onClick={saveEdit}>Сохранить</Button>
            </ul>
            <TabSection />
        </div>
    );
};

export default EditPage;