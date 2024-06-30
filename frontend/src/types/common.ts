export enum SingleElemMethod {
    SINGLE_ELEM_METHOD_VIEW = "SINGLE_ELEM_METHOD_VIEW",
    SINGLE_ELEM_METHOD_UPDATE = "SINGLE_ELEM_METHOD_UPDATE",
    SINGLE_ELEM_METHOD_CREATE = "SINGLE_ELEM_METHOD_CREATE",
}

export interface RouteData {
    path: string;
    caption: string;
    component: React.FC;
    isVisible?: boolean;
}