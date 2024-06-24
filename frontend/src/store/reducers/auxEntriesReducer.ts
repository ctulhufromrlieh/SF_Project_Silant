import { AuxEntriesAction, AuxEntriesActionTypes, AuxEntriesState } from "../../types/auxEntries";

const initialState: AuxEntriesState = {
    carModels: [],
    engineModels: [],
    transmissionModels: [],
    mainBridgeModels: [],
    steerableBridgeModels: [],
    maintenanceTypes: [],
    failureNodes: [],
    recoveryMethods: [],
    loading: false,
    error: null,
}

export const AuxEntriesReducer = (state = initialState, action: AuxEntriesAction): AuxEntriesState => {
    switch (action.type) {
        case AuxEntriesActionTypes.FETCH_AUX_ENTRIES:
            return { ...initialState, loading: true, error: null, };
        case AuxEntriesActionTypes.FETCH_AUX_ENTRIES_SUCCESS:
            return { ...action.payload,  loading: false, error: null, };
        case AuxEntriesActionTypes.FETCH_AUX_ENTRIES_ERROR:
            // console.log("FETCH_AUX_ENTRIES_ERROR: ", action.payload);
            return { ...initialState, loading: false, error: action.payload, };
        case AuxEntriesActionTypes.RESET_AUX_ENTRIES:
            return initialState;
        default:
            return state;
    }
}
