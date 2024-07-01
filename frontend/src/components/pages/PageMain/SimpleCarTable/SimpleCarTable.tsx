import React, { useEffect } from "react";

import classes from "./SimpleCarTable.module.scss";
// import commonClasses from "../../../styles/common.module.scss";

import { Link } from "react-router-dom";
import MyLabeledInput from "../../../UI/MyLabeledInput/MyLabeledInput";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import Loader from "../../../UI/Loader/Loader";
import SimpleCarItem from "./SimpleCarItem/SimpleCarItem";
import { ChangeSortTypeProc, SortMethod, sortObjects } from "../../../../utils/sort";
import { SimpleCar } from "../../../../types/api";

const SimpleCarTable: React.FC = () => {
    const {car_num} = useTypedSelector(state => state.filterCar);
    const {setCarNum, fetchSimpleCars, sortSimpleCarChangeSortType} = useActions();
    const {sortElems} = useTypedSelector(state => state.sortSimpleCar)
    // const { items, loading } = useTypedSelector(state => state.simpleCars)
    const simpleCars = useTypedSelector(state => state.simpleCars)

    console.log("simpleCars = ", simpleCars);

    // console.log("items = ", items);
    // console.log("car_num = ", car_num);

    const propNames: string[] = ["car_model__name", "car_num", "engine_model__name", "engine_num", "transmission_model__name", "transmission_num",
        "main_bridge_model__name", "main_bridge_num", "steerable_bridge_model__name", "steerable_bridge_num", ];

    let sortedCars = sortObjects<SimpleCar>(simpleCars.items, sortElems, propNames);

    // if (loading) {
    //     return (
    //         <Loader/>
    //     );
    // }

    useEffect(() => {
        fetchSimpleCars();
        // fetchAccountInfo();
        // fetchAuxEntries();
        // fetchCars();
    }, []);

    if (simpleCars.loading ) {
        return (
            <Loader/>
        );
    }

    const changeSortTypeProc: ChangeSortTypeProc = (propName: string, sortMethod: SortMethod): void => {
        sortSimpleCarChangeSortType(propName, sortMethod);
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
                    index={-1}
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
                    sortElements={sortElems}
                    changeSortTypeProc={changeSortTypeProc}
                />
                {/* {items.map((item, index) => 
                    <SimpleCarItem key={item.id} {...item} id={index} />
                )} */}
                {sortedCars.map((item, index) => 
                    <SimpleCarItem key={item.id} {...item} index={index} id={item.id} />
                )}
            </div>
        </div>
    );
}

export default SimpleCarTable;