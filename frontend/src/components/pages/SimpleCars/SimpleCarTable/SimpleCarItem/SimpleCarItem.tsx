import React, { ReactElement } from "react";

import classes from "./SimpleCarItem.module.scss";
import { ChangeSortTypeProc, SortElement, SortMethod, getSortMethod } from "../../../../../utils/sort";
import SortButton from "../../../../UI/SortButton/SortButton";
// import { SimpleCar } from "../../../../../types/api";

interface SimpleCarItemProps {
    index: number;
    id: number;
    car_model__name: string;
    car_num: string;
    engine_model__name: string;
    engine_num: string;
    transmission_model__name: string;
    transmission_num: string;
    main_bridge_model__name: string;
    main_bridge_num: string;
    steerable_bridge_model__name: string;
    steerable_bridge_num: string;

    sortElements?: SortElement[],
    changeSortTypeProc?: ChangeSortTypeProc,
}

const SimpleCarItem: React.FC<SimpleCarItemProps> = ({index, id, car_model__name, car_num, engine_model__name, engine_num, transmission_model__name, transmission_num,
    main_bridge_model__name, main_bridge_num, steerable_bridge_model__name, steerable_bridge_num,
    sortElements, changeSortTypeProc, }) => {

        const hasSortButtons = (index == -1);

        // console.log("index = ", index);
    
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

    return (
        <div className={classes.item}>
            <div className={classes.id}>
                {
                    index != -1 
                ?
                    index + 1 
                :
                    null
                }
            </div>
            <div className={classes.car_model__name}>{car_model__name} {getElem("car_model__name")}</div>
            <div className={classes.car_num}>{car_num} {getElem("car_num")}</div>
            <div className={classes.engine_model__name}>{engine_model__name} {getElem("engine_model__name")}</div>
            <div className={classes.engine_num}>{engine_num} {getElem("engine_num")}</div>
            <div className={classes.transmission_model__name}>{transmission_model__name} {getElem("transmission_model__name")}</div>
            <div className={classes.transmission_num}>{transmission_num} {getElem("transmission_num")}</div>
            <div className={classes.main_bridge_model__name}>{main_bridge_model__name} {getElem("main_bridge_model__name")}</div>
            <div className={classes.main_bridge_num}>{main_bridge_num} {getElem("main_bridge_num")}</div>
            <div className={classes.steerable_bridge_model__name}>{steerable_bridge_model__name} {getElem("steerable_bridge_model__name")}</div>
            <div className={classes.steerable_bridge_num}>{steerable_bridge_num} {getElem("steerable_bridge_num")}</div>
        </div>
    );
}

export default SimpleCarItem;