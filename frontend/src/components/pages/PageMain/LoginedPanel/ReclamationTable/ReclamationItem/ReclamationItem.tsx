import React from "react";

import classes from "./ReclamationItem.module.scss";

interface ReclamationItemProps {
    id: number;
    car__num: string;
    car__service_company__name: string;
    failure_date: string;
    operating_time_s: string;
    failure_node__name: string;
    failure_description: string;
    recovery_method__name: string;
    repair_parts: string;
    recovery_date: string;
    downtime_s: string;
}

const ReclamationItem: React.FC<ReclamationItemProps> = ({id, car__num, car__service_company__name, failure_date, operating_time_s, 
    failure_node__name, failure_description, recovery_method__name, repair_parts, recovery_date, downtime_s}) => {
    return (
        <div className={classes.item}>
            <div className={classes.id}>
                {
                    id != -1 
                ?
                    id + 1 
                :
                    null}
            </div>
            <div className={classes.car__num}>{car__num}</div>
            <div className={classes.car__service_company__name}>{car__service_company__name}</div>
            <div className={classes.failure_date}>{failure_date}</div>
            <div className={classes.operating_time_s}>{operating_time_s}</div>
            <div className={classes.failure_node__name}>{failure_node__name}</div>
            <div className={classes.failure_description}>{failure_description}</div>
            <div className={classes.recovery_method__name}>{recovery_method__name}</div>
            <div className={classes.repair_parts}>{repair_parts}</div>
            <div className={classes.recovery_date}>{recovery_date}</div>
            <div className={classes.downtime_s}>{downtime_s}</div>
        </div>
    );
}

export default ReclamationItem;