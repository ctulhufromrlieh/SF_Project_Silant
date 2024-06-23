import React, { useState } from "react";

import classes from "./UserPanel.module.scss";
import commonClasses from "../../../styles/common.module.scss";
import MyModal from "../../UI/MyModal/MyModal";
import LoginWindow from "./UserPanelAnonymous/LoginWindow/LoginWindow";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import UserPanelAnonymous from "./UserPanelAnonymous/UserPanelAnonymous";
import UserPanelLogined from "./UserPanelLogined/UserPanelLogined";



const UserPanel: React.FC = () => {
    const [loginWindowVisible, setLoginWindowVisible] = useState(false);

    const account = useTypedSelector(state => state.account);
    const accountInfo = useTypedSelector(state => state.accountInfo);

    if (account.isLogined) {
        return (
            <UserPanelLogined />
        );
    } else {
        return (
            <UserPanelAnonymous />
        );
    }

    // return (
    //     <div>
    //         <div>
    //             <p className={classes.authorize_link} onClick={() => setLoginWindowVisible(true)}>авторизация</p>
    //         </div>
    //         <MyModal visible={loginWindowVisible} setVisible={setLoginWindowVisible} contentClassName={classes.menu_background}>
    //             <LoginWindow setVisible={setLoginWindowVisible} />
    //         </MyModal> 
    //         {/* <div className={classes.header}>
    //             <div className={classes.upper}>
    //                 <div className={classes.logo_div}><img src={imgLogo} alt="Site logo"/></div>
    //                 <div>+7-8352-20-12-09, telegram </div>
    //                 <div onClick={() => setLoginWindowVisible(true)}>авторизация</div>
    //             </div>
    //             <div>
    //                 текст: Электронная сервисная книжка "МойСилант"
    //             </div>
    //         </div>
    //         <MyModal visible={loginWindowVisible} setVisible={setLoginWindowVisible} contentClassName={classes.menu_background}>
    //             <LoginWindow setVisible={setLoginWindowVisible} />
    //         </MyModal> */}
    //     </div>
    // );
}

export default UserPanel;