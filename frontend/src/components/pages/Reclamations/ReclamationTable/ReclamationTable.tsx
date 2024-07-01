import React, { useEffect } from "react";

import classes from "./ReclamationTable.module.scss";
// import commonClasses from "../../../styles/common.module.scss";

import ReclamationItem from "./ReclamationItem/ReclamationItem";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import Loader from "../../../UI/Loader/Loader";
import { ChangeSortTypeProc, SortMethod, sortObjects } from "../../../../utils/sort";
import { Reclamation } from "../../../../types/api";
import { AuxEntriesToSelectOptions } from "../../../../utils/ui";
import MyLabeledInput from "../../../UI/MyLabeledInput/MyLabeledInput";
import MyLabeledSelect from "../../../UI/MyLabeledSelect/MyLabeledSelect";
import { numberOrNullToString, stringToNumberOrNull } from "../../../../utils/convert";
import { Link } from "react-router-dom";
import { ModelType, isAllowedChange } from "../../../../utils/permissions";

const ReclamationTable: React.FC = () => {
   
    const {car_num, service_company__name, failure_node, recovery_method} = useTypedSelector(state => state.filterReclamation);
    const {setRCarNum, setRServiceCompanyName, setRFailureNode, setRRecoveryMethod, fetchAccountInfo, fetchAuxEntries, fetchReclamations, sortReclamationChangeSortType} = useActions();
    const {sortElems} = useTypedSelector(state => state.sortReclamation)
    const accountInfo = useTypedSelector(state => state.accountInfo)
    const reclamations = useTypedSelector(state => state.reclamations)
    const auxEntries = useTypedSelector(state => state.auxEntries)    

    const fullRefreshMaintenances = () => {
        fetchAccountInfo();
        fetchAuxEntries();
        fetchReclamations();
    }

    useEffect(() => {
        fullRefreshMaintenances();
        // fetchAccountInfo();
        // fetchAuxEntries();
        // fetchReclamations();
    }, []);

    if (accountInfo.loading || reclamations.loading || auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    const propNames: string[] = ["car__num", "car__service_company__name", "failure_date", "operating_time", 
        "failure_node__name", "failure_description", "recovery_method__name", "repair_parts", "recovery_date", "downtime",];

    let sortedReclamations = sortObjects<Reclamation>(reclamations.items, sortElems, propNames);

    const failureNodes = AuxEntriesToSelectOptions(auxEntries.failureNodes, true);
    const recoveryMethods = AuxEntriesToSelectOptions(auxEntries.recoveryMethods, true);

    const changeSortTypeProc: ChangeSortTypeProc = (propName: string, sortMethod: SortMethod): void => {
        sortReclamationChangeSortType(propName, sortMethod);
    }

    const canAddNew = isAllowedChange(ModelType.MODEL_TYPE_RECLAMATION, accountInfo.accountType);    

    return (
        <div>
            <div className={classes.maintenance_filter}>
                <MyLabeledInput 
                    id="filter-reclamation-form__car-num"
                    type="text"
                    labelCaption="Номер" 
                    value={car_num}
                    setValue={(value) => setRCarNum(value)} 
                />
                <MyLabeledInput 
                    id="filter-reclamation-form__service-company-name"
                    type="text"
                    labelCaption="Сервисная компания" 
                    value={service_company__name}
                    setValue={(value) => setRServiceCompanyName(value)} 
                />
                <MyLabeledSelect
                    id="filter-reclamation-form__failure-node"
                    labelCaption="Узел отказа"
                    value={numberOrNullToString(failure_node)}
                    setValue={(value) => setRFailureNode(stringToNumberOrNull(value))}
                    options={failureNodes}
                    // addContainerClassNames={[]}
                />
                <MyLabeledSelect
                    id="filter-reclamation-form__recovery-method"
                    labelCaption="Способ восстановления"
                    value={numberOrNullToString(recovery_method)}
                    setValue={(value) => setRRecoveryMethod(stringToNumberOrNull(value))}
                    options={recoveryMethods}
                    // addContainerClassNames={[]}
                />
                <button onClick={() => fetchReclamations()}>Search</button>
            </div>
            <div className={classes.reclamation_table}>
                <ReclamationItem  
                    index={-1}
                    id={-1} 
                    car__num={"Зав. № машины"}
                    car__service_company__name={"Организация, проводившая ремонт"}
                    failure_date={"Дата отказа"}
                    operating_time_s={"Наработка, м/час"}
                    failure_node__name={"Узел отказа"}
                    failure_description={"Описание отказа"}
                    recovery_method__name={"Способ восстановления"}
                    repair_parts={"Используемые запасные части"}
                    recovery_date={"Дата восстановления"}
                    downtime_s={"Время простоя техники"}
                    sortElements={sortElems}
                    changeSortTypeProc={changeSortTypeProc}
                />
                {/* {reclamations.items.map((item, index) => 
                    <ReclamationItem key={item.id} {...item} id={index} operating_time_s={String(item.operating_time)} downtime_s={String(item.downtime)} />
                )} */}
                {sortedReclamations.map((item, index) => 
                    <ReclamationItem key={item.id} {...item} index={index} id={item.id} operating_time_s={String(item.operating_time)} downtime_s={String(item.downtime)} />
                )}
            </div>
            <div>
                {
                    canAddNew 
                ? 
                    <Link to={`/reclamations/new`}>Новая рекламация</Link>
                :
                    null
                }
            </div>
        </div>
    );
}

export default ReclamationTable;