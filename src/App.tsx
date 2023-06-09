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
import { User, onAuthStateChanged } from 'firebase/auth';
import { IFirestoreUserData } from './interfaces';
import { DocumentData } from 'firebase/firestore';

function App() {
    const [user, setUser] = useState<null | User>(null);
    const [userData, setUserData] = useState<null | IFirestoreUserData>(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        });
    }, []);

    useEffect(() => {
        if (user) {
            apiService
                .getOneEmployee(user.uid)
                .then((data) => {
                    setUserData(data as IFirestoreUserData);
                })
                .catch((error: Error) => {
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
                <Route path="logout" element={<Logout userData={userData} setUserData={setUserData} />} />
                <Route
                    path="dashboard/*"
                    element={<Dashboard userData={userData} setUserData={setUserData} isTaskManager={userData?.role === 'taskManager'} />}
                />
            </Routes>
        </Box>
    ) : null;
}

export default App;
