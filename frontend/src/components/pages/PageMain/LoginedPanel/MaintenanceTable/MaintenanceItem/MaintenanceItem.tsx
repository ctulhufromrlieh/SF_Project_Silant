import React, { ReactElement } from "react";

import classes from "./MaintenanceItem.module.scss";
import { ChangeSortTypeProc, SortElement, SortMethod, getSortMethod } from "../../../../../../utils/sort";
import SortButton from "../../../../../UI/SortButton/SortButton";
import { Link } from "react-router-dom";

interface MaintenanceItemProps {
    index: number;
    id: number;
    car__num: string;
    type__name: string;
    maintenance_date: string;
    operating_time_s: string; 
    work_order_num: string;
    work_order_date: string;
    service_company__name: string;

    sortElements?: SortElement[],
    changeSortTypeProc?: ChangeSortTypeProc,
}

const MaintenanceItem: React.FC<MaintenanceItemProps> = ({index, id, car__num, type__name, maintenance_date, 
    operating_time_s, work_order_num,  work_order_date, service_company__name,
    sortElements, changeSortTypeProc, }) => {
    
    const hasSortButtons = (index == -1);

    const getElem = (propName: string): ReactElement => {
        if (hasSortButtons && sortElements && changeSortTypeProc) {
            const value = getSortMethod(sortElements, propName);
            const setValue = (value: SortMethod): void => {
                // console.log(`ChangeSort type for ${propName} to ${value}`)
                changeSortTypeProc(propName, value);
            }
            
            return (
                <SortButton value={value} setValue={(value) => setValue(value)}/>
            ); 

        } else {
            return <></>
        }

    }

    // return (
    //     <div className={classes.item}>
    //         <div className={classes.id}>
    //             {
    //                 id != -1 
    //             ?
    //                 id + 1 
    //             :
    //                 null}
    //         </div>
    //         <div className={classes.car__num}>{car__num}</div>
    //         <div className={classes.type__name}>{type__name}</div>
    //         <div className={classes.maintenance_date}>{maintenance_date}</div>
    //         <div className={classes.operating_time_s}>{operating_time_s}</div>
    //         <div className={classes.work_order_num}>{work_order_num}</div>
    //         <div className={classes.work_order_date}>{work_order_date}</div>
    //         <div className={classes.service_company__name}>{service_company__name}</div>
    //     </div>
    // );

    return (
        <div className={classes.item}>
            <div className={classes.id}>
                <Link to={`/maintenances/${id}`}>
                    {
                        index != -1 
                    ?
                        index + 1 
                    :
                        null
                    }
                </Link>
            </div>
            <div className={classes.car__num}>{car__num} {getElem("car__num")}</div>
            <div className={classes.type__name}>{type__name} {getElem("type__name")}</div>
            <div className={classes.maintenance_date}>{maintenance_date} {getElem("maintenance_date")}</div>
            <div className={classes.operating_time_s}>{operating_time_s} {getElem("operating_time")}</div>
            <div className={classes.work_order_num}>{work_order_num} {getElem("work_order_num")}</div>
            <div className={classes.work_order_date}>{work_order_date} {getElem("work_order_date")}</div>
            <div className={classes.service_company__name}>{service_company__name} {getElem("service_company__name")}</div>
        </div>
    );
}

export default MaintenanceItem;