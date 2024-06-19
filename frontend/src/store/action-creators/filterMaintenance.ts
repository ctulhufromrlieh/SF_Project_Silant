import { Dispatch } from "redux"
import { FilterMaintenanceAction, FilterMaintenanceActionTypes } from "../../types/filterMaintenance"


export const setCarNum = (value: string) => {
    return async (dispatch: Dispatch<FilterMaintenanceAction>) => {
        dispatch({type: FilterMaintenanceActionTypes.SET_CAR_NUM, payload: value});
    }
}

export const setServiceCompanyName = (value: string) => {
    return async (dispatch: Dispatch<FilterMaintenanceAction>) => {
        dispatch({type: FilterMaintenanceActionTypes.SET_SERVICE_COMPANY_NAME, payload: value});
    }
}

export const setType = (value: number | null) => {
    return async (dispatch: Dispatch<FilterMaintenanceAction>) => {
        dispatch({type: FilterMaintenanceActionTypes.SET_TYPE, payload: value});
    }
}