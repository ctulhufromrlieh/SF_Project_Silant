import React, { useState } from "react";

import classes from "./UserPanelAnonymous.module.scss";
import commonClasses from "../../../styles/common.module.scss";
import MyModal from "../../../UI/MyModal/MyModal";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import LoginWindow from "./LoginWindow/LoginWindow";


const UserPanelAnonymous: React.FC = () => {
    const [loginWindowVisible, setLoginWindowVisible] = useState(false);

    return (
        <div>
            <div>
                <p className={classes.authorize_link} onClick={() => setLoginWindowVisible(true)}>авторизация</p>
            </div>
            <MyModal visible={loginWindowVisible} setVisible={setLoginWindowVisible} contentClassName={classes.menu_background}>
                <LoginWindow setVisible={setLoginWindowVisible} />
            </MyModal> 
        </div>
    );
}

export default UserPanelAnonymous;