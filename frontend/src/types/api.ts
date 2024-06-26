export const baseUrl: string = 'http://localhost:8000';
export const baseApiUrl: string = `${baseUrl}/api/v1`;
export const baseAccUrl: string = `${baseUrl}/api/accounts`;
export const localStorageIdToken = 'silant_account_accessToken';

export interface LoginResponseData {
    // accessToken: string;
    // expire: string;
    token: string;
}

export enum AccountType {
    ACCOUNT_TYPE_CLIENT = "ACCOUNT_TYPE_CLIENT",
    ACCOUNT_TYPE_SERVICE_COMPANY = "ACCOUNT_TYPE_SERVICE_COMPANY",
    ACCOUNT_TYPE_MANAGER = "ACCOUNT_TYPE_MANAGER",
    ACCOUNT_TYPE_ADMIN = "ACCOUNT_TYPE_ADMIN",
    ACCOUNT_TYPE_OTHER = "ACCOUNT_TYPE_OTHER",
}

export interface AccountInfoResponseData {
    account_type: AccountType;
    name: string;
    username: string;
}

// export interface ReferenceBookRecord {
//     id: number;
//     name: string;
//     description: string;
// }

export enum AuxEntryType {
    AUX_ENTRY_TYPE_CAR_MODEL = "AUX_ENTRY_TYPE_CAR_MODEL",
    AUX_ENTRY_TYPE_ENGINE_MODEL = "AUX_ENTRY_TYPE_ENGINE_MODEL",
    AUX_ENTRY_TYPE_TRANSMISSION_MODEL = "AUX_ENTRY_TYPE_TRANSMISSION_MODEL",
    AUX_ENTRY_TYPE_MAIN_BRIDGE_MODEL = "AUX_ENTRY_TYPE_MAIN_BRIDGE_MODEL",
    AUX_ENTRY_TYPE_STEERABLE_BRIDGE_MODEL = "AUX_ENTRY_TYPE_STEERABLE_BRIDGE_MODEL",
    AUX_ENTRY_TYPE_MAINTENANCE_TYPE = "AUX_ENTRY_TYPE_MAINTENANCE_TYPE",
    AUX_ENTRY_TYPE_FAILURE_NODE = "AUX_ENTRY_TYPE_FAILURE_NODE",
    AUX_ENTRY_TYPE_RECOVERY_METHOD = "AUX_ENTRY_TYPE_RECOVERY_METHOD",
}

export interface AuxEntry {
    type: AuxEntryType;
    id: number;
    name: string;
    description: string;
}

export interface AuxEntries {
    carModels: AuxEntry[];
    engineModels: AuxEntry[];
    transmissionModels: AuxEntry[];
    mainBridgeModels: AuxEntry[];
    steerableBridgeModels: AuxEntry[];
    maintenanceTypes: AuxEntry[];
    failureNodes: AuxEntry[];
    recoveryMethods: AuxEntry[];
}

export interface SimpleCar {
    id: number;
    car_model__name: string;
    car_num: string;
    engine_model__name: string;
    engine_num: string;
    transmission_model__name: string;
    transmission_num: string;
    main_bridge_model__name: string;
    main_bridge_num: string;
    steerable_bridge_model__name: string;
    steerable_bridge_num: string;
}

export interface Car {
    id: number;
    car_model: number;
    car_model__name: string;
    car_num: string;
    engine_model: number;
    engine_model__name: string;
    engine_num: string;
    transmission_model: number;
    transmission_model__name: string;
    transmission_num: string; 
    main_bridge_model: number;
    main_bridge_model__name: string;
    main_bridge_num: string;
    steerable_bridge_model: number;
    steerable_bridge_model__name: string;
    steerable_bridge_num: string; 
    supply_agreement: string;
    factory_shipment_date: string;
    consignee: string;
    shipment_address: string;
    add_options: string;
    client: number;
    client__name: string;
    service_company: number;
    service_company__name: string;
}

export interface Maintenance {
    id: number;
    car: number;
    car__num: string;
    type: number;
    type__name: string;
    maintenance_date: string;
    operating_time: number; 
    work_order_num: string;
    work_order_date: string;
    service_company: number;
    service_company__name: string;
}

export interface Reclamation {
    id: number;
    car: number;
    car__num: string;
    car__service_company__id: number;
    car__service_company__name: string;
    failure_date: string;
    // operating_time: string;
    operating_time: number; 
    failure_node: number;
    failure_node__name: string;
    failure_description: string;
    recovery_method: number;
    recovery_method__name: string;
    repair_parts: string;
    recovery_date: string;
    downtime: number;
}