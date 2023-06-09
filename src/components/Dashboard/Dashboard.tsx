import { Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';

import Sidebar from '../Sidebar/Sidebar';
import NewEmployees from './TaskManager/NewEmployees';
import AllEmployees from './TaskManager/AllEmployees';
import { Tasks as TMTasks } from './TaskManager/Tasks/Tasks';
import PersonalInformation from './Employee/PersonalInformation';
import { Tasks as ETasks } from './Employee/Tasks';
import { IDashboardProps } from '../../interfaces';

const Dashboard = ({ userData, setUserData, isTaskManager }: IDashboardProps) => {
    return userData ? (
        <Box sx={{ width: '100%', display: 'flex' }}>
            <Sidebar isTaskManager={isTaskManager} />

            <Routes>
                {isTaskManager ? (
                    <>
                        <Route path="newEmployees" element={<NewEmployees />} />
                        <Route path="allEmployees" element={<AllEmployees title={'All Employees'} />} />
                        <Route path="top5Employees" element={<AllEmployees title={'Top 5 Employees'} />} />
                        <Route path="tasks/*" element={<TMTasks />} />
                    </>
                ) : (
                    <>
                        <Route path="personalInfo" element={<PersonalInformation userData={userData} setUserData={setUserData} />} />
                        <Route path="tasks/*" element={<ETasks userData={userData} />} />
                    </>
                )}
            </Routes>
        </Box>
    ) : null;
};

export default Dashboard;
