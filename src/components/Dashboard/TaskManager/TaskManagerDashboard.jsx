import { useState } from 'react';

import { Box } from '@mui/material';

import useEmployees from '../../../hooks/useEmployees';
import AllEmployees from './AllEmployees';
import NewEmployees from './NewEmployees';
import Sidebar from '../../Sidebar/Sidebar';
import Tasks from './Tasks/Tasks';
import { Routes, Route } from 'react-router-dom';

const TaskManagerDashboard = () => {
    const [employees, setEmployees, isLoading, sortTop5Employees] = useEmployees();
    const [selectedInfo, setSelectedInfo] = useState('All Employees');

    const components = {
        'New Employees': <NewEmployees employees={employees} title={'New Employees'} setEmployees={setEmployees} />,
        'All Employees': <AllEmployees employees={employees} title={'All Employees'} />,
        'Top 5 Employees': <AllEmployees employees={sortTop5Employees()} title={'Top 5 Employees'} />,
        Tasks: <Tasks />,
    };

    return (
        <Box sx={{ width: '100%', display: 'flex' }}>
            <Sidebar isTaskManager={true} setSelectedInfo={setSelectedInfo} areNewEmployees={employees?.filter((x) => x.isNew === true)} />
            {isLoading ? 'Loading...' : components[selectedInfo]}
        </Box>

        // <Box sx={{ width: '100%', display: 'flex' }}>
        //     <Sidebar isTaskManager={true} setSelectedInfo={setSelectedInfo} areNewEmployees={employees?.filter((x) => x.isNew === true)} />
        //     {isLoading ? (
        //         'Loading...'
        //     ) : (
        //         <Routes>
        //             <Route path="/all" element={<AllEmployees employees={employees} title={'All Employees'} />} />
        //             <Route path="/new" element={<NewEmployees employees={employees} title={'New Employees'} setEmployees={setEmployees} />} />
        //             <Route path="/top5" element={<AllEmployees employees={sortTop5Employees()} title={'Top 5 Employees'} />} />
        //             <Route path="/tasks" element={<Tasks />} />
        //         </Routes>
        //     )}
        // </Box>
    );
};

export default TaskManagerDashboard;
