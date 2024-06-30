import React, { useEffect, useState } from "react";

import classes from "./UserPanelLogined.module.scss";
import commonClasses from "../../../styles/common.module.scss";
import MyModal from "../../../UI/MyModal/MyModal";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import Loader from "../../../UI/Loader/Loader";
import { useActions } from "../../../../hooks/useActions";
import { AccountType } from "../../../../types/api";


const UserPanelLogined: React.FC = () => {
    // const [loginWindowVisible, setLoginWindowVisible] = useState(false);

    const account = useTypedSelector(state => state.account);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const {loginUserReset} = useActions();

    const {fetchAccountInfo, fetchAuxEntries} = useActions();
    useEffect(() => {
        if (!account.loading) {
            // fetchAccountInfo(account.token);
            fetchAccountInfo();
            fetchAuxEntries();
        }
    }, [account.isLogined]);

    // return (
    //     <Loader />
    // );

    if (account.loading || accountInfo.loading) {
        return (
            <Loader />
        );
    }

    let accountTypeCaption = "";
    switch (accountInfo.accountType) {
        case AccountType.ACCOUNT_TYPE_ADMIN:
            accountTypeCaption = "Администратор"; break;
        case AccountType.ACCOUNT_TYPE_CLIENT:
            accountTypeCaption = "Клиент"; break;
        case AccountType.ACCOUNT_TYPE_MANAGER:
            accountTypeCaption = "Менеджер"; break;
        case AccountType.ACCOUNT_TYPE_SERVICE_COMPANY:
            accountTypeCaption = "Сервисная компания"; break;
    }

    if (!accountTypeCaption) {
        console.log("UserPanelLogined.render: wrong accountTypeCaption!")
    }

    return (
        <div className={classes.user_panel_logined}>
            <p>{accountInfo.name}</p>
            <p>{accountTypeCaption}</p>
            <p className={classes.logoff_link} onClick={() => loginUserReset()}>Выйти</p>
        </div>
    );
}

export default UserPanelLogined;