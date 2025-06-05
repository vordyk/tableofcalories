import classes from './LogoutButton.module.css';
import { fa } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';

const LogoutButton = () => {
    return (
        <>
            <button className={classes.logoutButton} onClick={()=> {
                localStorage.removeItem('token');
                localStorage.removeItem("profile");
                localStorage.removeItem("nutrientGoals");
                window.location.href = '/login';
            }}>
                Выйти
            </button>
        </>
    );
};

export default LogoutButton;