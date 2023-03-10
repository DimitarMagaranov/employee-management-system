import useEmployees from '../../../hooks/useEmployees';
import Sidebar from '../../Sidebar/Sidebar';
import { useState } from 'react';
import AllEmployees from './AllEmployees/AllEmployees';
import Tasks from './Tasks/Tasks';

const TaskManagerDashboard = () => {
    const [employees, areEmployeesLoading] = useEmployees();

    const [selectedInfo, setSelectedInfo] = useState('All Employees');

    const onSelectInfoHandler = (info) => {
        setSelectedInfo(() => info);
    };

    const sortTop5Employees = () => {
        const sorted = [...employees]
        ?.sort((a, b) => a.tasks.filter((x) => x.process === true).length - b.tasks.filter((x) => x.process === true).length)
        .slice(0, 5);
        return sorted;
    };

    const components = {
        'All Employees': <AllEmployees employees={employees} />,
        'Top 5 Employees': <AllEmployees employees={sortTop5Employees()} />,
        Tasks: <Tasks />,
    };

    return (
        <div className="dashboard">
            <Sidebar isTaskManager={true} onSelectInfoHandler={onSelectInfoHandler} />
            {areEmployeesLoading ? 'Loading...' : components[selectedInfo]}
        </div>
    );
};

export default TaskManagerDashboard;
