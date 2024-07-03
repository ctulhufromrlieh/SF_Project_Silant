import React, { useEffect } from "react";

// import classes from "./AuxEntryTable.module.scss";
// import commonClasses from "../../../styles/common.module.scss";
// import commonClasses from "../../../../../styles/common.module.scss";
import commonClasses from "../../../styles/common.module.scss";
import auxEntryItemClasses from "./AuxEntryItem/AuxEntryItem.module.scss";

import { Link } from "react-router-dom";
import { AuxEntry, AuxEntryType } from "../../../types/api";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import Loader from "../../UI/Loader/Loader";
import { ModelType, isAllowedChange } from "../../../utils/permissions";
import { ChangeSortTypeProc, SortMethod } from "../../../utils/sort";
// import AuxEntryItem from "./AuxEntryItem/1AuxEntryItem";
import { getAuxEntriesLinkTable, getAuxEntriesListByType } from "../../../types/auxEntries";
import MyButton from "../../UI/MyButton/MyButton";
import TableItem from "../Common/TableItem";
import { auxEntryToPropValues } from "../../../utils/convert";

interface AuxEntryProps {
    type: AuxEntryType;
}

const AuxEntryTable: React.FC<AuxEntryProps> = ({type}) => {

    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);
    const { fetchAccountInfo, fetchAuxEntries } = useActions();

    const fullRefreshAuxEntries = () => {
        // fetchAccountInfo();
        fetchAuxEntries();
    }

    useEffect(() => {
        fullRefreshAuxEntries();
        // fetchAccountInfo()
        // fetchAuxEntries();
    }, []);

    if (auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    const usedAuxEntries = getAuxEntriesListByType(type, auxEntries);

    const changeSortTypeProc: ChangeSortTypeProc = (propName: string, sortMethod: SortMethod): void => {
        // sortCarChangeSortType(propName, sortMethod);
    }

    const canAddNew = isAllowedChange(ModelType.MODEL_TYPE_AUX_ENTRY, accountInfo.accountType);

    return (
        <div>
            {/* <div className={commonClasses.table_container}>
                <div className={commonClasses.table}>
                    <AuxEntryItem  
                        index={-1} 
                        id={-1} 
                        type={type} 
                        name={"Название"}
                        description={"Описание"}
                        // sortElements={sortElems}
                        // changeSortTypeProc={changeSortTypeProc}
                    />
                    {usedAuxEntries.map((item, index) => 
                        <AuxEntryItem key={item.id} {...item} type={type} index={index} id={item.id} />
                    )}
                </div>
            </div> */}
            <div className={commonClasses.table_container}>
                <div className={commonClasses.table}>
                    <TableItem  
                        index={-1}
                        id={-1} 
                        // propValues={{
                        //     car__num: "Зав. № машины",
                        //     car__service_company__name: "Организация, проводившая ремонт",
                        //     failure_date: "Дата отказа",
                        //     operating_time_s: "Наработка, м/час",
                        //     failure_node__name: "Узел отказа",
                        //     failure_description: "Описание отказа",
                        //     recovery_method__name: "Способ восстановления",
                        //     repair_parts: "Используемые запасные части",
                        //     recovery_date: "Дата восстановления",
                        //     downtime_s: "Время простоя техники",
                        // }}
                        propValues={{
                            name: "Название",
                            description: "Описание",
                        }}
                        classes={auxEntryItemClasses}
                        basePath={`${getAuxEntriesLinkTable(type)}`}
                        // sortElements={sortElems}
                        // changeSortTypeProc={changeSortTypeProc}
                    />
                    {/* {reclamations.items.map((item, index) => 
                        <ReclamationItem key={item.id} {...item} id={index} operating_time_s={String(item.operating_time)} downtime_s={String(item.downtime)} />
                    )} */}
                    {/* {sortedReclamations.map((item, index) => 
                        <ReclamationItem key={item.id} {...item} index={index} id={item.id} operating_time_s={String(item.operating_time)} downtime_s={String(item.downtime)} 
                            failure_date={dateTimeToDate(item.failure_date)} recovery_date={dateTimeToDate(item.recovery_date)} />
                    )} */}
                    {usedAuxEntries.map((item, index) => 
                        <TableItem key={item.id} {...item} index={index} id={item.id} propValues={auxEntryToPropValues(item)} 
                            classes={auxEntryItemClasses} basePath={`${getAuxEntriesLinkTable(type)}`} />
                    )}
                </div>
            </div>
            {/* <div>
                {
                    canAddNew 
                ? 
                    <Link to={`${getAuxEntriesLinkTable(type)}/new`}>Новая запись</Link>
                :
                    null
                }
            </div> */}
            <div className={commonClasses.add_new_container}>
                {
                    canAddNew 
                ? 
                    <Link to={`${getAuxEntriesLinkTable(type)}/new`}>
                        <MyButton addClassNames={[commonClasses.add_new]}>Новая запись</MyButton>
                    </Link>
                :
                    null
                }
            </div>
        </div>
    );
}

export default AuxEntryTable;