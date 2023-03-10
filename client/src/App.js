import './App.css';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { auth } from './utils/firebase';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Logout from './components/Logout/Logout';
import * as authService from './services/authService';

function App() {
    const [user, setUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(setUser);
    }, []);

    useEffect(() => {
        authService.getOne(user?._delegate.uid).then((data) => {
            setUserInfo(() => data);
        });
    }, [user]);

    return (
        <div id="container">
            <Header userEmail={user?._delegate.email} isAuthenticated={!!user} />
            <Routes>
                <Route index element={<Dashboard userInfo={userInfo} />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
            </Routes>
        </div>
    );
}

export default App;
