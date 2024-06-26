import { combineReducers } from "redux";
import { accountReducer } from "./accountReducer";
import { accountInfoReducer } from "./accountInfoReducer";
import { AuxEntriesReducer } from "./auxEntriesReducer";
import { filterCarReducer } from "./filterCar";
import { filterMaintenanceReducer } from "./filterMaintenance";
import { filterReclamationReducer } from "./filterReclamation";
import { carsReducer } from "./cars";
import { simpleCarsReducer } from "./simpleCars";
import { maintenancesReducer } from "./maintenances";
import { reclamationsReducer } from "./reclamations";


export const rootReducer = combineReducers({
    account: accountReducer,
    accountInfo: accountInfoReducer,
    auxEntries: AuxEntriesReducer,
    filterCar: filterCarReducer,
    filterMaintenance: filterMaintenanceReducer,
    filterReclamation: filterReclamationReducer,
    simpleCars: simpleCarsReducer,
    cars: carsReducer,
    maintenances: maintenancesReducer,
    reclamations: reclamationsReducer,
})

export type RootState = ReturnType<typeof rootReducer>;