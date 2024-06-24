import { Dispatch } from "redux";
import { AuxEntriesAction, AuxEntriesActionTypes } from "../../types/auxEntries";
import { RootState } from "../reducers";
import axios from "axios";
import { checkAuth } from "../../utils/auth";
import { AuxEntries, baseAccUrl } from "../../types/api";

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

            const responseCarModels = await axios.get(`${baseAccUrl}/car_models`, {headers: headers});
            const responseEngineModels = await axios.get(`${baseAccUrl}/engine_models`, {headers: headers});
            const responseTransmissionModels = await axios.get(`${baseAccUrl}/transmission_models`, {headers: headers});
            const responseMainBridgeModels = await axios.get(`${baseAccUrl}/main_bridge_models`, {headers: headers});
            const responseSteerableBridgeModels = await axios.get(`${baseAccUrl}/steerable_bridge_models`, {headers: headers});
            const responseMaintenanceTypes = await axios.get(`${baseAccUrl}/maintenance_types`, {headers: headers});
            const responseFailureNodes = await axios.get(`${baseAccUrl}/failure_nodes`, {headers: headers});
            const responseRecoveryMethods = await axios.get(`${baseAccUrl}/recovery_methods`, {headers: headers});

            const entries: AuxEntries = {
                carModels: responseCarModels.data,
                engineModels: responseEngineModels.data,
                transmissionModels: responseTransmissionModels.data,
                mainBridgeModels: responseMainBridgeModels.data,
                steerableBridgeModels: responseSteerableBridgeModels.data,
                maintenanceTypes: responseMaintenanceTypes.data,
                failureNodes: responseFailureNodes.data,
                recoveryMethods: responseRecoveryMethods.data,

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