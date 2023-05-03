import { useState } from 'react';

import { Box } from '@mui/material';

import useEmployees from '../../../hooks/useEmployees';
import AllEmployees from './AllEmployees';
import NewEmployees from './NewEmployees';
import Sidebar from '../../Sidebar/Sidebar';
import Tasks from './Tasks/Tasks';

const TaskManagerDashboard = () => {
    const [employees, areEmployeesLoading, updateEmployee, deleteEmployee] = useEmployees();

    const [selectedInfo, setSelectedInfo] = useState('All Employees');

    const onSelectInfoHandler = (info) => {
        setSelectedInfo(() => info);
    };

    const sortTop5Employees = () => {
        const currentDate = new Date();
        const timeBefore30Days = new Date(currentDate.getTime() - 30 * 86400000);
        const sorted = [...employees]
            ?.sort(
                (a, b) =>
                    b.tasks.filter((x) => x.completed === true && x.completeDate > timeBefore30Days).length -
                    a.tasks.filter((x) => x.completed === true).length
            )
            .slice(0, 5);
        return sorted;
    };

    const components = {
        'New Employees': <NewEmployees employees={employees} updateEmployee={updateEmployee} title={'New Employees'} />,
        'All Employees': <AllEmployees employees={employees} deleteEmployee={deleteEmployee} title={'All Employees'} />,
        'Top 5 Employees': <AllEmployees employees={sortTop5Employees()} title={'Top 5 Employees'} />,
        Tasks: <Tasks />,
    };

    return (
        <Box sx={{ width: '100%', display: 'flex' }}>
            <Sidebar isTaskManager={true} onSelectInfoHandler={onSelectInfoHandler} areNewEmployees={employees?.filter((x) => x.isNew === true)} />
            {areEmployeesLoading ? 'Loading...' : components[selectedInfo]}
        </Box>
    );
};

export default TaskManagerDashboard;
