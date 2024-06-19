import React from "react";

import classes from "./PageMain.module.scss";
// import commonClasses from "../../../styles/common.module.scss";

import { Link } from "react-router-dom";

const PageMain: React.FC = () => {
    return (
        <div className={classes.page}>
            Main page
        </div>
    );
}

export default PageMain;