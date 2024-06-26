import { Dispatch } from "redux";
import { CarsAction, CarsActionTypes } from "../../types/cars";
import { RootState } from "../reducers";
import axios from "axios";
import { checkAuth } from "../../utils/auth";
import { baseApiUrl } from "../../types/api";

export const fetchCars = () => {
    return async (dispatch: Dispatch<CarsAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            // const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterCar = state.filterCar;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: CarsActionTypes.FETCH_CARS});

            const response = await axios.get(`${baseApiUrl}/cars`, {headers: headers, params: filterCar});
            dispatch({type: CarsActionTypes.FETCH_CARS_SUCCESS, payload: response.data})
        } catch (e) {
            console.log("fetchCars Error: ", e)
            dispatch({
                type: CarsActionTypes.FETCH_CARS_ERROR, 
                payload: (e)
            })
        }
    }
}

export const resetCars = () => {
    return async (dispatch: Dispatch<CarsAction>, getState: () => RootState) => {
        dispatch({type: CarsActionTypes.RESET_CARS});
    }
}