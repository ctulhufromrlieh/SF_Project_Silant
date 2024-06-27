import { SelectOption } from "../components/UI/MyLabeledSelect/MyLabeledSelect";
import { AuxEntry } from "../types/api";

const AuxEntryToSelectOption = (auxEntry: AuxEntry): SelectOption => {
    return {
        value: String(auxEntry.id),
        caption: auxEntry.name,
    }
}

export const AuxEntriesToSelectOptions = (auxEntries: AuxEntry[], hasEmpty: Boolean): SelectOption[] => {

    let res = auxEntries.map((auxEntry: AuxEntry) => AuxEntryToSelectOption(auxEntry));
    if (hasEmpty) {
        res.unshift({
            value: "",
            caption: "-",
        });
    }
    
    return res;
}