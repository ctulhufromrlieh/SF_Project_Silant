import * as AccountActionCreators from "./account";
import * as AccountInfoActionCreators from "./accountInfo";
import * as AuxEntriesActionCreators from "./auxEntries";
import * as FilterCarActionCreators from "./filterCar";
import * as SimpleCarsActionCreators from "./simpleCars";
import * as CarsActionCreators from "./cars";

export default {
    ...AccountActionCreators,
    ...AccountInfoActionCreators,
    ...AuxEntriesActionCreators,
    ...FilterCarActionCreators,
    ...SimpleCarsActionCreators,
    ...CarsActionCreators,
}