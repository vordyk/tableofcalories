import React, { useState } from 'react';
import classes from './SettingsPage.module.css';
import TabSection from "../TabSection/TabSection";
import Modal from './Modal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { Navigate } from "react-router-dom";

const modalContent = {
    'Безопасность': {
        text: 'Здесь настройки безопасности.'
    },
    'Настройки интерфейса': {
        text: 'Здесь настройки интерфейса.'
    },
    'Поддержать автора': {
        text: 'Здесь информация о поддержке автора.'
    },
    'О приложении': {
        text: 'Информация о приложении.'
    },
    'Сбросить настройки': {
        text: 'Вы уверены, что хотите сбросить настройки?'
    },
    'Удалить аккаунт': {
        text: 'Вы уверены, что хотите удалить аккаунт?',
        confirm: 'Удалить аккаунт',
        cancel: 'Отмена',
        onConfirm: async () => {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:4000/users", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                alertify.success(data.message, 1, () => {
                    localStorage.removeItem("token");
                    window.location.reload();
                });
            } else {
                alertify.error(data.message, 3000, () => {
                    console.error("Ошибка удаления аккаунта:", data.message);
                });
            }
        }
    }
};

const SettingsPage = () => {
    const [openModal, setOpenModal] = useState(null);

    const handleOpen = (item) => setOpenModal(item);
    const handleClose = () => setOpenModal(null);

    return (
        <div className={classes.container}>
            <ul className={classes.Items}>
                <h2>Настройки</h2>
                {Object.keys(modalContent).map((item) => (
                    <li
                        key={item}
                        className={classes.dataItems}
                        onClick={() => handleOpen(item)}
                        style={{ cursor: 'pointer' }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
            {openModal && (
                <Modal onClose={handleClose}>
                    <h3>{openModal}</h3>
                    <p>{modalContent[openModal].text}</p>
                    {'confirm' in modalContent[openModal] ? (
                        <div>
                            <button
                                onClick={() => {
                                    modalContent[openModal].onConfirm();
                                    handleClose();
                                }}
                            >
                                {modalContent[openModal].confirm}
                            </button>
                            <button onClick={handleClose}>
                                {modalContent[openModal].cancel}
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleClose} className={classes.close}><FontAwesomeIcon icon={faCircleXmark} /></button>
                    )}
                </Modal>
            )}
            <TabSection />
        </div>
    );
};

export default SettingsPage;