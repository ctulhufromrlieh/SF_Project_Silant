import React, { useEffect } from "react";

import classes from "./CarTable.module.scss";
// import commonClasses from "../../../styles/common.module.scss";

import { Link } from "react-router-dom";
import MyLabeledInput from "../../../UI/MyLabeledInput/MyLabeledInput";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import Loader from "../../../UI/Loader/Loader";
import CarItem from "./CarItem/CarItem";
import MyLabeledSelect, { SelectOption } from "../../../UI/MyLabeledSelect/MyLabeledSelect";
import { AccountType, AuxEntry, Car } from "../../../../types/api";
import { AuxEntriesToSelectOptions } from "../../../../utils/ui";
import { dateTimeToDate, numberOfNullToString, stringToNumberOrNull } from "../../../../utils/convert";
import { ChangeSortTypeProc, SortMethod, cloneObjects, sortObjects } from "../../../../utils/sort";
import { ModelType, isAllowedChange } from "../../../../utils/permissions";

const CarTable: React.FC = () => {

    const {car_num, car_model, engine_model, transmission_model, main_bridge_model, steerable_bridge_model} = useTypedSelector(state => state.filterCar);
    const {setCarNum, setCarModel, setEngineModel, setTransmissionModel, setMainBridgeModel, setSteerableBridgeModel, 
        fetchCars, fetchAccountInfo, fetchAuxEntries, sortCarChangeSortType} = useActions();
    const {sortElems} = useTypedSelector(state => state.sortCar);
    const accountInfo = useTypedSelector(state => state.accountInfo)
    const cars = useTypedSelector(state => state.cars);
    const auxEntries = useTypedSelector(state => state.auxEntries);

    // useEffect(() => {
    //     fetchAccountInfo();
    //     fetchAuxEntries();
    //     fetchCars();
    // }, [auxEntries.isReady, auxEntries.loading, cars.loading, cars.ready, accountInfo.accountType, accountInfo.loading ]);

    useEffect(() => {
        fetchAccountInfo();
        fetchAuxEntries();
        fetchCars();
    }, []);

    const fullRefreshCars = () => {
        fetchAccountInfo();
        fetchAuxEntries();
        fetchCars();
    }

    const propNames: string[] = ["car_model__name", "car_num", "engine_model__name", "engine_num", "transmission_model__name", "transmission_num",
        "main_bridge_model__name", "main_bridge_num", "steerable_bridge_model__name", "steerable_bridge_num", "factory_shipment_date", "consignee",
        "shipment_address", "add_options", "client__name", "service_company__name"];

    let sortedCars = sortObjects<Car>(cars.items, sortElems, propNames);

    if (accountInfo.loading || cars.loading || auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    const carModels = AuxEntriesToSelectOptions(auxEntries.carModels, true);
    const engineModels = AuxEntriesToSelectOptions(auxEntries.engineModels, true);
    const transmissionModels = AuxEntriesToSelectOptions(auxEntries.transmissionModels, true);
    const mainBridgeModels = AuxEntriesToSelectOptions(auxEntries.mainBridgeModels, true);
    const steerableBridgeModels = AuxEntriesToSelectOptions(auxEntries.steerableBridgeModels, true);

    const changeSortTypeProc: ChangeSortTypeProc = (propName: string, sortMethod: SortMethod): void => {
        sortCarChangeSortType(propName, sortMethod);
    }

    // const canAddNew = accountInfo.accountType in [AccountType.ACCOUNT_TYPE_ADMIN, AccountType.ACCOUNT_TYPE_MANAGER];
    // const canAddNew = [AccountType.ACCOUNT_TYPE_ADMIN, AccountType.ACCOUNT_TYPE_MANAGER].includes(accountInfo.accountType);
    const canAddNew = isAllowedChange(ModelType.MODEL_TYPE_CAR, accountInfo.accountType);
    // console.log("accountInfo.accountType = ", accountInfo.accountType);
    // console.log("canAddNew = ", canAddNew);

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
                {/* <button onClick={() => fetchCars()}>Search</button> */}
                <button onClick={() => fullRefreshCars()}>Искать</button>
            </div>
            <div className={classes.car_table}>
                <CarItem  
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
                    factory_shipment_date={"Дата отгрузки с завода"}
                    consignee={"Грузополучатель (конечный потребитель)"}
                    shipment_address={"Адрес поставки (эксплуатации)"}
                    add_options={"Комплектация (доп. опции)"}
                    client__name={"Покупатель"}
                    service_company__name={"Сервисная компания"}
                    sortElements={sortElems}
                    changeSortTypeProc={changeSortTypeProc}
                />
                {/* {cars.items.map((item, index) => 
                    <CarItem key={item.id} {...item} index={index} id={item.id} />
                )} */}
                {sortedCars.map((item, index) => 
                    <CarItem key={item.id} {...item} index={index} id={item.id} factory_shipment_date={dateTimeToDate(item.factory_shipment_date)} />
                )}
            </div>
            <div>
                {
                    canAddNew 
                ? 
                    <Link to={`/cars/new`}>Новая машина</Link>
                :
                    null
                }
            </div>
        </div>
    );
}

export default CarTable;