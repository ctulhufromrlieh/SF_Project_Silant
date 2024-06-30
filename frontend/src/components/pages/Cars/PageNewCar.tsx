import React, { useEffect } from "react";

import classes from "./PageNewCar.module.scss";
// import commonClasses from "../../../styles/common.module.scss";

// import { Link } from "react-router-dom";
// import { useTypedSelector } from "../../../hooks/useTypedSelector";
// import CarTable from "./LoginedPanel/CarTable/CarTable";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useParams } from "react-router";
import Loader from "../../UI/Loader/Loader";
// import { AuxEntriesToSelectOptions } from "../../../utils/ui";
// import MyLabeledSelect, { SelectOption } from "../../UI/MyLabeledSelect/MyLabeledSelect";
// import { numberOfNullToString, stringToNumber, stringToNumberOrNull } from "../../../utils/convert";
// import MyLabeledInput from "../../UI/MyLabeledInput/MyLabeledInput";
import { AccountType, Car, defaultCar } from "../../../types/api";
import { useActions } from "../../../hooks/useActions";
import { SingleElemMethod } from "../../../types/common";
import OneCarItem from "./OneCarItem";

// interface PageOneCarProps {
//     method: SingleElemMethod,
//     car?: Car | null,
// }

const PageNewCar: React.FC = () => {
    const cars = useTypedSelector(state => state.cars);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);
    const { id } = useParams();
    
    const { fetchAuxEntries, fetchCars } = useActions();

    useEffect(() => {
        fetchAuxEntries();
        // fetchCars();
    }, [auxEntries.isReady || auxEntries.loading || cars.loading || cars.ready]);

    if (!auxEntries.isReady && !auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    const car = defaultCar;
    const method = SingleElemMethod.SINGLE_ELEM_METHOD_CREATE;

    return (<OneCarItem car={car} method={method}/>);
}

export default PageNewCar;