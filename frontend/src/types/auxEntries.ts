import { AuxEntry, AuxEntries, Client, ServiceCompany } from "./api";

export interface AuxEntriesState {
    carModels: AuxEntry[];
    engineModels: AuxEntry[];
    transmissionModels: AuxEntry[];
    mainBridgeModels: AuxEntry[];
    steerableBridgeModels: AuxEntry[];
    maintenanceTypes: AuxEntry[];
    failureNodes: AuxEntry[];
    recoveryMethods: AuxEntry[];
    clients: Client[],
    serviceCompanies: ServiceCompany[],
    loading: boolean;
    error: null | string;
    isReady: Boolean;
}

export enum AuxEntriesActionTypes {
    FETCH_AUX_ENTRIES = "FETCFETCH_AUX_ENTRIES_CARS",
    FETCH_AUX_ENTRIES_SUCCESS = "FETCH_AUX_ENTRIES_SUCCESS",
    FETCH_AUX_ENTRIES_ERROR = "FETCH_AUX_ENTRIES_ERROR",
    RESET_AUX_ENTRIES = "RESET_AUX_ENTRIES",
}

interface AuxEntriesFetchAction {
    type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES;
}

interface AuxEntriesSuccessAction {
    type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES_SUCCESS;
    payload: AuxEntries;
}

interface AuxEntriesErrorAction {
    type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES_ERROR;
    payload: any;
}

interface AuxEntriesResetAction {
    type: AuxEntriesActionTypes.RESET_AUX_ENTRIES;
}

export type AuxEntriesAction = AuxEntriesFetchAction | AuxEntriesSuccessAction | AuxEntriesErrorAction | AuxEntriesResetAction;