import React, { useEffect } from "react";

import classes from "./AuxEntryTable.module.scss";
// import commonClasses from "../../../styles/common.module.scss";

import { Link } from "react-router-dom";
import { AuxEntry, AuxEntryType } from "../../../types/api";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import Loader from "../../UI/Loader/Loader";
import { ModelType, isAllowedChange } from "../../../utils/permissions";
import { ChangeSortTypeProc, SortMethod } from "../../../utils/sort";
import AuxEntryItem from "./AuxEntryItem/AuxEntryItem";
import { getAuxEntriesLinkTable, getAuxEntriesListByType } from "../../../types/auxEntries";

interface AuxEntryProps {
    type: AuxEntryType;
}

const AuxEntryTable: React.FC<AuxEntryProps> = ({type}) => {

    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);
    const { fetchAccountInfo, fetchAuxEntries } = useActions();

    const fullRefreshAuxEntries = () => {
        fetchAccountInfo();
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
            <div className={classes.aux_entry_table}>
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
            <div>
                {
                    canAddNew 
                ? 
                    <Link to={`${getAuxEntriesLinkTable(type)}/new`}>Новая запись</Link>
                :
                    null
                }
            </div>
        </div>
    );
}

export default AuxEntryTable;