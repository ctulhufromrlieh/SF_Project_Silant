import React from "react";

import classes from "./HeaderMenu.module.scss";
import { Link } from "react-router-dom";
import { auxEntryRoutes, privateRoutes, publicRoutes } from "../../../router";
import Navbar from "../../UI/Navbar/Navbar";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { RouteData } from "../../../types/common";
import { ModelType, isAllowedChange } from "../../../utils/permissions";
import Loader from "../../UI/Loader/Loader";

// interface HeaderMenuData {
//     items: string[];
//     className?: string;
// }

// interface HeaderMenuProps {
//     isLogined: boolean;
// }

// const HeaderMenu: React.FC<HeaderMenuProps> = ({isLogined}) => {
const HeaderMenu: React.FC = () => {
    const {isLogined} = useTypedSelector(state => state.account);
    const accountInfo = useTypedSelector(state => state.accountInfo);

    if (!isLogined) {
        return null;
    }

    if (accountInfo.loading) {
        return <Loader/>;
    }

    // let usedRoutes = [];
    // if (isLogined) {
    //     usedRoutes = privateRoutes;
    // } else {
    //     usedRoutes = publicRoutes;
    // }

    // // const usedRoutes = privateRoutes;
    // const usedRoutes = [...privateRoutes, ...auxEntryRoutes];
    let usedRoutes: RouteData[] = [...privateRoutes];
    if (isAllowedChange(ModelType.MODEL_TYPE_AUX_ENTRY, accountInfo.accountType)) {
        usedRoutes = [...usedRoutes, ...auxEntryRoutes];
    }

    return (
        <Navbar routes={usedRoutes} listClassName={classes.menu} itemClassName={classes.item} />
    );
}

export default HeaderMenu;