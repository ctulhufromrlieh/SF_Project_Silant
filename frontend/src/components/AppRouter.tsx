import React, { useContext } from "react";
// import About from "../pages/About";
// import Posts from "../pages/Posts";
import { Navigate, Route, Routes } from "react-router-dom";
// import Error from "../pages/Error";
// import PostIdPage from "../pages/PostIdPage";
import { privateRoutes, publicRoutes } from "../router";
// import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";
import { useTypedSelector } from "../hooks/useTypedSelector";
const AppRouter = () => {
    // const {token, loading, isLogined} = useTypedSelector(state => state.account);
    const {loading, isLogined} = useTypedSelector(state => state.account);

    if (loading) {
        return <Loader />;
    }

    console.log("AppRouter: isLogined = ", isLogined);
    console.log("url: ", window.location.href);

    return (
        // token 
        isLogined
            ?
            <Routes>
                {privateRoutes.map(({path, component: Component}) => 
                    <Route 
                        key={path} 
                        path={path} 
                        element={<Component />} 
                    />
                )}
                <Route 
                    path="*" 
                    element={<Navigate to="/" 
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
                    element={<Navigate to="/login" 
                    replace />} 
                />
            </Routes>
    );
}

export default AppRouter;