// import { Dispatch } from "redux";
// import { UserAction, UserActionTypes, UserState } from "../../types/user";

import { AccountAction, AccountActionTypes, AccountState } from "../../types/account";


const initialState: AccountState = {
    isLogined: false,
    accessToken: "",
    // expire: null,
    // loading: false,
    loading: true,
    error: null,
}

export const accountReducer = (state = initialState, action: AccountAction): AccountState => {
    switch (action.type) {
        case AccountActionTypes.LOGIN_USER:
            return { loading: true, error: null, isLogined: false, accessToken: "" };
        case AccountActionTypes.LOGIN_USER_SUCCESS:
            return { loading: false, error: null, isLogined: true, accessToken: action.payload.accessToken };
        case AccountActionTypes.LOGIN_USER_ERROR:
            console.log(action.payload);
            return { loading: false, error: action.payload, isLogined: false, accessToken: "" };
        case AccountActionTypes.LOGIN_USER_RESET:
            return { loading: false, error: null, isLogined: false, accessToken: "" };
        default:
            return state;
    }
}
