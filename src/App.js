import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import * as apiService from './services/apiService';
import TaskManagerDashboard from './components/Dashboard/TaskManager/TaskManagerDashboard';
import EmployeeDashboard from './components/Dashboard/Employee/EmployeeDashboard';
import Login from './components/Login';
import Register from './components/Register';
import { auth } from './utils/firebase';
import Header from './components/Header';
import Logout from './components/Logout';
import { Box } from '@mui/material';
import AuthContext from './contexts/AuthContext';

function App() {
    const [user, setUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(setUser);
    }, []);

    useEffect(() => {
        if (user) {
            apiService
                .getOneEmployee(user._delegate.uid)
                .then((data) => {
                    setUserInfo(data);
                })
                .then(() => setInitialized(true))
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setInitialized(true);
        }
    }, [user]);

    const authInfo = {
        isAuthenticated: !!user,
        userEmail: user?._delegate.email,
    };

    const isTaskManager = userInfo?.role === 'taskManager';

    return initialized ? (
        <Box>
            <AuthContext.Provider value={authInfo}>
                <Header />
                <Routes>
                    <Route
                        index
                        element={
                            !authInfo.isAuthenticated ? (
                                <Login />
                            ) : isTaskManager ? (
                                <TaskManagerDashboard />
                            ) : (
                                <EmployeeDashboard userInfo={userInfo} setUserInfo={setUserInfo} />
                            )
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout setUserInfo={setUserInfo} />} />
                </Routes>
            </AuthContext.Provider>
        </Box>
    ) : null;
}

export default App;
