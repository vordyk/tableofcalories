import React, { useState, useEffect } from 'react';
import classes from './ProfilePage.module.css';
import TabSection from "../TabSection/TabSection";
import FileInput from "../FileInput/FileInput";
import LoadingPage from "../LoadingPage/LoadingPage";
import Button from "../Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faRotateRight, faPenToSquare, faEnvelope, faBackward } from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
    function reloadPage() {
        localStorage.removeItem("profile");
        window.location.reload();
    }

    function edit() {
        window.location.href = '/edit';
    }

    function editAvatar() {
        avatarInput ? setAvatarInput(false) :
        setAvatarInput(true)
    }

    const [avatarInput, setAvatarInput] = useState(false);
    const [data, setData] = useState(null);
    const profile = localStorage.getItem("profile");

    function avatarExists(img) {
        return <img src={img} onDoubleClick={editAvatar} title="Для изменения аватара нажмите на вашу текующую 2 раза." className={classes.avatarImage} alt="Аватар" />;
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:4000/users/${token}`, {
                headers: { "Content-Type": "application/json" }
            });
            const result = await res.json();

            if (result.avatar) {
                const avatarRes = await fetch(`http://localhost:4000/getAvatar/${result._id}`);
                if (avatarRes.ok) {
                    const blob = await avatarRes.blob();
                    const reader = new FileReader();

                    reader.onloadend = () => {
                        result.avatar = reader.result; // Сохраняем Base64
                        localStorage.setItem("profile", JSON.stringify(result));
                        setData(result);
                    };

                    reader.readAsDataURL(blob); // Конвертируем в Base64
                }
            } else {
                setData(result);
            }
        };

        if (!profile) {
            fetchProfile();
        } else {
            setData(JSON.parse(profile));
        }
    }, []);

    if (!data) return <><LoadingPage /> <TabSection /></>;

    console.log(data)

    return (
        <div className={classes.container}>
            <ul className={!data.avatar || avatarInput ? classes.Items : classes.ItemsAvatar}>
                {!data.avatar || avatarInput ?
                <div className={classes.ImgContainer}>
                    <FileInput />
                    <Button className={classes.editAvatar} onClick={editAvatar}><FontAwesomeIcon icon={faBackward} /></Button>
                </div> :
                    avatarExists(data.avatar)
                }
                { !data.avatar || avatarInput ?
                <div className={classes.userInfo}>
                    <li className={classes.dataItems}>{data.username || 'Имя пользователя не указано'}</li>
                    <li className={classes.dataItems}>{data.email || 'Email не указан'}</li>
                </div> :
                    <>
                        <li className={classes.dataItems}>{data.username || 'Имя пользователя не указано'}</li>
                        <li className={classes.dataItems}>{data.email || 'Email не указан'}</li>
                    </>
                }
                <div className={classes.menuBtn}>
                    <Button onClick={reloadPage} title="Нажмите если завис профиль."><FontAwesomeIcon icon={faRotateRight} /></Button>
                    <Button onClick={edit} title="Редактировать профиль."><FontAwesomeIcon icon={faPenToSquare} /></Button>
                    <Button onClick={() => window.location.href="/ts"} title="Тех.поддержка"><FontAwesomeIcon icon={faEnvelope} /></Button>
                </div>
            </ul>
            <TabSection />
        </div>
    );
};

export default ProfilePage;