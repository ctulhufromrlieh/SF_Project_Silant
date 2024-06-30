import { Dispatch } from "redux";
import { AuxEntriesAction, AuxEntriesActionTypes } from "../../types/auxEntries";
import { RootState } from "../reducers";
import axios from "axios";
import { checkAuth } from "../../utils/auth";
import { AuxEntries, Client, ServiceCompany, baseAccUrl, baseApiUrl } from "../../types/api";

export const fetchAuxEntries = () => {
    return async (dispatch: Dispatch<AuxEntriesAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterCar = state.filterCar;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
              }

            dispatch({type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES});

            const responseCarModels = await axios.get(`${baseApiUrl}/car_models`, {headers: headers});
            const responseEngineModels = await axios.get(`${baseApiUrl}/engine_models`, {headers: headers});
            const responseTransmissionModels = await axios.get(`${baseApiUrl}/transmission_models`, {headers: headers});
            const responseMainBridgeModels = await axios.get(`${baseApiUrl}/main_bridge_models`, {headers: headers});
            const responseSteerableBridgeModels = await axios.get(`${baseApiUrl}/steerable_bridge_models`, {headers: headers});
            const responseMaintenanceTypes = await axios.get(`${baseApiUrl}/maintenance_types`, {headers: headers});
            const responseFailureNodes = await axios.get(`${baseApiUrl}/failure_nodes`, {headers: headers});
            const responseRecoveryMethods = await axios.get(`${baseApiUrl}/recovery_methods`, {headers: headers});
            
            let dataClients: Client[] = [];
            try {
                const responseClients = await axios.get(`${baseApiUrl}/clients`, {headers: headers});
                dataClients = responseClients.data;
            } catch (e) {
                console.log("fetchAuxEntries: get clients")
                // dataClients = [];
            }
            
            let dataServiceCompanies: ServiceCompany[] = [];
            try {
                const responseServiceCompanies = await axios.get(`${baseApiUrl}/service_companies`, {headers: headers});
                dataServiceCompanies = responseServiceCompanies.data;
            } catch (e) {
                console.log("fetchAuxEntries: get service_companies")
                // dataServiceCompanies = [];
            }
            

            const entries: AuxEntries = {
                carModels: responseCarModels.data,
                engineModels: responseEngineModels.data,
                transmissionModels: responseTransmissionModels.data,
                mainBridgeModels: responseMainBridgeModels.data,
                steerableBridgeModels: responseSteerableBridgeModels.data,
                maintenanceTypes: responseMaintenanceTypes.data,
                failureNodes: responseFailureNodes.data,
                recoveryMethods: responseRecoveryMethods.data,
                clients: dataClients,
                serviceCompanies: dataServiceCompanies,
            }

            dispatch({type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES_SUCCESS, payload: entries})

            // navigate("/results")
        } catch (e) {
            console.log("fetchAuxEntries Error: ", e)
            dispatch({
                type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES_ERROR, 
                payload: (e)
            })
        }
    }
}

export const resetCars = () => {
    return async (dispatch: Dispatch<AuxEntriesAction>, getState: () => RootState) => {
        dispatch({type: AuxEntriesActionTypes.RESET_AUX_ENTRIES});
    }
}