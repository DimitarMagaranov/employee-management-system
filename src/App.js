import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import * as apiService from './services/apiService';
import Login from './components/Login';
import Register from './components/Register';
import { auth } from './utils/firebase';
import Header from './components/Header';
import Logout from './components/Logout';
import { Box } from '@mui/material';
import Dashboard from './components/Dashboard/Dashboard';
import useEmployees from './hooks/useEmployees';

function App() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [, , , , , , getOneEmployee] = useEmployees();

    useEffect(() => {
        auth.onAuthStateChanged(setUser);
    }, []);

    useEffect(() => {
        if (user) {
            getOneEmployee(user._delegate.uid)
                .then((data) => {
                    setUserData(data);
                })
                .catch((error) => {
                    console.log(error);
                });
            setInitialized(true);
        } else {
            setInitialized(true);
        }
    }, [user]);

    return initialized ? (
        <Box>
            <Header userData={userData} />
            <Routes>
                <Route index element={<Login userData={userData} />} />
                <Route path="login" element={<Login userData={userData} />} />
                <Route path="register" element={<Register userData={userData} />} />
                <Route path="logout" element={<Logout setUserData={setUserData} />} />
                <Route
                    path="dashboard/*"
                    element={<Dashboard userData={userData} setUserData={setUserData} isTaskManager={userData?.role === 'taskManager'} />}
                />
            </Routes>
        </Box>
    ) : null;
}

export default App;
