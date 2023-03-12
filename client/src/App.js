import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import TaskManagerDashboard from './components/Dashboard/TaskManager/TaskManagerDashboard';
import EmployeeDashboard from './components/Dashboard/Employee/EmployeeDashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { auth } from './utils/firebase';
import Header from './components/Header/Header';
import Logout from './components/Logout/Logout';
import * as apiService from './services/apiService';
import './App.css';

function App() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                apiService.getOneEmployee(user._delegate.uid).then((data) => {
                    setUserInfo(() => data);
                });
            }
        })
    }, []);

    const isTaskManager = userInfo?.role === 'taskManager';

    return (
        <div id="container">
            <Header userEmail={userInfo?.email} isAuthenticated={!!userInfo} />
            <Routes>
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
                ></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/logout" element={<Logout setUserInfo={setUserInfo} />}></Route>
            </Routes>
        </div>
    );
}

export default App;
