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
    // const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        auth.onAuthStateChanged(setUser);
    }, []);

    useEffect(() => {
        // setIsLoading(true);
        authService.getOne(user?._delegate.uid).then((data) => {
            setUserInfo(() => data);
            // setIsLoading(false);
        });
    }, [user]);

    const onChangeUserInfo = (info) => {
        console.log(info);
        setUserInfo(() => info);
    }

    return (
        <div id="container">
            <Header userEmail={user?._delegate.email} isAuthenticated={!!user} />
            <Routes>
                <Route index element={<Dashboard userInfo={userInfo} onChangeUserInfo={onChangeUserInfo} />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
            </Routes>
        </div>
    );
}

export default App;
