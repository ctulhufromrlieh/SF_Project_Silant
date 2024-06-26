import { Reclamation } from "./api";

export interface ReclamationsState {
    items: Reclamation[];
    loading: boolean;
    error: null | string;
}

export enum ReclamationsActionTypes {
    FETCH_RECLAMATIONS = "FETCH_RECLAMATIONS",
    FETCH_RECLAMATIONS_SUCCESS = "FETCH_RECLAMATIONS_SUCCESS",
    FETCH_RECLAMATIONS_ERROR = "FETCH_RECLAMATIONS_ERROR",
    RESET_RECLAMATIONS = "RESET_RECLAMATIONS",
}

interface ReclamationsFetchAction {
    type: ReclamationsActionTypes.FETCH_RECLAMATIONS;
}

interface ReclamationsSuccessAction {
    type: ReclamationsActionTypes.FETCH_RECLAMATIONS_SUCCESS;
    payload: Reclamation[];
}

interface ReclamationsErrorAction {
    type: ReclamationsActionTypes.FETCH_RECLAMATIONS_ERROR;
    payload: any;
}

interface ReclamationsResetAction {
    type: ReclamationsActionTypes.RESET_RECLAMATIONS;
}

export type ReclamationsAction = ReclamationsFetchAction | ReclamationsSuccessAction | ReclamationsErrorAction | ReclamationsResetAction;