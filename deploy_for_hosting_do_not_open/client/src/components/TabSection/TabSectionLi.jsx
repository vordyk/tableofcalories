import React from 'react';
import classes from "./TabSection.module.css";


const TabSectionLi = ({children, isActive, ...props}) => {
    return (
        <>
            <li {...props} className={isActive ? `${classes.tabSectionMenuItem} ${classes.active}` : classes.tabSectionMenuItem}  onDoubleClick={() => console.log('DoubleClick')}>
                {children}
            </li>
        </>
    );
};

export default TabSectionLi;