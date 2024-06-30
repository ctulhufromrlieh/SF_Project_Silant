import { SelectOption } from "../components/UI/MyLabeledSelect/MyLabeledSelect";
import { Car, Maintenance, Reclamation } from "../types/api";

export const stringToNumberOrNull = (value: string): number | null => {
    try {
        return parseInt(value);
    } catch {
        return null;
    }
}

export const stringToNumber = (value: string): number => {
    return parseInt(value);
}

export const stringToNumberListed = (value: string, selectOptions: SelectOption[]): number => {
    let res = parseInt(value);
    if (selectOptions.filter(item => parseInt(item.value) == res).length > 0) {
        return res;
    } else {
        return parseInt(selectOptions[0].value);
    }
}

export const numberOrNullToString = (value: number | null): string => {
    if (value === null) {
        return "";
    } else {
        return String(value);
    }
}

export const deleteEmptyFileds = (obj: Object): Object => {
    let res = Object.fromEntries(Object.entries(obj).filter(
        ([k, v]) => (v != null) && (String(v).length > 0)
    ));

    return res;
    // let res: Object = obj;
    // for (const [key, value] of Object.entries(obj)) {

    //     res[key] = value;
    // }
}

export const excludeCarBadFields = (car: Car): Object => {
    let res = car;

    res["car_model__name"] = "";
    res["engine_model__name"] = "";
    res["transmission_model__name"] = "";
    res["main_bridge_model__name"] = "";
    res["steerable_bridge_model__name"] = "";
    res["client__name"] = "";
    res["service_company__name"] = "";

    return deleteEmptyFileds(res);
}

export const excludeMaintenanceBadFields = (maintenance: Maintenance): Object => {
    let res = maintenance;

    res["car__num"] = "";
    res["type__name"] = "";
    res["service_company__name"] = "";
    if (res["service_company"] == -1) {
        res["service_company"] = null;
    }

    return deleteEmptyFileds(res);
}

export const excludeReclamationBadFields = (reclamation: Reclamation): Object => {
    let res = reclamation;

    // res["car_model__name"] = "";
    // res["engine_model__name"] = "";
    // res["transmission_model__name"] = "";
    // res["main_bridge_model__name"] = "";
    // res["steerable_bridge_model__name"] = "";
    // res["client__name"] = "";
    // res["service_company__name"] = "";

    return deleteEmptyFileds(res);
}

export const dateTimeToDate = (dateTime: string): string => {
    return dateTime.split("T")[0];
}