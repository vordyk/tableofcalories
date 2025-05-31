import React, { useState, useEffect } from 'react';
import classes from './ProfilePage.module.css';
import LogoutButton from '../LogoutButton/LogoutButton';
import TabSection from "../TabSection/TabSection";
import FileInput from "../FileInput/FileInput";
import LoadingPage from "../LoadingPage/LoadingPage";

const ProfilePage = () => {
    const [data, setData] = useState(null);


    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            // Получаем данные пользователя
            const res = await fetch("http://localhost:4000/users/" + token, {
                headers: { "Content-Type": "application/json" }
            });
            const result = await res.json();

            // Получаем аватар, если есть поле avatar
            if (result.avatar) {
                const avatarRes = await fetch("http://localhost:4000/getAvatar/" + result._id);
                if (avatarRes.ok) {
                    const blob = await avatarRes.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    result.avatar = imageUrl;
                }
            }
            setData(result);
        };
        fetchProfile();
    }, []);

    if (!data) return <LoadingPage />;

    return (
        <div className={classes.container}>
            <ul className={classes.Items}>
                {data.avatar ? (
                    <img src={data.avatar} alt="Аватар" className={classes.avatarImage} />
                ) : (
                    <FileInput />
                )}
                <li className={classes.dataItems}>{data.username}</li>
                <li className={classes.dataItems}>{data.email}</li>
                {/*<LogoutButton />*/}
            </ul>
            <TabSection />
        </div>
    );
};

export default ProfilePage;