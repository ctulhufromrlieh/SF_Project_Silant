import { Exception } from "sass";

export enum SortMethod {
    SORT_METHOD_NONE = "SORT_METHOD_NONE",
    SORT_METHOD_ASC = "SORT_METHOD_ASC",
    SORT_METHOD_DESC = "SORT_METHOD_DESC",
}

export interface SortElement {
    propName: string,
    sortMethod: SortMethod,
}

export const nextSortMethod = (value: SortMethod): SortMethod => {
    switch (value) {
        case SortMethod.SORT_METHOD_NONE:
            return SortMethod.SORT_METHOD_ASC;
        case SortMethod.SORT_METHOD_ASC:
            return SortMethod.SORT_METHOD_DESC;
        case SortMethod.SORT_METHOD_DESC:
            return SortMethod.SORT_METHOD_NONE;
        default:
            throw new Error("nextSortMethod: Wrong value!")
    }
}

export type SortProc = (value: SortMethod) => void;
export type ChangeSortTypeProc = (propName: string, sortMethod: SortMethod, ) => void;

export const getSortMethod = (sortElements: SortElement[], propName: string): SortMethod => {
    const foundElems = sortElements.filter(elem => elem.propName == propName);
    if (foundElems.length == 0){
        return SortMethod.SORT_METHOD_NONE;
    } else {
        return foundElems[0].sortMethod;
    }
}

type SortFunc<T> = (a: T, b: T) => number;

// export const sortObjects = (objects: Object[], sortElements: SortElement[], propNames: string[]): Object[] => {
//     let sortFuncs: SortFunc[] = [];
    
//     propNames.forEach(currPropName => {
//         const currSortMethod = getSortMethod(sortElements, currPropName);
//         if (currSortMethod === SortMethod.SORT_METHOD_ASC) {
//             sortFuncs.push(
//                 (a: Object, b: Object): number => {
//                     if ((currPropName in a) && (currPropName in b)) {
//                         const currPropA = Object(a)[currPropName];
//                         const currPropB = Object(b)[currPropName];
//                         if (typeof currPropA === 'string') {
//                             return String(currPropA).localeCompare(String(currPropB));
//                         } else {
//                             return currPropA - currPropB;
//                         }
//                     } else {
//                         throw new Error("sortObjects: has not property!");
//                     }
//                 }
//             );
//         }
//     });

//     const sortFuncWithFuncs = (a: Object, b: Object, funcs: SortFunc[]): number => {
//         if (funcs.length == 0) {
//             return 0;
//         }

//         const func1 = funcs[0];
//         const otherfuncs = funcs.slice(1);
//         const check1 = func1(a, b);
//         if (check1 == 0) {
//             return sortFuncWithFuncs(a, b, otherfuncs);
//         } else {
//             return check1;
//         }
//     }

//     const megaSort = (a: Object, b: Object): number => {
//         return sortFuncWithFuncs(a, b, sortFuncs);
//     }

//     return objects.sort(megaSort);
// }

export function cloneObjects<T>(objects: T[]): T[] {
    let res: T[] = [];
    objects.forEach(srcElem =>
        res.push(Object.assign({}, srcElem))
    );

    return res;
}

// export function sortObjects<T>(objects: T[], sortElements: SortElement[], propNames: string[]): T[] {
//     let sortFuncs: SortFunc<T>[] = [];
//     // let res = objects;
//     let res = cloneObjects(objects);
    
//     propNames.forEach(currPropName => {
//         const currSortMethod = getSortMethod(sortElements, currPropName);
//         if (currSortMethod === SortMethod.SORT_METHOD_ASC) {
//             sortFuncs.push(
//                 (a: T, b: T): number => {
//                     // if ((currPropName in a) && (currPropName in b)) {
//                     // if ((currPropName in Object(a)) && (currPropName in Object(b))) {                    
//                     {
//                         const currPropA = Object(a)[currPropName];
//                         const currPropB = Object(b)[currPropName];
//                         let check = currPropA - currPropB;
//                         // if (typeof currPropA === 'string') {
//                         //     return String(currPropA).localeCompare(String(currPropB));
//                         // } else {
//                         //     return currPropA - currPropB;
//                         // }
                        
//                         if (typeof currPropA === 'string') {
//                             check = String(currPropA).localeCompare(String(currPropB));
//                         }

//                         return check;
//                     }
//                     // } else {
//                     //     throw new Error("sortObjects: has not property!");
//                     // }
//                 }
//             );
//         }
//     });

//     const sortFuncWithFuncs = (a: T, b: T, funcs: SortFunc<T>[]): number => {
//         if (funcs.length == 0) {
//             return 0;
//         }

//         const func1 = funcs[0];
//         const otherfuncs = funcs.slice(1);
//         const check1 = func1(a, b);
//         if (check1 == 0) {
//             return sortFuncWithFuncs(a, b, otherfuncs);
//         } else {
//             return check1;
//         }
//     }

//     const megaSort = (a: T, b: T): number => {
//         return sortFuncWithFuncs(a, b, sortFuncs);
//     }

//     res = res.sort(megaSort);

//     return res;
// }

export function sortObjects<T>(objects: T[], sortElements: SortElement[], propNames: string[]): T[] {
    let sortFuncs: SortFunc<T>[] = [];
    let res = cloneObjects(objects);
    
    propNames.forEach(currPropName => {
        const currSortMethod = getSortMethod(sortElements, currPropName);
        if (currSortMethod === SortMethod.SORT_METHOD_ASC) {
            sortFuncs.push(
                (a: T, b: T): number => {

                    const currPropA = Object(a)[currPropName];
                    const currPropB = Object(b)[currPropName];
                    let check = currPropA - currPropB;
                    
                    if (typeof currPropA === 'string') {
                        check = String(currPropA).localeCompare(String(currPropB));
                    }

                    return check;
                }
            );
        } else if (currSortMethod === SortMethod.SORT_METHOD_DESC) {
            sortFuncs.push(
                (a: T, b: T): number => {

                    const currPropA = Object(a)[currPropName];
                    const currPropB = Object(b)[currPropName];
                    let check = currPropA - currPropB;
                    
                    if (typeof currPropA === 'string') {
                        check = String(currPropA).localeCompare(String(currPropB));
                    }

                    return -check;
                }
            );
        }
    });

    // console.log("sortfuncs = ", sortFuncs);

    const sortFuncWithFuncs = (a: T, b: T, funcs: SortFunc<T>[]): number => {
        if (funcs.length == 0) {
            return 0;
        }

        const func1 = funcs[0];
        const otherfuncs = funcs.slice(1);
        const check1 = func1(a, b);

        // console.log("sortFuncWithFuncs:");
        // console.log("a = ", a);
        // console.log("b = ", b);
        // console.log("check1 = ", check1);

        if (check1 == 0) {
            return sortFuncWithFuncs(a, b, otherfuncs);
        } else {
            return check1;
        }
    }

    const megaSort = (a: T, b: T): number => {
        return sortFuncWithFuncs(a, b, sortFuncs);
    }

    res = res.sort(megaSort);

    // console.log("sortObjects: res = ", res);

    return res;
}