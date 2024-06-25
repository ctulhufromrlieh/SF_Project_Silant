import React from "react";

import classes from "./CarItem.module.scss";
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

interface CarItemProps {
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
}

const CarItem: React.FC<CarItemProps> = ({id, car_model__name, car_num, engine_model__name, engine_num, transmission_model__name, transmission_num,
    main_bridge_model__name, main_bridge_num, steerable_bridge_model__name, steerable_bridge_num, factory_shipment_date, consignee,
    shipment_address, add_options, client__name, service_company__name}) => {
    return (
        <div className={classes.item}>
            <div className={classes.id}>
                {
                    id != -1 
                ?
                    id + 1 
                :
                    null}
                {/* {id} */}
            </div>
            <div className={classes.car_model__name}>{car_model__name}</div>
            <div className={classes.car_num}>{car_num}</div>
            <div className={classes.engine_model__name}>{engine_model__name}</div>
            <div className={classes.engine_num}>{engine_num}</div>
            <div className={classes.transmission_model__name}>{transmission_model__name}</div>
            <div className={classes.transmission_num}>{transmission_num}</div>
            <div className={classes.main_bridge_model__name}>{main_bridge_model__name}</div>
            <div className={classes.main_bridge_num}>{main_bridge_num}</div>
            <div className={classes.steerable_bridge_model__name}>{steerable_bridge_model__name}</div>
            <div className={classes.steerable_bridge_num}>{steerable_bridge_num}</div>
            <div className={classes.factory_shipment_date}>{factory_shipment_date}</div>
            <div className={classes.consignee}>{consignee}</div>
            <div className={classes.shipment_address}>{shipment_address}</div>
            <div className={classes.add_options}>{add_options}</div>
            <div className={classes.client__name}>{client__name}</div>
            <div className={classes.service_company__name}>{service_company__name}</div>
        </div>
    );
}

export default CarItem;