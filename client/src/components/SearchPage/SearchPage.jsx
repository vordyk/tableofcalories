import React from 'react';
import classes from './SearchPage.module.css';
import TextInput from "../TextInput/TextInput";
import TabSection from "../TabSection/TabSection";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faPlus} from "@fortawesome/free-solid-svg-icons";

const SearchPage = () => {
    function toAdd() {
        window.location.href = '/addItem';
    }

    return (
        <div className={classes.container}>
            <div className={classes.searchContainer}>
                <TextInput placeholder="Введите название продукта" />
                <span className={classes.searchBtn} title="Поиск"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                <span className={classes.searchBtn} onClick={toAdd} title="Записать значение"><FontAwesomeIcon icon={faPlus} /></span>
                <ul className={classes.searchContainerItems}>

                </ul>
            </div>
            <TabSection />
        </div>
    );
};

export default SearchPage;