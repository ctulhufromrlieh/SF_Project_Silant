import React, { useEffect } from "react";

import classes from "./PageNewReclamation.module.scss";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useParams } from "react-router";
import Loader from "../../UI/Loader/Loader";
import { AccountType, Car, defaultMaintenance, defaultReclamation } from "../../../types/api";
import { useActions } from "../../../hooks/useActions";
import { SingleElemMethod } from "../../../types/common";
import OneReclamationItem from "./OneReclamationItem";

const PageNewReclamation: React.FC = () => {
    const reclamations = useTypedSelector(state => state.reclamations);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);
    const { id } = useParams();
    
    const { fetchAuxEntries, fetchCars, fetchReclamations } = useActions();

    useEffect(() => {
        fetchAuxEntries();
        fetchCars();
    }, [auxEntries.isReady || auxEntries.loading || reclamations.loading || reclamations.ready]);

    if (!auxEntries.isReady && !auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    const reclamation = defaultReclamation;
    const method = SingleElemMethod.SINGLE_ELEM_METHOD_CREATE;

    return (
        <OneReclamationItem reclamation={reclamation} method={method}/>
    );
}

export default PageNewReclamation;