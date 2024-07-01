import React, { useEffect, useState } from "react";

import classes from "./OneMaintenanceItem.module.scss";

import CarTable from "../Cars/CarTable/CarTable";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useNavigate, useParams } from "react-router";
import Loader from "../../UI/Loader/Loader";
import { AuxEntriesToSelectOptions as auxEntriesToSelectOptions, carsToSelectOptions, clientsToSelectOptions, serviceCompaniesToSelectOptions } from "../../../utils/ui";
import MyLabeledSelect, { SelectOption } from "../../UI/MyLabeledSelect/MyLabeledSelect";
import { numberOrNullToString, stringToNumber, stringToNumberOrNull, stringToNumberListed, dateTimeToDate } from "../../../utils/convert";
import MyLabeledInput from "../../UI/MyLabeledInput/MyLabeledInput";
import { AccountType, Car, Maintenance, defaultCar, defaultMaintenance } from "../../../types/api";
import { useActions } from "../../../hooks/useActions";
import { SingleElemMethod } from "../../../types/common";
import { ModelType, isAllowedChange } from "../../../utils/permissions";

interface OneMaintenanceItemProps {
    method: SingleElemMethod,
    maintenance?: Maintenance | null,
}

const OneMaintenanceItem: React.FC<OneMaintenanceItemProps> = ({method, maintenance}) => {
    const carList = useTypedSelector(state => state.cars);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);

    const { createMaintenance, updateMaintenance, deleteMaintenance } = useActions();
    // const { id } = useParams();
    
    // const { fetchAuxEntries, fetchCars } = useActions();

    // useEffect(() => {
    //     fetchAuxEntries();
    //     fetchCars();
    // }, [auxEntries.isReady || auxEntries.loading || cars.loading || cars.ready]);

    let maintenanceInit = defaultMaintenance;
    if (maintenance) {
        maintenanceInit = maintenance;
    }

    const [usedMaintenance, setUsedMaintenance] = useState(maintenanceInit);
    const navigate = useNavigate();

    // if (!auxEntries.isReady && !auxEntries.loading &&  !carList.ready && !carList.loading) {
    if (!auxEntries.isReady || auxEntries.loading || !carList.ready || carList.loading) {
        return (
            <Loader/>
        );
    }

    // const canWrite = [AccountType.ACCOUNT_TYPE_MANAGER, AccountType.ACCOUNT_TYPE_ADMIN].includes(accountInfo.accountType);
    const canWrite = isAllowedChange(ModelType.MODEL_TYPE_MAINTENANCE, accountInfo.accountType);

    let cars: SelectOption[] = [{ value: String(usedMaintenance.car), caption: usedMaintenance.car__num }];
    let types: SelectOption[] = [{ value: String(usedMaintenance.type), caption: usedMaintenance.type__name }];
    let serviceCompanies: SelectOption[] = [{ value: String(usedMaintenance.service_company), caption: usedMaintenance.service_company__name }];
    if (canWrite) {
        cars = carsToSelectOptions(carList.items, false).sort((a, b) => a.caption.localeCompare(b.caption));
        types = auxEntriesToSelectOptions(auxEntries.maintenanceTypes, false);
        serviceCompanies = serviceCompaniesToSelectOptions(auxEntries.serviceCompanies, false);
        serviceCompanies.unshift({ value: String(-1), caption: "Самостоятельно"});
    }

    // console.log("cars = ", cars)

    console.log("usedMaintenance = ", usedMaintenance);

    const createMaintenanceAndRefresh = (maintenance: Maintenance) => {
        createMaintenance(maintenance);
        navigate("/maintenances");
    }

    const updateMaintenanceAndRefresh = (maintenance: Maintenance) => {
        updateMaintenance(maintenance);
        // navigate("/cars");
    }

    const deleteMaintenanceAndRefresh = (maintenance: Maintenance) => {
        deleteMaintenance(maintenance);
        navigate("/maintenances");
    }

    // console.log("method = ", method);

    console.log("stringToNumberListed(numberOfNullToString(usedMaintenance.car), cars)", stringToNumberListed(numberOrNullToString(usedMaintenance.car), cars));

    return (
        <div className={classes.page}>
            <h2>ТО</h2>
            <div className={classes.maintenance_form}>
                <MyLabeledSelect
                    id="one-maintenance-form__car"
                    labelCaption="Зав. № машины"
                    value={numberOrNullToString(usedMaintenance.car)}
                    setValue={(value) => setUsedMaintenance({...usedMaintenance, car: stringToNumberListed(value, cars)})}
                    options={cars}
                    disabled={!canWrite}
                    // addContainerClassNames={[]}
                />
                <MyLabeledSelect
                    id="one-maintenance-form__type"
                    labelCaption="Вид ТО"
                    value={numberOrNullToString(usedMaintenance.type)}
                    setValue={(value) => setUsedMaintenance({...usedMaintenance, type: stringToNumberListed(value, types)})}
                    options={types}
                    disabled={!canWrite}
                    // addContainerClassNames={[]}
                />
                <MyLabeledInput 
                    id="one-maintenance-form__main-maintenance-date"
                    type="date"
                    labelCaption="Дата проведения ТО"
                    value={dateTimeToDate(usedMaintenance.maintenance_date)}
                    setValue={(value) => setUsedMaintenance({...usedMaintenance, maintenance_date: value})} 
                    disabled={!canWrite}
                /> 
                <MyLabeledInput 
                    id="one-maintenance-form__main-operating-time"
                    type="text"
                    labelCaption="Наработка, м/час"
                    value={usedMaintenance.operating_time}
                    setValue={(value) => setUsedMaintenance({...usedMaintenance, operating_time: stringToNumber(value)})} 
                    disabled={!canWrite}
                /> 
                <MyLabeledInput 
                    id="one-maintenance-form__work-order-num"
                    type="text"
                    labelCaption="№ заказ-наряда" 
                    value={usedMaintenance.work_order_num}
                    setValue={(value) => setUsedMaintenance({...usedMaintenance, work_order_num: value})} 
                    disabled={!canWrite}
                />
                <MyLabeledInput 
                    id="one-maintenance-form__main-work-order-date"
                    type="date"
                    labelCaption="дата заказ-наряда"
                    value={dateTimeToDate(usedMaintenance.work_order_date)}
                    setValue={(value) => setUsedMaintenance({...usedMaintenance, work_order_date: value})} 
                    disabled={!canWrite}
                />
                <MyLabeledSelect
                    id="one-maintenance-form__service-company"
                    labelCaption="Организация, проводившая ТО"
                    value={numberOrNullToString(usedMaintenance.service_company)}
                    setValue={(value) => setUsedMaintenance({...usedMaintenance, service_company: stringToNumberListed(value, serviceCompanies)})} 
                    options={serviceCompanies}
                    disabled={!canWrite}
                />
            </div>
            {
                method == SingleElemMethod.SINGLE_ELEM_METHOD_CREATE 
            ?
                // <button onClick={() => createCar(usedCar)}>Создать</button>
                <button onClick={() => createMaintenanceAndRefresh(usedMaintenance)}>Создать</button>
            :
                null
            }
            {
                method == SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE 
            ?
                // <button onClick={() => createCar(usedCar)}>Создать</button>
                <button onClick={() => updateMaintenanceAndRefresh(usedMaintenance)}>Обновить</button>
            :
                null
            }
            {
                method == SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE 
            ?
                // <button onClick={() => createCar(usedCar)}>Создать</button>
                <button onClick={() => deleteMaintenanceAndRefresh(usedMaintenance)}>Удалить</button>
            :
                null
            }
        </div>
    );
}

export default OneMaintenanceItem;