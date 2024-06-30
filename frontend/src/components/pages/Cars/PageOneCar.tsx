import React, { useEffect } from "react";

import classes from "./PageOneCar.module.scss";
// import commonClasses from "../../../styles/common.module.scss";

// import { Link } from "react-router-dom";
// import { useTypedSelector } from "../../../hooks/useTypedSelector";
import CarTable from "../Cars/CarTable/CarTable";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useParams } from "react-router";
import Loader from "../../UI/Loader/Loader";
import { AuxEntriesToSelectOptions } from "../../../utils/ui";
import MyLabeledSelect, { SelectOption } from "../../UI/MyLabeledSelect/MyLabeledSelect";
import { numberOrNullToString, stringToNumber, stringToNumberOrNull } from "../../../utils/convert";
import MyLabeledInput from "../../UI/MyLabeledInput/MyLabeledInput";
import { AccountType, Car } from "../../../types/api";
import { useActions } from "../../../hooks/useActions";
import { SingleElemMethod } from "../../../types/common";
import OneCarItem from "./OneCarItem";

// interface PageOneCarProps {
//     method: SingleElemMethod,
//     car?: Car | null,
// }

const PageOneCar: React.FC = () => {
    const cars = useTypedSelector(state => state.cars);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);
    const { id } = useParams();
    
    const { fetchAuxEntries, fetchCars } = useActions();

    useEffect(() => {
        fetchAuxEntries();
        fetchCars();
    }, [auxEntries.isReady || auxEntries.loading || cars.loading || cars.ready]);

    if (!auxEntries.isReady && !auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    if (cars.loading || auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    let carId = -1;
    if (id) {
        carId = parseInt(id);
    }

    if (carId === -1) {
        return (
            <div>
                id машины не задан
            </div>);
    }

    // console.log("cars = ", cars);
    const car = cars.items.filter(item => item.id === carId)[0];    

    if (cars.items.length === 0) {
        return (
            <div>
                Нет машины с id = {carId}
            </div>);
    }

    const method = SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE;
    // let method = SingleElemMethod.SINGLE_ELEM_METHOD_VIEW;
    // if ([AccountType.ACCOUNT_TYPE_ADMIN, AccountType.ACCOUNT_TYPE_MANAGER].includes(accountInfo.accountType)){
    //     method = SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE;
    // }

    return (<OneCarItem car={car} method={method}/>);

    // const canWrite = accountInfo.accountType in [AccountType.ACCOUNT_TYPE_MANAGER, AccountType.ACCOUNT_TYPE_ADMIN];

    // let carModels: SelectOption[] = [{ value: String(car.car_model), caption: car.car_model__name }];
    // let engineModels: SelectOption[] = [{ value: String(car.engine_model), caption: car.engine_model__name }];
    // let transmissionModels: SelectOption[] = [{ value: String(car.transmission_model), caption: car.transmission_model__name }];
    // let mainBridgeModels: SelectOption[] = [{ value: String(car.main_bridge_model), caption: car.main_bridge_model__name }];
    // let steerableBridgeModels: SelectOption[] = [{ value: String(car.steerable_bridge_model), caption: car.steerable_bridge_model__name }];
    // let clients: SelectOption[] = [{ value: String(car.client), caption: car.client__name }];
    // let serviceCompanies: SelectOption[] = [{ value: String(car.service_company), caption: car.service_company__name }];
    // if (canWrite) {
    //     carModels = AuxEntriesToSelectOptions(auxEntries.carModels, false);
    //     engineModels = AuxEntriesToSelectOptions(auxEntries.engineModels, false);
    //     transmissionModels = AuxEntriesToSelectOptions(auxEntries.transmissionModels, false);
    //     mainBridgeModels = AuxEntriesToSelectOptions(auxEntries.mainBridgeModels, false);
    //     steerableBridgeModels = AuxEntriesToSelectOptions(auxEntries.steerableBridgeModels, false);
    // }

    // return (
    //     <div className={classes.page}>
    //         <h2>Машина</h2>
    //         <div className={classes.car_filter}>
    //             <MyLabeledSelect
    //                 id="one-car-form__car-model"
    //                 labelCaption="Модель техники"
    //                 value={numberOfNullToString(car.car_model)}
    //                 setValue={(value) => car.car_model = stringToNumber(value)}
    //                 options={carModels}
    //                 disabled={canWrite}
    //                 // addContainerClassNames={[]}
    //             />
    //             <MyLabeledInput 
    //                 id="one-car-form__car-num"
    //                 type="text"
    //                 labelCaption="Номер машины" 
    //                 value={car.car_num}
    //                 setValue={(value) => car.car_num = value} 
    //                 disabled={canWrite}
    //             />
    //             <MyLabeledSelect
    //                 id="one-car-form__engine-model"
    //                 labelCaption="Модель двигателя"
    //                 value={numberOfNullToString(car.engine_model)}
    //                 setValue={(value) => car.engine_model = stringToNumber(value)}
    //                 options={engineModels}
    //                 disabled={canWrite}
    //                 // addContainerClassNames={[]}
    //             />
    //             <MyLabeledInput 
    //                 id="one-car-form__engine_num"
    //                 type="text"
    //                 labelCaption="Номер двигателя" 
    //                 value={car.engine_num}
    //                 setValue={(value) => car.engine_num = value} 
    //                 disabled={canWrite}
    //             />
    //             <MyLabeledSelect
    //                 id="one-car-form__transmission-model"
    //                 labelCaption="Модель трансмиссии (производитель, артикул)"
    //                 value={numberOfNullToString(car.transmission_model)}
    //                 setValue={(value) => car.transmission_model = stringToNumber(value)}
    //                 options={transmissionModels}
    //                 disabled={canWrite}
    //                 // addContainerClassNames={[]}
    //             />
    //             <MyLabeledInput 
    //                 id="one-car-form__transmission-num"
    //                 type="text"
    //                 labelCaption="Номер трансмиссии" 
    //                 value={car.transmission_num}
    //                 setValue={(value) => car.transmission_num = value} 
    //                 disabled={canWrite}
    //             />
    //             <MyLabeledSelect
    //                 id="one-car-form__main-bridge-model"
    //                 labelCaption="Модель ведущего моста"
    //                 value={numberOfNullToString(car.main_bridge_model)}
    //                 setValue={(value) => car.main_bridge_model = stringToNumber(value)}
    //                 options={mainBridgeModels}
    //                 disabled={canWrite}
    //                 // addContainerClassNames={[]}
    //             />
    //             <MyLabeledInput 
    //                 id="one-car-form__main-bridge-num"
    //                 type="text"
    //                 labelCaption="Номер ведущего моста" 
    //                 value={car.main_bridge_num}
    //                 setValue={(value) => car.main_bridge_num = value} 
    //                 disabled={canWrite}
    //             />
    //             <MyLabeledSelect
    //                 id="one-car-form__steerable-bridge-model"
    //                 labelCaption="Модель управляемого моста"
    //                 value={numberOfNullToString(car.steerable_bridge_model)}
    //                 setValue={(value) => car.steerable_bridge_model = stringToNumber(value)}
    //                 options={steerableBridgeModels}
    //                 disabled={canWrite}
    //                 // addContainerClassNames={[]}
    //             />
    //             <MyLabeledInput 
    //                 id="one-car-form__main-bridge-num"
    //                 type="text"
    //                 labelCaption="Номер управляемого моста" 
    //                 value={car.steerable_bridge_num}
    //                 setValue={(value) => car.steerable_bridge_num = value} 
    //                 disabled={canWrite}
    //             />
    //             <MyLabeledInput 
    //                 id="one-car-form__main-supply-agreement"
    //                 type="text"
    //                 labelCaption="Договор поставки, №" 
    //                 value={car.supply_agreement}
    //                 setValue={(value) => car.supply_agreement = value} 
    //                 disabled={canWrite}
    //             />
    //             <MyLabeledInput 
    //                 id="one-car-form__main-factory-shipment-date"
    //                 type="text"
    //                 labelCaption="Дата отгрузки с завода"
    //                 value={car.factory_shipment_date}
    //                 setValue={(value) => car.factory_shipment_date = value} 
    //                 disabled={canWrite}
    //             />
    //             <MyLabeledInput 
    //                 id="one-car-form__main-consignee"
    //                 type="text"
    //                 labelCaption="Грузополучатель (конечный потребитель)" 
    //                 value={car.consignee}
    //                 setValue={(value) => car.consignee = value} 
    //                 disabled={canWrite}
    //             />
    //             <MyLabeledInput 
    //                 id="one-car-form__main-shipment-address"
    //                 type="text"
    //                 labelCaption="Адрес поставки (эксплуатации)" 
    //                 value={car.shipment_address}
    //                 setValue={(value) => car.shipment_address = value} 
    //                 disabled={canWrite}
    //             />
    //             <MyLabeledInput 
    //                 id="one-car-form__main-add-options"
    //                 type="text"
    //                 labelCaption="Комплектация (доп. опции)" 
    //                 value={car.add_options}
    //                 setValue={(value) => car.add_options = value} 
    //                 disabled={canWrite}
    //             />
    //             <MyLabeledSelect
    //                 id="one-car-form__service-company"
    //                 labelCaption="Сервисная компания"
    //                 value={numberOfNullToString(car.service_company)}
    //                 setValue={(value) => car.service_company = stringToNumber(value)}
    //                 options={serviceCompanies}
    //                 disabled={canWrite}
    //                 // addContainerClassNames={[]}
    //             />
    //             <MyLabeledSelect
    //                 id="one-car-form__service-company"
    //                 labelCaption="Клиент"
    //                 value={numberOfNullToString(car.client)}
    //                 setValue={(value) => car.client = stringToNumber(value)}
    //                 options={clients}
    //                 disabled={canWrite}
    //                 // addContainerClassNames={[]}
    //             />
    //         </div>
    //     </div>
    // );
}

export default PageOneCar;