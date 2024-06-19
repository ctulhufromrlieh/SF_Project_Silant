import { combineReducers } from "redux";
import { accountReducer } from "./accountReducer";
import { accountInfoReducer } from "./accountInfoReducer";
// import { histogramsReducer } from "./_histograms";
// import { docIdsReducer } from "./_docIds";
// import { documentsReducer } from "./_documents";
import { filterCarReducer } from "./filterCar";
import { filterMaintenanceReducer } from "./filterMaintenance";
import { filterReclamationReducer } from "./filterReclamation";


export const rootReducer = combineReducers({
    account: accountReducer,
    accountInfo: accountInfoReducer,
    // searchQuery: searchQueryReducer,
    filterCar: filterCarReducer,
    filterMaintenance: filterMaintenanceReducer,
    filterReclamation: filterReclamationReducer,
    // histogram: histogramsReducer,
    // docIds: docIdsReducer,
    // documents: documentsReducer,
})

export type RootState = ReturnType<typeof rootReducer>;