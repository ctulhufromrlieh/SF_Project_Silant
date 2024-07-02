import React, { useState } from "react";

import classes from "./Header.module.scss";
import commonClasses from "../../styles/common.module.scss";

import imgLogo from "../../img/Header/logo.module.png";
import UserPanel from "./UserPanel/UserPanel";
import HeaderMenu from "./HeaderMenu/HeaderMenu";

const Header: React.FC = () => {

    return (
        <div className={classes.header_container}>
            <div className={classes.header}>
                <div className={classes.upper}>
                    <div className={classes.logo_div}><img src={imgLogo} alt="Site logo"/></div>
                    <div className={classes.header_title}>
                        <h1>+7-8352-20-12-09, telegram</h1>
                        </div>
                    <UserPanel />
                </div>
                <div className={classes.header_sub_title}>
                    <h2>текст: Электронная сервисная книжка "МойСилант"</h2>
                </div>
            </div>
            {/* <HeaderMenu/> */}
        </div>
    );
}

export default Header;