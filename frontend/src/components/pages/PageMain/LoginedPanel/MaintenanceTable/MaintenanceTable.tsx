import React from "react";

import classes from "./MaintenanceTable.module.scss";
// import commonClasses from "../../../styles/common.module.scss";

import { Link } from "react-router-dom";
import MyLabeledInput from "../../../../UI/MyLabeledInput/MyLabeledInput";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { useActions } from "../../../../../hooks/useActions";
import Loader from "../../../../UI/Loader/Loader";
import MaintenanceItem from "./MaintenanceItem/MaintenanceItem";
import MyLabeledSelect, { SelectOption } from "../../../../UI/MyLabeledSelect/MyLabeledSelect";
import { AuxEntry } from "../../../../../types/api";
import { AuxEntriesToSelectOptions } from "../../../../../utils/ui";
import { numberOfNullToString, stringToNumberOrNull } from "../../../../../utils/convert";

const MaintenanceTable: React.FC = () => {
   
    const {car_num, service_company__name, type} = useTypedSelector(state => state.filterMaintenance);
    const {setMCarNum, setMServiceCompanyName, setMType, fetchMaintenances} = useActions();
    const maintenances = useTypedSelector(state => state.maintenances)
    const auxEntries = useTypedSelector(state => state.auxEntries)    

    if (maintenances.loading || auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    const maintenanceTypes = AuxEntriesToSelectOptions(auxEntries.maintenanceTypes);

    // console.log(auxEntries);
    // console.log(carModels);

    return (
        <div>
            <div className={classes.maintenance_filter}>
                <MyLabeledInput 
                    id="filter-maintenance-form__car-num"
                    type="text"
                    labelCaption="Номер машины" 
                    value={car_num}
                    setValue={(value) => setMCarNum(value)} 
                />
                <MyLabeledInput 
                    id="filter-maintenance-form__service-company-name"
                    type="text"
                    labelCaption="Сервисная компания" 
                    value={service_company__name}
                    setValue={(value) => setMServiceCompanyName(value)} 
                />
                <MyLabeledSelect
                    id="filter-maintenance-form__maintenance-type"
                    labelCaption="Вид ТО"
                    value={numberOfNullToString(type)}
                    setValue={(value) => setMType(stringToNumberOrNull(value))}
                    options={maintenanceTypes}
                    // addContainerClassNames={[]}
                />
                <button onClick={() => fetchMaintenances()}>Search</button>
            </div>
            <div className={classes.maintenance_table}>
                <MaintenanceItem  
                    id={-1} 
                    car__num={"Зав. № машины"}
                    type__name={"Вид ТО"}
                    maintenance_date={"Дата проведения ТО"}
                    operating_time_s={"Наработка, м/час"}
                    work_order_num={"№ заказ-наряда"}
                    work_order_date={"дата заказ-наряда"}
                    service_company__name={"Организация, проводившая ТО"}
                />
                {maintenances.items.map((item, index) => 
                    <MaintenanceItem key={item.id} {...item} id={index} operating_time_s={String(item.operating_time)} />
                )}
            </div>
        </div>
    );
}

export default MaintenanceTable;