import React from "react";

import classes from "./Footer.module.scss";
import commonClasses from "../../styles/common.module.scss";


const Footer: React.FC = () => {
    return (
        <div className={classes.footer}>
            <div>+7-8352-20-12-09, telegram </div>
            <div>Мой Силант 2024</div>
        </div>
    );
}

export default Footer;