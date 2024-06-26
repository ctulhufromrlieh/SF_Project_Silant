import React from "react";

import classes from "./MaintenanceItem.module.scss";
import { Car, SimpleCar } from "../../../../../../types/api";
// import commonClasses from "../../../styles/common.module.scss";

// import { Link } from "react-router-dom";
// import MyLabeledInput from "../../../UI/MyLabeledInput/MyLabeledInput";
// import { useTypedSelector } from "../../../../hooks/useTypedSelector";
// import { useActions } from "../../../../hooks/useActions";
// import Loader from "../../../UI/Loader/Loader";

// interface SimpleCarItemProps {
//     item: SimpleCar;
// };

interface MaintenanceItemProps {
    id: number;
    car__num: string;
    type__name: string;
    maintenance_date: string;
    operating_time_s: string; 
    work_order_num: string;
    work_order_date: string;
    service_company__name: string;
}

const MaintenanceItem: React.FC<MaintenanceItemProps> = ({id, car__num, type__name, maintenance_date, 
    operating_time_s, work_order_num,  work_order_date, service_company__name}) => {
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
            <div className={classes.type__name}>{type__name}</div>
            <div className={classes.maintenance_date}>{maintenance_date}</div>
            <div className={classes.operating_time_s}>{operating_time_s}</div>
            <div className={classes.work_order_num}>{work_order_num}</div>
            <div className={classes.work_order_date}>{work_order_date}</div>
            <div className={classes.service_company__name}>{service_company__name}</div>
        </div>
    );
}

export default MaintenanceItem;