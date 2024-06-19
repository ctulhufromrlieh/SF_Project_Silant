import { Dispatch } from "redux";
import axios from "axios";
// import { AccountInfoAction, AccountInfoActionTypes } from "../../types/accountInfo";
import { checkAuth } from "../../utils/auth";
import { baseAccUrl } from "../../types/api";
import { AccountInfoAction, AccountInfoActionTypes } from "../../types/accountInfo";
// import { Action, BalanceActionTypes } from "../../types/balance";

export const fetchAccountInfo = (accessToken: string) => {
    return async (dispatch: Dispatch<AccountInfoAction>) => {
        try {
            checkAuth();

            const headers = {
              'Content-type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Token ' + accessToken
            }

            dispatch({type: AccountInfoActionTypes.FETCH_ACCOUNT_INFO})
            // const response = await axios.get('https://gateway.scan-interfax.ru/api/v1/account/info', {headers: headers});
            const response = await axios.get(`${baseAccUrl}/account_info`, {headers: headers});
            
            dispatch({type: AccountInfoActionTypes.FETCH_ACCOUNT_INFO_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({
                type: AccountInfoActionTypes.FETCH_ACCOUNT_INFO_ERROR, 
                payload: <string>(e)
            })
        }
    }
}