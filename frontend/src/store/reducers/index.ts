import { combineReducers } from "redux";
import { accountReducer } from "./accountReducer";
import { accountInfoReducer } from "./accountInfoReducer";
import { AuxEntriesReducer } from "./auxEntriesReducer";
// import { histogramsReducer } from "./_histograms";
// import { docIdsReducer } from "./_docIds";
// import { documentsReducer } from "./_documents";
import { filterCarReducer } from "./filterCar";
import { filterMaintenanceReducer } from "./filterMaintenance";
import { filterReclamationReducer } from "./filterReclamation";
import { carsReducer } from "./cars";
import { simpleCarsReducer } from "./simpleCars";


export const rootReducer = combineReducers({
    account: accountReducer,
    accountInfo: accountInfoReducer,
    auxEntries: AuxEntriesReducer,
    // searchQuery: searchQueryReducer,
    filterCar: filterCarReducer,
    filterMaintenance: filterMaintenanceReducer,
    filterReclamation: filterReclamationReducer,
    simpleCars: simpleCarsReducer,
    cars: carsReducer,
    // histogram: histogramsReducer,
    // docIds: docIdsReducer,
    // documents: documentsReducer,
})

export type RootState = ReturnType<typeof rootReducer>;