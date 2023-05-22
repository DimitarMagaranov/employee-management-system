import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

import TaskManagerDashboard from './components/Dashboard/TaskManager/TaskManagerDashboard';
import EmployeeDashboard from './components/Dashboard/Employee/EmployeeDashboard';
import Login from './components/Login';
import Register from './components/Register';
import { auth } from './utils/firebase';
import Header from './components/Header';
import Logout from './components/Logout';
import * as apiService from './services/apiService';
import { Box } from '@mui/material';

function App() {
    const [userInfo, setUserInfo] = useState(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                apiService.getOneEmployee(user._delegate.uid).then((data) => {
                    setInitialized(true);
                    setUserInfo(() => data);
                });
            } else {
                setInitialized(true);
            }
        });
    }, []);

    const isTaskManager = userInfo?.role === 'taskManager';

    return initialized ? (
        <Box>
            <Header userEmail={userInfo?.email} isAuthenticated={!!userInfo} />
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={
                            !userInfo ? (
                                <Login />
                            ) : isTaskManager ? (
                                <TaskManagerDashboard />
                            ) : (
                                <EmployeeDashboard userInfo={userInfo} setUserInfo={setUserInfo} />
                            )
                        }
                    />
                    <Route path="/login" element={<Login user={userInfo}/>} />
                    <Route path="/register" element={<Register user={userInfo}/>} />
                    <Route path="/logout" element={<Logout setUserInfo={setUserInfo} />} />
                </Route>
            </Routes>
        </Box>
    ) : null;
}

export default App;
