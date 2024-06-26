import { Dispatch } from "redux";
import { MaintenancesAction, MaintenancesActionTypes } from "../../types/maintenances";
import { RootState } from "../reducers";
import axios from "axios";
import { checkAuth } from "../../utils/auth";
import { baseApiUrl } from "../../types/api";

export const fetchMaintenances = () => {
    return async (dispatch: Dispatch<MaintenancesAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            // const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterMaintenance = state.filterMaintenance;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: MaintenancesActionTypes.FETCH_MAINTENANCES});

            const response = await axios.get(`${baseApiUrl}/maintenances`, {headers: headers, params: filterMaintenance});

            dispatch({type: MaintenancesActionTypes.FETCH_MAINTENANCES_SUCCESS, payload: response.data})
        } catch (e) {
            console.log("fetchMaintenances Error: ", e)
            dispatch({
                type: MaintenancesActionTypes.FETCH_MAINTENANCES_ERROR, 
                payload: (e)
            })
        }
    }
}

export const resetMaintenances = () => {
    return async (dispatch: Dispatch<MaintenancesAction>, getState: () => RootState) => {
        dispatch({type: MaintenancesActionTypes.RESET_MAINTENANCES});
    }
}