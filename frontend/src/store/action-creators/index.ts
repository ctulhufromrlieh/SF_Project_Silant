import * as AccountActionCreators from "./account";
import * as AccountInfoActionCreators from "./accountInfo";
import * as AuxEntriesActionCreators from "./auxEntries";
import * as FilterCarActionCreators from "./filterCar";
import * as FilterMaintenanceActionCreators from "./filterMaintenance";
import * as FilterReclamationActionCreators from "./filterReclamation";
import * as SimpleCarsActionCreators from "./simpleCars";
import * as CarsActionCreators from "./cars";
import * as MaintenanceActionCreators from "./maintenances";
import * as ReclamationActionCreators from "./reclamations";

export default {
    ...AccountActionCreators,
    ...AccountInfoActionCreators,
    ...AuxEntriesActionCreators,
    ...FilterCarActionCreators,
    ...FilterMaintenanceActionCreators,
    ...FilterReclamationActionCreators,
    ...SimpleCarsActionCreators,
    ...CarsActionCreators,
    ...MaintenanceActionCreators,
    ...ReclamationActionCreators,
}