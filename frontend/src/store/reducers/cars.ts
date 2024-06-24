import { CarsAction, CarsActionTypes, CarsState } from "../../types/cars";

const initialState: CarsState = {
    items: [],
    loading: false,
    error: null,
}

export const carsReducer = (state = initialState, action: CarsAction): CarsState => {
    switch (action.type) {
        case CarsActionTypes.FETCH_CARS:
            return { loading: true, error: null, items: [] };
        case CarsActionTypes.FETCH_CARS_SUCCESS:
            return { loading: false, error: null, items: action.payload };
        case CarsActionTypes.FETCH_CARS_ERROR:
            console.log("FETCH_CARS_ERROR: ", action.payload);
            return { loading: false, error: action.payload, items: [] };
        case CarsActionTypes.RESET_CARS:
            return {loading: false, error: null, items: []};            
        default:
            return state;
    }
}
