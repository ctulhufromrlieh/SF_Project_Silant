import { MaintenancesAction, MaintenancesActionTypes, MaintenancesState } from "../../types/maintenances";

const initialState: MaintenancesState = {
    items: [],
    loading: false,
    error: null,
}

export const maintenancesReducer = (state = initialState, action: MaintenancesAction): MaintenancesState => {
    switch (action.type) {
        case MaintenancesActionTypes.FETCH_MAINTENANCES:
            return { loading: true, error: null, items: [] };
        case MaintenancesActionTypes.FETCH_MAINTENANCES_SUCCESS:
            return { loading: false, error: null, items: action.payload };
        case MaintenancesActionTypes.FETCH_MAINTENANCES_ERROR:
            return { loading: false, error: action.payload, items: [] };
        case MaintenancesActionTypes.RESET_MAINTENANCES:
            return {loading: false, error: null, items: []};            
        default:
            return state;
    }
}