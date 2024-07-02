import React, { ReactElement } from "react";

// import classes from "./CarItem.module.scss";
import { Link } from "react-router-dom";
import { ChangeSortTypeProc, SortElement, SortMethod, getSortMethod } from "../../../../../utils/sort";
import SortButton from "../../../../UI/SortButton/SortButton";
import { PropRecord } from "../../../../../utils/tables";

interface CarItemProps {
    index: number;
    id: number;
    propValues: PropRecord;
    classes: Record<string, string>;

    sortElements?: SortElement[],
    changeSortTypeProc?: ChangeSortTypeProc,
}

const CarItem: React.FC<CarItemProps> = ({index, id, propValues, classes,
    sortElements, changeSortTypeProc,
}) => {

    const isHeader = (index == -1);

    const getSortButton = (propName: string): ReactElement => {
        if (isHeader && sortElements && changeSortTypeProc) {
            const value = getSortMethod(sortElements, propName);
            const setValue = (value: SortMethod): void => {
                changeSortTypeProc(propName, value);
            }
            
            return (
                <SortButton value={value} setValue={(value) => setValue(value)}/>
            ); 

        } else {
            return <></>
        }

    }

    const getElem = (propName: string): ReactElement => {
        return (
            <div className={classes[propName]}>{propValues[propName]} {getSortButton(propName)}</div>
        );
    }

    const propNames = Object.entries(propValues).map((item => item[0]));

    return (
        <div className={classes.item}>
            <div className={classes.id}>
                <Link to={`/cars/${id}`}>
                    {
                        index != -1 
                    ?
                        index + 1 
                    :
                        null
                    }
                </Link>
            </div>
            {propNames.map(item => <div key={item}>{getElem(item)}</div>)}
        </div>
    );
}

export default CarItem;