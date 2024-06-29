import React, { useState } from "react";

import classes from "./Header.module.scss";
import commonClasses from "../../styles/common.module.scss";

import imgLogo from "../../img/Header/logo.module.png";
import UserPanel from "./UserPanel/UserPanel";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
// import LoginWindow from "./UserPanel/LoginWindow/LoginWindow";
// import MyModal from "../UI/MyModal/MyModal";

const Header: React.FC = () => {

    return (
        <div>
            <div className={classes.header}>
                <div className={classes.upper}>
                    <div className={classes.logo_div}><img src={imgLogo} alt="Site logo"/></div>
                    <div>+7-8352-20-12-09, telegram </div>
                    <UserPanel />
                    {/* <div onClick={() => setLoginWindowVisible(true)}>авторизация</div> */}
                </div>
                <div className={classes.lower}>
                    текст: Электронная сервисная книжка "МойСилант"
                </div>
            </div>
            <HeaderMenu/>
            {/* <MyModal visible={loginWindowVisible} setVisible={setLoginWindowVisible} contentClassName={classes.menu_background}>
                <LoginWindow setVisible={setLoginWindowVisible} />
            </MyModal> */}
        </div>
    );
}

export default Header;