import React, { ReactElement } from "react";

import classes from "./AuxEntryItem.module.scss";
import { Link } from "react-router-dom";
import SortButton from "../../../UI/SortButton/SortButton";
import { ChangeSortTypeProc, SortElement, SortMethod, getSortMethod } from "../../../../utils/sort";
import { getAuxEntriesLinkSingle } from "../../../../types/auxEntries";
import { AuxEntryType } from "../../../../types/api";

interface AuxEntryItemProps {
    index: number;
    id: number;
    type: AuxEntryType;
    name: string;
    description: string;

    // sortElements?: SortElement[],
    // changeSortTypeProc?: ChangeSortTypeProc,
}

const AuxEntryItem: React.FC<AuxEntryItemProps> = ({ index, id, type, name, description }) => {

    // const hasSortButtons = (index == -1);

    // const getElem = (propName: string): ReactElement => {
    //     if (hasSortButtons && sortElements && changeSortTypeProc) {
    //         const value = getSortMethod(sortElements, propName);
    //         const setValue = (value: SortMethod): void => {
    //             // console.log(`ChangeSort type for ${propName} to ${value}`)
    //             changeSortTypeProc(propName, value);
    //         }
            
    //         return (
    //             <SortButton value={value} setValue={(value) => setValue(value)}/>
    //         ); 

    //     } else {
    //         return <></>
    //     }
    
    // }

    return (
        <div className={classes.item}>
            <div className={classes.id}>
                <Link to={`${getAuxEntriesLinkSingle(type, id)}`}>
                    {
                        index != -1 
                    ?
                        index + 1 
                    :
                        null
                    }
                </Link>
            </div>
            {/* <div className={classes.name}>{name} {getElem("name")}</div>
            <div className={classes.description}>{description} {getElem("description")}</div> */}
            <div className={classes.name}>{name}</div>
            <div className={classes.description}>{description}</div>
        </div>
    );
}

export default AuxEntryItem;