import { AccountType } from "../types/api"

export enum ModelType {
    MODEL_TYPE_CAR = "MODEL_TYPE_CAR",
    MODEL_TYPE_MAINTENANCE = "MODEL_TYPE_MAINTENANCE",
    MODEL_TYPE_RECLAMATION = "MODEL_TYPE_RECLAMATION",
}

export const isAllowedChange = (modelType: ModelType, accountType: AccountType): boolean => {
    switch (modelType) {
        case ModelType.MODEL_TYPE_CAR:
            return [AccountType.ACCOUNT_TYPE_ADMIN, AccountType.ACCOUNT_TYPE_MANAGER].includes(accountType);
        case ModelType.MODEL_TYPE_MAINTENANCE:
            return [AccountType.ACCOUNT_TYPE_ADMIN, AccountType.ACCOUNT_TYPE_MANAGER, AccountType.ACCOUNT_TYPE_CLIENT, 
                AccountType.ACCOUNT_TYPE_SERVICE_COMPANY].includes(accountType);
        case ModelType.MODEL_TYPE_RECLAMATION:
            case ModelType.MODEL_TYPE_MAINTENANCE:
                return [AccountType.ACCOUNT_TYPE_ADMIN, AccountType.ACCOUNT_TYPE_MANAGER, 
                    AccountType.ACCOUNT_TYPE_SERVICE_COMPANY].includes(accountType);
        default:
            throw new Error("isAllowedChange: wrong modelType!")
    }
}