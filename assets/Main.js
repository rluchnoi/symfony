import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import { getCookie, setAxiosHeader } from "./helpers";
import {RecoilRoot} from "recoil";

function Main() {
    // used to check if token is set and load other pages after defining that.
    const [tokenCheckDone, setTokenCheckDone] = useState(false);

    useEffect(() => {
        setAuthorization();
    }, [])

    const ProtectedRoute = ({ children }) => {
        // fresh token should be checked each time
        const tokenInTheCookie = getCookie('token');

        // token is an empty string if it does not exist
        if (tokenInTheCookie === '') {
            return <Navigate to="/login" />
        }

        return children;
    }

    const setAuthorization = () => {
        const tokenInTheCookie = getCookie('token');

        if (tokenInTheCookie) {
            setAxiosHeader(tokenInTheCookie)
        }

        // verify that token check is finished
        setTokenCheckDone(true);
    }

    return (
        // load other components only after token check has been performed and axios header set
        tokenCheckDone ?
            <RecoilRoot>
                <Router>
                    <Routes>
                        <Route path="/">
                            <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                            <Route path="profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
                            <Route path="chat" element={<ProtectedRoute><Chat/></ProtectedRoute>} />

                            <Route path="register" element={<Register/>} />
                            <Route path="login" element={<Login/>} />
                        </Route>
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                </Router>
            </RecoilRoot>
                :
            <></>
    );
}

export default Main;

if (document.getElementById('app')) {
    const rootElement = document.getElementById('app');
    const root = createRoot(rootElement);

    root.render(
        <Main />
    );
}
