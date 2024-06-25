import React from "react";

import classes from "./CarTable.module.scss";
// import commonClasses from "../../../styles/common.module.scss";

import { Link } from "react-router-dom";
import MyLabeledInput from "../../../../UI/MyLabeledInput/MyLabeledInput";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { useActions } from "../../../../../hooks/useActions";
import Loader from "../../../../UI/Loader/Loader";
import CarItem from "./CarItem/CarItem";
import MyLabeledSelect, { SelectOption } from "../../../../UI/MyLabeledSelect/MyLabeledSelect";
import { AuxEntry } from "../../../../../types/api";
import { AuxEntriesToSelectOptions } from "../../../../../utils/ui";

const stringToNumberOrNull = (value: string): number | null => {
    try {
        return parseInt(value);
    } catch {
        return null;
    }
}

const numberOfNullToString = (value: number | null): string => {
    if (value === null) {
        return "";
    } else {
        return String(value);
    }
}

const CarTable: React.FC = () => {
    // const carModels: SelectOption[] = [
    //     {value: Tone.POSITIVE, caption: "позитивная"},
    //     {value: Tone.NEGATIVE, caption: "негативная"},
    //     {value: Tone.NEUTRAL, caption: "нейтральная"},
    //     {value: Tone.ANY, caption: "любая"},
    // ];
   
    const {car_num, car_model, engine_model, transmission_model, main_bridge_model, steerable_bridge_model} = useTypedSelector(state => state.filterCar);
    const {setCarNum, setCarModel, setEngineModel, setTransmissionModel, setMainBridgeModel, setSteerableBridgeModel, fetchCars} = useActions();
    const cars = useTypedSelector(state => state.cars)
    const auxEntries = useTypedSelector(state => state.auxEntries)    

    // console.log("items = ", items);
    // console.log("car_num = ", car_num);

    if (cars.loading || auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    const carModels = AuxEntriesToSelectOptions(auxEntries.carModels);
    const engineModels = AuxEntriesToSelectOptions(auxEntries.engineModels);
    const transmissionModels = AuxEntriesToSelectOptions(auxEntries.transmissionModels);
    const mainBridgeModels = AuxEntriesToSelectOptions(auxEntries.mainBridgeModels);
    const steerableBridgeModels = AuxEntriesToSelectOptions(auxEntries.steerableBridgeModels);

    console.log(auxEntries);
    console.log(carModels);

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
                <MyLabeledSelect
                    id="filter-car-form__car-model"
                    labelCaption="Модель техники"
                    value={numberOfNullToString(car_model)}
                    setValue={(value) => setCarModel(stringToNumberOrNull(value))}
                    options={carModels}
                    // addContainerClassNames={[]}
                />
                <MyLabeledSelect
                    id="filter-car-form__engine-model"
                    labelCaption="Модель двигателя"
                    value={numberOfNullToString(engine_model)}
                    setValue={(value) => setEngineModel(stringToNumberOrNull(value))}
                    options={engineModels}
                    // addContainerClassNames={[]}
                />
                <MyLabeledSelect
                    id="filter-car-form__transmission-model"
                    labelCaption="Модель трансмиссии (производитель, артикул)"
                    value={numberOfNullToString(transmission_model)}
                    setValue={(value) => setTransmissionModel(stringToNumberOrNull(value))}
                    options={transmissionModels}
                    // addContainerClassNames={[]}
                />
                <MyLabeledSelect
                    id="filter-car-form__main-bridge-model"
                    labelCaption="Модель ведущего моста"
                    value={numberOfNullToString(main_bridge_model)}
                    setValue={(value) => setMainBridgeModel(stringToNumberOrNull(value))}
                    options={mainBridgeModels}
                    // addContainerClassNames={[]}
                />
                <MyLabeledSelect
                    id="filter-car-form__steerable-bridge-model"
                    labelCaption="Модель управляемого моста"
                    value={numberOfNullToString(steerable_bridge_model)}
                    setValue={(value) => setSteerableBridgeModel(stringToNumberOrNull(value))}
                    options={steerableBridgeModels}
                    // addContainerClassNames={[]}
                />
                <button onClick={() => fetchCars()}>Search</button>
            </div>
            <div className={classes.car_table}>
                <CarItem  
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
                    factory_shipment_date={"Дата отгрузки с завода"}
                    consignee={"Грузополучатель (конечный потребитель)"}
                    shipment_address={"Адрес поставки (эксплуатации)"}
                    add_options={"Комплектация (доп. опции)"}
                    client__name={"Покупатель"}
                    service_company__name={"Сервисная компания"}
                />
                {cars.items.map((item, index) => 
                    <CarItem key={item.id} {...item} id={index} />
                )}
            </div>
        </div>
    );
}

export default CarTable;