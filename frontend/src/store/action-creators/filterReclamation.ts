import { Dispatch } from "redux"
import { FilterReclamationAction, FilterReclamationActionTypes } from "../../types/filterReclamation"


export const setCarNum = (value: string) => {
    return async (dispatch: Dispatch<FilterReclamationAction>) => {
        dispatch({type: FilterReclamationActionTypes.SET_CAR_NUM, payload: value});
    }
}

export const setServiceCompanyName = (value: string) => {
    return async (dispatch: Dispatch<FilterReclamationAction>) => {
        dispatch({type: FilterReclamationActionTypes.SET_SERVICE_COMPANY_NAME, payload: value});
    }
}

export const setFailureNode = (value: number | null) => {
    return async (dispatch: Dispatch<FilterReclamationAction>) => {
        dispatch({type: FilterReclamationActionTypes.SET_FAILURE_NODE, payload: value});
    }
}

export const setRecoveryMethod = (value: number | null) => {
    return async (dispatch: Dispatch<FilterReclamationAction>) => {
        dispatch({type: FilterReclamationActionTypes.SET_RECOVERY_METHOD, payload: value});
    }
}