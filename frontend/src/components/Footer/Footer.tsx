import React from "react";

import classes from "./Footer.module.scss";
import commonClasses from "../../styles/common.module.scss";


const Footer: React.FC = () => {
    return (
        <div className={classes.footer_container}>
            <div className={classes.footer}>
                <p className={classes.left}>+7-8352-20-12-09, telegram </p>
                <p className={classes.right}>Мой Силант 2024</p>
            </div>
        </div>
    );
}

export default Footer;