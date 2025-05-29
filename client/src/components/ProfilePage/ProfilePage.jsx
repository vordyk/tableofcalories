import React, { useState, useEffect } from 'react';
import classes from './ProfilePage.module.css';
import LogoutButton from '../LogoutButton/LogoutButton';
import TabSection from "../TabSection/TabSection";

const ProfilePage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchData = async () => {
            const res = await fetch("http://localhost:4000/checkAuth", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const result = await res.json();
            setData(result);
        };
        fetchData();
    }, []);

    if (!data) return <div>Загрузка...</div>;

    return (
        <div className={classes.container}>
            <ul className={classes.Items}>
                <img src="fox.jpg" className={classes.img} alt=""/>
                <li className={classes.dataItems}>{data.username}</li>
                <li className={classes.dataItems}>{data.email}</li>
                <LogoutButton />
            </ul>
            <TabSection />
        </div>
    );
};

export default ProfilePage;