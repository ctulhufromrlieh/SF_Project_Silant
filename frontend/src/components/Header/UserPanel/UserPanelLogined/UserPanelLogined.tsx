import React, { useEffect, useState } from "react";

import classes from "./UserPanelLogined.module.scss";
// import commonClasses from "../../../styles/common.module.scss";
// import MyModal from "../../../UI/MyModal/MyModal";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import Loader from "../../../UI/Loader/Loader";
import { useActions } from "../../../../hooks/useActions";
// import { AccountType } from "../../../../types/api";
import { getAccountTypeCaption } from "../../../../types/accountInfo";


const UserPanelLogined: React.FC = () => {
    // const [loginWindowVisible, setLoginWindowVisible] = useState(false);

    const account = useTypedSelector(state => state.account);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const {loginUserReset} = useActions();

    // const {fetchAccountInfo, fetchAuxEntries} = useActions();
    // useEffect(() => {
    //     if (accountInfo.ready) {
    //         // fetchAccountInfo(account.token);
    //         // fetchAccountInfo();
    //         fetchAuxEntries();
    //     }
    // }, [account.isLogined, accountInfo.accountType]);

    // return (
    //     <Loader />
    // );

    if (account.loading || accountInfo.loading) {
        return (
            <Loader />
        );
    }

    const accountTypeCaption = getAccountTypeCaption(accountInfo.accountType);

    return (
        <div className={classes.user_panel_logined}>
            <div className={classes.account_data}>
                <p className={classes.name} >{accountInfo.name}</p>
                <p className={classes.caption} >{accountTypeCaption}</p>
            </div>
            <p className={classes.logoff_link} onClick={() => loginUserReset()}>Выйти</p>
        </div>
    );
}

export default UserPanelLogined;