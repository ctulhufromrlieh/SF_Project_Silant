import { ReclamationsAction, ReclamationsActionTypes, ReclamationsState } from "../../types/reclamations";

const initialState: ReclamationsState = {
    items: [],
    loading: false,
    error: null,
}

export const reclamationsReducer = (state = initialState, action: ReclamationsAction): ReclamationsState => {
    switch (action.type) {
        case ReclamationsActionTypes.FETCH_RECLAMATIONS:
            return { loading: true, error: null, items: [] };
        case ReclamationsActionTypes.FETCH_RECLAMATIONS_SUCCESS:
            return { loading: false, error: null, items: action.payload };
        case ReclamationsActionTypes.FETCH_RECLAMATIONS_ERROR:
            return { loading: false, error: action.payload, items: [] };
        case ReclamationsActionTypes.RESET_RECLAMATIONS:
            return {loading: false, error: null, items: []};            
        default:
            return state;
    }
}