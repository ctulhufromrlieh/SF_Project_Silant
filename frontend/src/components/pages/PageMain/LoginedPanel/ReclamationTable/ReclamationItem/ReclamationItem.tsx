import React, { ReactElement } from "react";

import classes from "./ReclamationItem.module.scss";
import { ChangeSortTypeProc, SortElement, SortMethod, getSortMethod } from "../../../../../../utils/sort";
import SortButton from "../../../../../UI/SortButton/SortButton";
import { Link } from "react-router-dom";

interface ReclamationItemProps {
    index: number;
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

    sortElements?: SortElement[],
    changeSortTypeProc?: ChangeSortTypeProc,
}

const ReclamationItem: React.FC<ReclamationItemProps> = ({index, id, car__num, car__service_company__name, failure_date, operating_time_s, 
    failure_node__name, failure_description, recovery_method__name, repair_parts, recovery_date, downtime_s,
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
    //         <div className={classes.car__service_company__name}>{car__service_company__name}</div>
    //         <div className={classes.failure_date}>{failure_date}</div>
    //         <div className={classes.operating_time_s}>{operating_time_s}</div>
    //         <div className={classes.failure_node__name}>{failure_node__name}</div>
    //         <div className={classes.failure_description}>{failure_description}</div>
    //         <div className={classes.recovery_method__name}>{recovery_method__name}</div>
    //         <div className={classes.repair_parts}>{repair_parts}</div>
    //         <div className={classes.recovery_date}>{recovery_date}</div>
    //         <div className={classes.downtime_s}>{downtime_s}</div>
    //     </div>
    // );

    return (
        <div className={classes.item}>
            <div className={classes.id}>
                <Link to={`/reclamations/${id}`}>
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
            <div className={classes.car__service_company__name}>{car__service_company__name} {getElem("car__service_company__name")}</div>
            <div className={classes.failure_date}>{failure_date} {getElem("failure_date")}</div>
            <div className={classes.operating_time_s}>{operating_time_s} {getElem("operating_time")}</div>
            <div className={classes.failure_node__name}>{failure_node__name} {getElem("failure_node__name")}</div>
            <div className={classes.failure_description}>{failure_description} {getElem("failure_description")}</div>
            <div className={classes.recovery_method__name}>{recovery_method__name} {getElem("recovery_method__name")}</div>
            <div className={classes.repair_parts}>{repair_parts} {getElem("repair_parts")}</div>
            <div className={classes.recovery_date}>{recovery_date} {getElem("recovery_date")}</div>
            <div className={classes.downtime_s}>{downtime_s} {getElem("downtime")}</div>
        </div>
    );
}

export default ReclamationItem;