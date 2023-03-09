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
    const [isTaskManager, setIsTaskManager] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(setUser);
    }, []);

    useEffect(() => {
        authService.getOne(user?._delegate.uid).then((data) => {
            setIsTaskManager(() => data.role === 'taskManager');
        });
    }, [user?._delegate.uid]);

    const authInfo = {
        isAuthenticated: !!user,
        userEmail: user?._delegate.email,
        id: user?._delegate.uid,
    };

    return (
        <div id="container">
            <Header userEmail={authInfo.userEmail} isAuthenticated={authInfo.isAuthenticated} />
            <Routes>
                <Route index element={<Dashboard id={user?._delegate.uid} isTaskManager={isTaskManager} />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
            </Routes>
        </div>
    );
}

export default App;
