import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Footer from './components/Footer/Footer';
import { useActions } from './hooks/useActions';
import { loginUserReset } from './store/action-creators/account';
import { isValidAuth } from './utils/auth';
import { localStorageIdToken } from './types/api';
import { useTypedSelector } from './hooks/useTypedSelector';
import Loader from './components/UI/Loader/Loader';
import HeaderMenu from './components/Header/HeaderMenu/HeaderMenu';

function App() {
    const {loginUserByToken, loginUserReset} = useActions();
    const account = useTypedSelector(state => state.account);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const { fetchAccountInfo } = useActions();

    useEffect(() => {
        if (isValidAuth()) {
            // const token = localStorage.getItem("account_accessToken");
            // const expire = localStorage.getItem("account_expire");
            const token = localStorage.getItem(localStorageIdToken);
            // if (token && expire) {
            if (token) {
                // loginUserByToken(token, expire);
                loginUserByToken(token);
                // loginUserReset();
                // fetchAccountInfo();
            }
        } else {
            loginUserReset();
        }
    }, []);

    useEffect(() => {
        // console.log("check accountInfo:");
        // console.log("account = ", account);
        // console.log("accountInfo = ", accountInfo);

        if (account.isLogined && !accountInfo.loading && !accountInfo.ready) {
            fetchAccountInfo();
        }
    }, [account.isLogined, accountInfo.loading, accountInfo.ready]);

    if (accountInfo.ready) {
        console.log("account = ", account);
        console.log("accountInfo = ", accountInfo);
    }
    

    // if (account.loading || accountInfo.loading) {
    //     return <Loader/>;
    // }

    return (
        <BrowserRouter>
            <div className="app">
                <Header/>                
                <div className="main">
                    <HeaderMenu/>
                    <AppRouter/>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
