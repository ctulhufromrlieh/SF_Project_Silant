import React, { useContext, useEffect } from "react";
// import About from "../pages/About";
// import Posts from "../pages/Posts";
import { Navigate, Route, Routes } from "react-router-dom";
// import Error from "../pages/Error";
// import PostIdPage from "../pages/PostIdPage";
import { auxEntryRoutes, privateRoutes, publicRoutes } from "../router";
// import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { AccountType } from "../types/api";
import { RouteData } from "../types/common";
import { ModelType, isAllowedChange } from "../utils/permissions";
const AppRouter = () => {
    // const {token, loading, isLogined} = useTypedSelector(state => state.account);
    // const {loading, isLogined} = useTypedSelector(state => state.account);
    const account = useTypedSelector(state => state.account);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    // const { fetchAccountInfo } = useActions();
    
    // useEffect(() => {
    //     if (!accountInfo.ready && !accountInfo.loading && !accountInfo.error) {
    //         fetchAccountInfo();
    //     }
    // }, []);

    if (account.loading || accountInfo.loading) {
        return <Loader />;
    }

    // console.log("accountInfo=", accountInfo);
    // let usedPrivateRoutes: RouteData[] = [...privateRoutes];
    // if (isAllowedChange(ModelType.MODEL_TYPE_AUX_ENTRY, accountInfo.accountType)) {
    //     usedPrivateRoutes = [...usedPrivateRoutes, ...auxEntryRoutes];
    // }
    let usedPrivateRoutes: RouteData[] = [...privateRoutes];
    if (isAllowedChange(ModelType.MODEL_TYPE_AUX_ENTRY, accountInfo.accountType)) {
        usedPrivateRoutes = [...usedPrivateRoutes, ...auxEntryRoutes];
    }

    // console.log("AppRouter: isLogined = ", isLogined);
    // console.log("url: ", window.location.href);
    console.log("usedPrivateRoutes=", usedPrivateRoutes);

    return (
        // token 
        account.isLogined
            ?
            <Routes>
                {/* {privateRoutes.map(({path, component: Component}) =>  */}
                {usedPrivateRoutes.map(({path, component: Component, props}) => 
                    <Route 
                        key={path} 
                        path={path} 
                        element={<Component {...props} />} 
                    />
                )}
                <Route 
                    path="*" 
                    element={<Navigate to="/cars" 
                    replace />} 
                />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(({path, component: Component}) => 
                    <Route 
                        key={path} 
                        path={path} 
                        element={<Component />} 
                    />
                )}
                <Route 
                    path="*" 
                    element={<Navigate to="/" replace />} 
                />
            </Routes>
    );
}

export default AppRouter;