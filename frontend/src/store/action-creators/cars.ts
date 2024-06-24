import { Dispatch } from "redux";
import { CarsAction, CarsActionTypes } from "../../types/cars";
import { RootState } from "../reducers";
// import { createHistogramRequestData } from "../../types/api";
import axios from "axios";
import { checkAuth } from "../../utils/auth";
import { baseAccUrl, baseApiUrl } from "../../types/api";

export const fetchCars = () => {
    return async (dispatch: Dispatch<CarsAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterCar = state.filterCar;

            // const searchQuery = getState().searchQuery;
            // const isReady = searchQuery.isReady;
            // if (!isReady) {
            //     return;
            // }

            // console.log("searchQuery.isReady", searchQuery.isReady);

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: CarsActionTypes.FETCH_CARS});

            // const data = createHistogramRequestData(searchQuery);

            // console.log("data: ", data);
            // console.log("before histograms");

            // let headers = null;
            // let url = "";
            // let params = null;
            // if (isLogined) {
            //     headers = {
            //         'Content-type': 'application/json',
            //         'Accept': 'application/json',
            //         'Authorization': 'Token ' + token
            //     }
            //     url = `${baseApiUrl}/cars`;
            //     params = filterCar;
            // } else {
            //     headers = {
            //         'Content-type': 'application/json',
            //         'Accept': 'application/json',
            //     }
            //     url = `${baseApiUrl}/simple_cars`;
            //     // params = filterCar;
            //     params = {
            //         "car_num": filterCar.car_num,
            //     }
            // }

            const response = await axios.get(`${baseApiUrl}/cars`, {headers: headers, params: filterCar});
            // const response = await axios.get(url, {headers: headers, params: params});
            // if (isLogined) {
            //     const response = await axios.get(`${baseAccUrl}/cars`, {headers: headers, params: filterCar});
            // } else {
            //     const response = await axios.get(`${baseAccUrl}/simple_cars`, {headers: headers, params: filterCar});
            // }
            // console.log("after histograms");
            // console.log("docIds response: ", response.data);
            dispatch({type: CarsActionTypes.FETCH_CARS_SUCCESS, payload: response.data})

            // console.log("response = ", response);
            // console.log("response.data = ", response.data);

            // navigate("/results")
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