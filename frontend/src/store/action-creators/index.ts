import * as AccountActionCreators from "./account";
// import * as BalanceActionCreators from "./balance";
import * as AccountInfoActionCreators from "./accountInfo";
import * as SearchQueryActionCreators from "./filterCar";
// import * as HistogramsActionCreators from "./histograms";
// import * as DocIdsActionCreators from "./docIds";
// import * as DocumentsActionCreators from "./documents";

export default {
    ...AccountActionCreators,
    // ...BalanceActionCreators,
    ...AccountInfoActionCreators,
    ...SearchQueryActionCreators,
    // ...HistogramsActionCreators,
    // ...DocIdsActionCreators,
    // ...DocumentsActionCreators,
}