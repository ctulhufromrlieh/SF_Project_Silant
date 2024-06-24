import React from "react";

import classes from "./SimpleCarTable.module.scss";
// import commonClasses from "../../../styles/common.module.scss";

import { Link } from "react-router-dom";
import MyLabeledInput from "../../../UI/MyLabeledInput/MyLabeledInput";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import Loader from "../../../UI/Loader/Loader";
import SimpleCarItem from "./SimpleCarItem/SimpleCarItem";

const SimpleCarTable: React.FC = () => {
    const {car_num} = useTypedSelector(state => state.filterCar);
    const {setCarNum, fetchSimpleCars} = useActions();
    const { items, loading } = useTypedSelector(state => state.simpleCars)

    // console.log("items = ", items);
    console.log("car_num = ", car_num);

    if (loading) {
        return (
            <Loader/>
        );
    }

    return (
        <div>
            <div className={classes.car_filter}>
                <MyLabeledInput 
                    id="filter-car-form__car-num"
                    type="text"
                    labelCaption="Номер:" 
                    value={car_num}
                    setValue={(value) => setCarNum(value)} 
                />
                <button onClick={() => fetchSimpleCars()}>Search</button>
            </div>
            <div className={classes.car_table}>
                <SimpleCarItem  
                    id={-1} 
                    car_model__name={"Модель техники"} 
                    car_num={"Зав. № машины"}
                    engine_model__name={"Модель двигателя"}
                    engine_num={"Зав. № двигателя"}
                    transmission_model__name={"Модель трансмиссии (производитель, артикул)"}
                    transmission_num={"Зав. № трансмиссии"}
                    main_bridge_model__name={"Модель ведущего моста"} 
                    main_bridge_num={"Зав. № ведущего моста"} 
                    steerable_bridge_model__name={"Модель управляемого моста"} 
                    steerable_bridge_num={"Зав. № управляемого моста"}
                />
                {items.map((item, index) => 
                    <SimpleCarItem key={item.id} {...item} id={index} />
                )}
            </div>
        </div>
    );
}

export default SimpleCarTable;