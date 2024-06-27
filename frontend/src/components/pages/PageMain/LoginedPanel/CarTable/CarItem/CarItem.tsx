import React, { ReactElement } from "react";

import classes from "./CarItem.module.scss";
import { Car, SimpleCar } from "../../../../../../types/api";
import { Link } from "react-router-dom";
import { ChangeSortTypeProc, SortElement, SortMethod, SortProc, getSortMethod } from "../../../../../../utils/sort";
import SortButton from "../../../../../UI/SortButton/SortButton";
// import commonClasses from "../../../styles/common.module.scss";

// import { Link } from "react-router-dom";
// import MyLabeledInput from "../../../UI/MyLabeledInput/MyLabeledInput";
// import { useTypedSelector } from "../../../../hooks/useTypedSelector";
// import { useActions } from "../../../../hooks/useActions";
// import Loader from "../../../UI/Loader/Loader";

// interface SimpleCarItemProps {
//     item: SimpleCar;
// };

interface CarItemProps {
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
    factory_shipment_date: string;
    consignee: string;
    shipment_address: string;
    add_options: string;
    client__name: string;
    service_company__name: string;

    sortElements?: SortElement[],
    changeSortTypeProc?: ChangeSortTypeProc,

    // setSort_car_model__name?: SortProc;
    // setSort_car_num?: SortProc;
    // setSort_engine_model__name?: SortProc;
    // setSort_engine_num?: SortProc;
    // setSort_transmission_model__name?: SortProc;
    // setSort_transmission_num?: SortProc;
    // setSort_main_bridge_model__name?: SortProc;
    // setSort_main_bridge_num?: SortProc;
    // setSort_steerable_bridge_model__name?: SortProc;
    // setSort_steerable_bridge_num?: SortProc;
    // setSort_factory_shipment_date?: SortProc;
    // setSort_consignee?: SortProc;
    // setSort_shipment_address?: SortProc;
    // setSort_add_options?: SortProc;
    // setSort_client__name?: SortProc;
    // setSort_service_company__name?: SortProc;
}

const CarItem: React.FC<CarItemProps> = ({index, id, car_model__name, car_num, engine_model__name, engine_num, transmission_model__name, transmission_num,
    main_bridge_model__name, main_bridge_num, steerable_bridge_model__name, steerable_bridge_num, factory_shipment_date, consignee,
    shipment_address, add_options, client__name, service_company__name,
    sortElements, changeSortTypeProc,
    // setSort_car_model__name, setSort_car_num, setSort_engine_model__name, setSort_engine_num, setSort_transmission_model__name, setSort_transmission_num,
    // setSort_main_bridge_model__name, setSort_main_bridge_num, setSort_steerable_bridge_model__name, setSort_steerable_bridge_num,
    // setSort_factory_shipment_date, setSort_consignee, setSort_shipment_address, setSort_add_options, setSort_client__name, setSort_service_company__name,
}) => {

    const hasSortButtons = (index == -1);

    console.log("index = ", index);

    // const getElem = (value: SortMethod, setValue: SortProc): ReactElement => {
    //     if (hasSortButtons && setValue) {
    //         return (
    //             <SortButton value={value} setValue={setValue}/>
    //         );
    //     } else {
    //         return <></>;
    //     }
    // }
    const getElem = (propName: string): ReactElement => {
        if (hasSortButtons && sortElements && changeSortTypeProc) {
            const value = getSortMethod(sortElements, propName);
            const setValue = (value: SortMethod): void => {
                console.log(`ChangeSort type for ${propName} to ${value}`)
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
    //             <Link to={`/cars/${id}`}>
    //                 {
    //                     index != -1 
    //                 ?
    //                 index + 1 
    //                 :
    //                     null}
    //             </Link>
    //         </div>
    //         <div className={classes.car_model__name}>{car_model__name}</div>
    //         <div className={classes.car_num}>{car_num}</div>
    //         <div className={classes.engine_model__name}>{engine_model__name}</div>
    //         <div className={classes.engine_num}>{engine_num}</div>
    //         <div className={classes.transmission_model__name}>{transmission_model__name}</div>
    //         <div className={classes.transmission_num}>{transmission_num}</div>
    //         <div className={classes.main_bridge_model__name}>{main_bridge_model__name}</div>
    //         <div className={classes.main_bridge_num}>{main_bridge_num}</div>
    //         <div className={classes.steerable_bridge_model__name}>{steerable_bridge_model__name}</div>
    //         <div className={classes.steerable_bridge_num}>{steerable_bridge_num}</div>
    //         <div className={classes.factory_shipment_date}>{factory_shipment_date}</div>
    //         <div className={classes.consignee}>{consignee}</div>
    //         <div className={classes.shipment_address}>{shipment_address}</div>
    //         <div className={classes.add_options}>{add_options}</div>
    //         <div className={classes.client__name}>{client__name}</div>
    //         <div className={classes.service_company__name}>{service_company__name}</div>
    //     </div>
    // );
    return (
        <div className={classes.item}>
            <div className={classes.id}>
                <Link to={`/cars/${id}`}>
                    {
                        index != -1 
                    ?
                    index + 1 
                    :
                        null}
                </Link>
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
            <div className={classes.factory_shipment_date}>{factory_shipment_date} {getElem("factory_shipment_date")}</div>
            <div className={classes.consignee}>{consignee} {getElem("consignee")}</div>
            <div className={classes.shipment_address}>{shipment_address} {getElem("shipment_address")}</div>
            <div className={classes.add_options}>{add_options} {getElem("add_options")}</div>
            <div className={classes.client__name}>{client__name} {getElem("client__name")}</div>
            <div className={classes.service_company__name}>{service_company__name} {getElem("service_company__name")}</div>
        </div>
    );
}

export default CarItem;