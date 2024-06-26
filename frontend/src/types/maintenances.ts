import { Maintenance } from "./api";

export interface MaintenancesState {
    items: Maintenance[];
    loading: boolean;
    error: null | string;
}

export enum MaintenancesActionTypes {
    FETCH_MAINTENANCES = "FETCH_MAINTENANCES",
    FETCH_MAINTENANCES_SUCCESS = "FETCH_MAINTENANCES_SUCCESS",
    FETCH_MAINTENANCES_ERROR = "FETCH_MAINTENANCES_ERROR",
    RESET_MAINTENANCES = "RESET_MAINTENANCES",
}

interface MaintenancesFetchAction {
    type: MaintenancesActionTypes.FETCH_MAINTENANCES;
}

interface MaintenancesSuccessAction {
    type: MaintenancesActionTypes.FETCH_MAINTENANCES_SUCCESS;
    payload: Maintenance[];
}

interface MaintenancesErrorAction {
    type: MaintenancesActionTypes.FETCH_MAINTENANCES_ERROR;
    payload: any;
}

interface MaintenancesResetAction {
    type: MaintenancesActionTypes.RESET_MAINTENANCES;
}

export type MaintenancesAction = MaintenancesFetchAction | MaintenancesSuccessAction | MaintenancesErrorAction | MaintenancesResetAction;