import React from "react";

import classes from "./CarTable.module.scss";
// import commonClasses from "../../../styles/common.module.scss";

import { Link } from "react-router-dom";

const CarTable: React.FC = () => {
    return (
        <div>
            <div className={classes.car_filter}>

                <button>Search</button>
            </div>
            <div className={classes.car_table}>
                Main page
            </div>
        </div>
    );
}

export default CarTable;