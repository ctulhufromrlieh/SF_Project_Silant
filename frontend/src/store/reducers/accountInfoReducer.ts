import { AccountInfoAction, AccountInfoActionTypes, AccountInfoState } from "../../types/accountInfo";
import { AccountType } from "../../types/api";

const initialState: AccountInfoState = {
    accountType: AccountType.ACCOUNT_TYPE_OTHER,
    name: null,
    username: null,
    loading: false,
    error: null,
}

export const accountInfoReducer = (state = initialState, action: AccountInfoAction): AccountInfoState => {
    switch (action.type) {
        case AccountInfoActionTypes.FETCH_ACCOUNT_INFO:
            return { loading: true, error: null, accountType: AccountType.ACCOUNT_TYPE_OTHER, name: null, username: null };
        case AccountInfoActionTypes.FETCH_ACCOUNT_INFO_SUCCESS:
            return { loading: false, error: null, accountType: action.payload.account_type, name: action.payload.name, username: action.payload.username };
        case AccountInfoActionTypes.FETCH_ACCOUNT_INFO_ERROR:
            console.log(action.payload);
            return { loading: false, error: action.payload, accountType: AccountType.ACCOUNT_TYPE_OTHER, name: null, username: null };
        default:
            return state;
    }
}
