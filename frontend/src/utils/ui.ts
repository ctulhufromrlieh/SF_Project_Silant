import { SelectOption } from "../components/UI/MyLabeledSelect/MyLabeledSelect";
import { AuxEntry } from "../types/api";

const AuxEntryToSelectOption = (auxEntry: AuxEntry): SelectOption => {
    return {
        value: String(auxEntry.id),
        caption: auxEntry.name,
    }
}

export const AuxEntriesToSelectOptions = (auxEntries: AuxEntry[]): SelectOption[] => {

    let res = auxEntries.map((auxEntry: AuxEntry) => AuxEntryToSelectOption(auxEntry));
    res.unshift({
        value: "",
        caption: "-",
    })
    
    return res;
}