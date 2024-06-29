import React from "react";

import classes from "./HeaderMenu.module.scss";
import { Link } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../../../router";
import Navbar from "../../UI/Navbar/Navbar";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

// interface HeaderMenuData {
//     items: string[];
//     className?: string;
// }

// interface HeaderMenuProps {
//     isLogined: boolean;
// }

// const HeaderMenu: React.FC<HeaderMenuProps> = ({isLogined}) => {
const HeaderMenu: React.FC = () => {
    const {isLogined} = useTypedSelector(state => state.account)

    if (!isLogined) {
        return null;
    }

    // let usedRoutes = [];
    // if (isLogined) {
    //     usedRoutes = privateRoutes;
    // } else {
    //     usedRoutes = publicRoutes;
    // }

    const usedRoutes = privateRoutes;

    return (
        <Navbar routes={usedRoutes} listClassName={classes.menu} itemClassName={classes.item} />
    );
}

export default HeaderMenu;