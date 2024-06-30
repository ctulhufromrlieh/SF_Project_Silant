import React, { useEffect, useState } from "react";

import classes from "./OneCarItem.module.scss";

import CarTable from "./LoginedPanel/CarTable/CarTable";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useNavigate, useParams } from "react-router";
import Loader from "../../UI/Loader/Loader";
import { AuxEntriesToSelectOptions as auxEntriesToSelectOptions, clientsToSelectOptions, serviceCompaniesToSelectOptions } from "../../../utils/ui";
import MyLabeledSelect, { SelectOption } from "../../UI/MyLabeledSelect/MyLabeledSelect";
import { numberOfNullToString, stringToNumber, stringToNumberOrNull, stringToNumberListed } from "../../../utils/convert";
import MyLabeledInput from "../../UI/MyLabeledInput/MyLabeledInput";
import { AccountType, Car, defaultCar } from "../../../types/api";
import { useActions } from "../../../hooks/useActions";
import { SingleElemMethod } from "../../../types/common";
import { ModelType, isAllowedChange } from "../../../utils/permissions";

interface OneCarItemProps {
    method: SingleElemMethod,
    car?: Car | null,
}

const OneCarItem: React.FC<OneCarItemProps> = ({method, car}) => {
    // const cars = useTypedSelector(state => state.cars);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);

    const { createCar, updateCar, deleteCar } = useActions();
    // const { id } = useParams();
    
    // const { fetchAuxEntries, fetchCars } = useActions();

    // useEffect(() => {
    //     fetchAuxEntries();
    //     fetchCars();
    // }, [auxEntries.isReady || auxEntries.loading || cars.loading || cars.ready]);

    let carInit = defaultCar;
    if (car) {
        carInit = car;
    }

    const [usedCar, setUsedCar] = useState(carInit);
    const navigate = useNavigate();

    if (!auxEntries.isReady && !auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    // let usedCar: Car = defaultCar;
    // if (car) {
    //     setUsedCar(car);
    //     // usedCar = car;
    // }

    // if (cars.loading || auxEntries.loading) {
    //     return (
    //         <Loader/>
    //     );
    // }

    // let carId = -1;
    // if (id) {
    //     carId = parseInt(id);
    // }

    // if (carId === -1) {
    //     return (
    //         <div>
    //             id машины не задан
    //         </div>);
    // }

    // console.log("cars = ", cars);
    // const usedCar = cars.items.filter(item => item.id === carId)[0];

    // if (cars.items.length === 0) {
    //     return (
    //         <div>
    //             Нет машины с id = {carId}
    //         </div>);
    // }

    // const canWrite = [AccountType.ACCOUNT_TYPE_MANAGER, AccountType.ACCOUNT_TYPE_ADMIN].includes(accountInfo.accountType);
    const canWrite = isAllowedChange(ModelType.MODEL_TYPE_CAR, accountInfo.accountType);

    let carModels: SelectOption[] = [{ value: String(usedCar.car_model), caption: usedCar.car_model__name }];
    let engineModels: SelectOption[] = [{ value: String(usedCar.engine_model), caption: usedCar.engine_model__name }];
    let transmissionModels: SelectOption[] = [{ value: String(usedCar.transmission_model), caption: usedCar.transmission_model__name }];
    let mainBridgeModels: SelectOption[] = [{ value: String(usedCar.main_bridge_model), caption: usedCar.main_bridge_model__name }];
    let steerableBridgeModels: SelectOption[] = [{ value: String(usedCar.steerable_bridge_model), caption: usedCar.steerable_bridge_model__name }];
    let clients: SelectOption[] = [{ value: String(usedCar.client), caption: usedCar.client__name }];
    let serviceCompanies: SelectOption[] = [{ value: String(usedCar.service_company), caption: usedCar.service_company__name }];
    if (canWrite) {
        carModels = auxEntriesToSelectOptions(auxEntries.carModels, false);
        engineModels = auxEntriesToSelectOptions(auxEntries.engineModels, false);
        transmissionModels = auxEntriesToSelectOptions(auxEntries.transmissionModels, false);
        mainBridgeModels = auxEntriesToSelectOptions(auxEntries.mainBridgeModels, false);
        steerableBridgeModels = auxEntriesToSelectOptions(auxEntries.steerableBridgeModels, false);
        clients = clientsToSelectOptions(auxEntries.clients, false);
        serviceCompanies = serviceCompaniesToSelectOptions(auxEntries.serviceCompanies, false);
    }

    // console.log("clients = ", clients);
    // console.log("serviceCompanies = ", serviceCompanies);
    // console.log("auxEntries.serviceCompanies = ", auxEntries.serviceCompanies);
    // auxEntries.serviceCompanies

    console.log("usedCar = ", usedCar);

    const createCarAndRefresh = (car: Car) => {
        createCar(car);
        navigate("/cars");
    }

    const updateCarAndRefresh = (car: Car) => {
        updateCar(car);
        // navigate("/cars");
    }

    const deleteCarAndRefresh = (car: Car) => {
        deleteCar(car);
        navigate("/cars");
    }

    console.log("method = ", method);

    return (
        <div className={classes.page}>
            <h2>Машина</h2>
            <div className={classes.car_filter}>
                <MyLabeledSelect
                    id="one-car-form__car-model"
                    labelCaption="Модель техники"
                    value={numberOfNullToString(usedCar.car_model)}
                    // setValue={(value) => usedCar.car_model = stringToNumber(value)}
                    // setValue={(value) => setUsedCar({...usedCar, car_model: stringToNumber(value)})}
                    setValue={(value) => setUsedCar({...usedCar, car_model: stringToNumberListed(value, carModels)})}
                    options={carModels}
                    disabled={!canWrite}
                    // addContainerClassNames={[]}
                />
                <MyLabeledInput 
                    id="one-car-form__car-num"
                    type="text"
                    labelCaption="Номер машины" 
                    value={usedCar.car_num}
                    // setValue={(value) => usedCar.car_num = "value"} 
                    setValue={(value) => setUsedCar({...usedCar, car_num: value})} 
                    disabled={!canWrite}
                />
                <MyLabeledSelect
                    id="one-car-form__engine-model"
                    labelCaption="Модель двигателя"
                    value={numberOfNullToString(usedCar.engine_model)}
                    // setValue={(value) => usedCar.engine_model = stringToNumber(value)}
                    // setValue={(value) => setUsedCar({...usedCar, engine_model: stringToNumber(value)})} 
                    setValue={(value) => setUsedCar({...usedCar, engine_model: stringToNumberListed(value, engineModels)})} 
                    options={engineModels}
                    disabled={!canWrite}
                    // addContainerClassNames={[]}
                />
                <MyLabeledInput 
                    id="one-car-form__engine_num"
                    type="text"
                    labelCaption="Номер двигателя" 
                    value={usedCar.engine_num}
                    // setValue={(value) => usedCar.engine_num = value} 
                    setValue={(value) => setUsedCar({...usedCar, engine_num: value})} 
                    disabled={!canWrite}
                />
                <MyLabeledSelect
                    id="one-car-form__transmission-model"
                    labelCaption="Модель трансмиссии (производитель, артикул)"
                    value={numberOfNullToString(usedCar.transmission_model)}
                    // setValue={(value) => usedCar.transmission_model = stringToNumber(value)}
                    // setValue={(value) => setUsedCar({...usedCar, transmission_model: stringToNumber(value)})} 
                    setValue={(value) => setUsedCar({...usedCar, transmission_model: stringToNumberListed(value, transmissionModels)})} 
                    options={transmissionModels}
                    disabled={!canWrite}
                    // addContainerClassNames={[]}
                />
                <MyLabeledInput 
                    id="one-car-form__transmission-num"
                    type="text"
                    labelCaption="Номер трансмиссии" 
                    value={usedCar.transmission_num}
                    // setValue={(value) => usedCar.transmission_num = value} 
                    setValue={(value) => setUsedCar({...usedCar, transmission_num: value})} 
                    disabled={!canWrite}
                />
                <MyLabeledSelect
                    id="one-car-form__main-bridge-model"
                    labelCaption="Модель ведущего моста"
                    value={numberOfNullToString(usedCar.main_bridge_model)}
                    // setValue={(value) => usedCar.main_bridge_model = stringToNumber(value)}
                    // setValue={(value) => setUsedCar({...usedCar, main_bridge_model: stringToNumber(value)})} 
                    setValue={(value) => setUsedCar({...usedCar, main_bridge_model: stringToNumberListed(value, mainBridgeModels)})} 
                    options={mainBridgeModels}
                    disabled={!canWrite}
                    // addContainerClassNames={[]}
                />
                <MyLabeledInput 
                    id="one-car-form__main-bridge-num"
                    type="text"
                    labelCaption="Номер ведущего моста" 
                    value={usedCar.main_bridge_num}
                    // setValue={(value) => usedCar.main_bridge_num = value} 
                    setValue={(value) => setUsedCar({...usedCar, main_bridge_num: value})} 
                    disabled={!canWrite}
                />
                <MyLabeledSelect
                    id="one-car-form__steerable-bridge-model"
                    labelCaption="Модель управляемого моста"
                    value={numberOfNullToString(usedCar.steerable_bridge_model)}
                    // setValue={(value) => usedCar.steerable_bridge_model = stringToNumber(value)}
                    // setValue={(value) => setUsedCar({...usedCar, steerable_bridge_model: stringToNumber(value)})} 
                    setValue={(value) => setUsedCar({...usedCar, steerable_bridge_model: stringToNumberListed(value, steerableBridgeModels)})} 
                    options={steerableBridgeModels}
                    disabled={!canWrite}
                    // addContainerClassNames={[]}
                />
                <MyLabeledInput 
                    id="one-car-form__main-bridge-num"
                    type="text"
                    labelCaption="Номер управляемого моста" 
                    value={usedCar.steerable_bridge_num}
                    // setValue={(value) => usedCar.steerable_bridge_num = value} 
                    setValue={(value) => setUsedCar({...usedCar, steerable_bridge_num: value})} 
                    disabled={!canWrite}
                />
                <MyLabeledInput 
                    id="one-car-form__main-supply-agreement"
                    type="text"
                    labelCaption="Договор поставки, №" 
                    value={usedCar.supply_agreement}
                    // setValue={(value) => usedCar.supply_agreement = value} 
                    setValue={(value) => setUsedCar({...usedCar, supply_agreement: value})} 
                    disabled={!canWrite}
                />
                <MyLabeledInput 
                    id="one-car-form__main-factory-shipment-date"
                    type="date"
                    labelCaption="Дата отгрузки с завода"
                    value={usedCar.factory_shipment_date}
                    // setValue={(value) => usedCar.factory_shipment_date = value} 
                    setValue={(value) => setUsedCar({...usedCar, factory_shipment_date: value})} 
                    disabled={!canWrite}
                />
                <MyLabeledInput 
                    id="one-car-form__main-consignee"
                    type="text"
                    labelCaption="Грузополучатель (конечный потребитель)" 
                    value={usedCar.consignee}
                    // setValue={(value) => usedCar.consignee = value} 
                    setValue={(value) => setUsedCar({...usedCar, consignee: value})} 
                    disabled={!canWrite}
                />
                <MyLabeledInput 
                    id="one-car-form__main-shipment-address"
                    type="text"
                    labelCaption="Адрес поставки (эксплуатации)" 
                    value={usedCar.shipment_address}
                    // setValue={(value) => usedCar.shipment_address = value} 
                    setValue={(value) => setUsedCar({...usedCar, shipment_address: value})} 
                    disabled={!canWrite}
                />
                <MyLabeledInput 
                    id="one-car-form__main-add-options"
                    type="text"
                    labelCaption="Комплектация (доп. опции)" 
                    value={usedCar.add_options}
                    // setValue={(value) => usedCar.add_options = value} 
                    setValue={(value) => setUsedCar({...usedCar, add_options: value})} 
                    disabled={!canWrite}
                />
                <MyLabeledSelect
                    id="one-car-form__service-company"
                    labelCaption="Сервисная компания"
                    value={numberOfNullToString(usedCar.service_company)}
                    // setValue={(value) => usedCar.service_company = stringToNumber(value)}
                    // setValue={(value) => setUsedCar({...usedCar, service_company: stringToNumber(value)})} 
                    setValue={(value) => setUsedCar({...usedCar, service_company: stringToNumberListed(value, serviceCompanies)})} 
                    options={serviceCompanies}
                    disabled={!canWrite}
                    // addContainerClassNames={[]}
                />
                <MyLabeledSelect
                    id="one-car-form__service-company"
                    labelCaption="Клиент"
                    value={numberOfNullToString(usedCar.client)}
                    // setValue={(value) => usedCar.client = stringToNumber(value)}
                    // setValue={(value) => setUsedCar({...usedCar, client: stringToNumber(value)})} 
                    setValue={(value) => setUsedCar({...usedCar, client: stringToNumberListed(value, clients)})} 
                    options={clients}
                    disabled={!canWrite}
                    // addContainerClassNames={[]}
                />
            </div>
            {
                method == SingleElemMethod.SINGLE_ELEM_METHOD_CREATE 
            ?
                // <button onClick={() => createCar(usedCar)}>Создать</button>
                <button onClick={() => createCarAndRefresh(usedCar)}>Создать</button>
            :
                null
            }
            {
                method == SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE 
            ?
                // <button onClick={() => createCar(usedCar)}>Создать</button>
                <button onClick={() => updateCarAndRefresh(usedCar)}>Обновить</button>
            :
                null
            }
            {
                method == SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE 
            ?
                // <button onClick={() => createCar(usedCar)}>Создать</button>
                <button onClick={() => deleteCarAndRefresh(usedCar)}>Удалить</button>
            :
                null
            }
        </div>
    );
}

export default OneCarItem;