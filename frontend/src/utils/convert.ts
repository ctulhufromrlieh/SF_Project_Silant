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

export const numberOfNullToString = (value: number | null): string => {
    if (value === null) {
        return "";
    } else {
        return String(value);
    }
}