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

function App() {
    const {loginUserByToken, loginUserReset} = useActions();

    useEffect(() => {
        if (isValidAuth()) {
            // const accessToken = localStorage.getItem("account_accessToken");
            // const expire = localStorage.getItem("account_expire");
            const accessToken = localStorage.getItem(localStorageIdToken);
            // if (accessToken && expire) {
            if (accessToken) {
                // loginUserByToken(accessToken, expire);
                loginUserByToken(accessToken);
            }
        } else {
            loginUserReset();
        }
    }, []);


    return (
        <BrowserRouter>
            <Header/>
            <div className="main">
                <AppRouter/>
            </div>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
