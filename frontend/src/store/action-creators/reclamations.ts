import { Dispatch } from "redux";
import {ReclamationsAction, ReclamationsActionTypes } from "../../types/reclamations";
import { RootState } from "../reducers";
import axios from "axios";
import { checkAuth } from "../../utils/auth";
import { baseApiUrl } from "../../types/api";

export const fetchReclamations = () => {
    return async (dispatch: Dispatch<ReclamationsAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            // const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterReclamation = state.filterReclamation;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: ReclamationsActionTypes.FETCH_RECLAMATIONS});

            const response = await axios.get(`${baseApiUrl}/reclamations`, {headers: headers, params: filterReclamation});

            dispatch({type: ReclamationsActionTypes.FETCH_RECLAMATIONS_SUCCESS, payload: response.data})
        } catch (e) {
            console.log("fetchReclamations Error: ", e)
            dispatch({
                type: ReclamationsActionTypes.FETCH_RECLAMATIONS_ERROR, 
                payload: (e)
            })
        }
    }
}

export const resetReclamations = () => {
    return async (dispatch: Dispatch<ReclamationsAction>, getState: () => RootState) => {
        dispatch({type: ReclamationsActionTypes.RESET_RECLAMATIONS});
    }
}