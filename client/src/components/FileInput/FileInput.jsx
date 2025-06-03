import React from 'react';
import {useState} from "react";
import classes from './FileInput.module.css';
import alertify from "alertifyjs";

const FileInput = ({ onDoubleClick }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const handleUpload = async () => {
        const token = localStorage.getItem("token");

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://localhost:4000/uploadAvatar', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Ошибка загрузки файла');
            }

            const result = await response.json();
            alertify.success('Файл успешно загружен');
            setFile(null);
        } catch (err) {
            alertify.error("Ошибка загрузки аватара");
        }
    };

    return (
        <>
            <label
                className={
                    !file
                        ? classes.label
                        : `${classes.label} ${classes.labelHidden}`
                }
            >
                {!file && (
                    <>
                        <input
                            type="file"
                            className={classes.fileInput}
                            onChange={handleFileChange}
                        />
                        <span className={classes.span}></span>
                        <span className={classes.span1}></span>
                    </>
                )}
                {file && (
                    <button
                        className={classes.uploadButton}
                        onClick={handleUpload}
                    >
                        Загрузить
                    </button>
                )}
            </label>
        </>
    );
};

export default FileInput;