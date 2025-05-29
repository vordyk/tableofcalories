import { useLocation, useNavigate } from "react-router-dom";
import TabSectionLi from "./TabSectionLi";
import { faUser, faPlus, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./TabSection.module.css";

const tabs = [
    { name: "profile", icon: faUser, path: "/profile" },
    { name: "add", icon: faPlus, path: "/" },
    { name: "gear", icon: faGear, path: "/settings" },
];

const TabSection = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className={classes.tabSection}>
            <div className={classes.tabSectionMenu}>
                <ul className={classes.tabSectionMenuItems}>
                    {tabs.map(tab => (
                        <TabSectionLi
                            key={tab.name}
                            isActive={location.pathname === tab.path}
                            onClick={() => navigate(tab.path)}
                        >
                            <FontAwesomeIcon icon={tab.icon} />
                        </TabSectionLi>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TabSection;