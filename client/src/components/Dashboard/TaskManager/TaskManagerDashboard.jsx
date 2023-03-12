import useEmployees from '../../../hooks/useEmployees';
import Sidebar from '../../Sidebar/Sidebar';
import { useState } from 'react';
import AllEmployees from './AllEmployees/AllEmployees';
import Tasks from './Tasks/Tasks';
import NewEmployees from './NewEmployees/NewEmployees';

const TaskManagerDashboard = () => {
    const [employees, areEmployeesLoading, setState] = useEmployees();

    const [selectedInfo, setSelectedInfo] = useState('All Employees');

    const onSelectInfoHandler = (info) => {
        setSelectedInfo(() => info);
    };

    const sortTop5Employees = () => {
        const currentDate = new Date();
        const timeBefore30Days = new Date(currentDate.getTime() - (30*86400000));
        const sorted = [...employees]
        ?.sort((a, b) => b.tasks.filter((x) => x.completed === true && x.completeDate > timeBefore30Days).length - a.tasks.filter((x) => x.completed === true).length)
        .slice(0, 5);
        return sorted;
    };

    const components = {
        'New Employees': <NewEmployees employees={employees} setState={setState} />,
        'All Employees': <AllEmployees employees={employees} />,
        'Top 5 Employees': <AllEmployees employees={sortTop5Employees()} />,
        'Tasks': <Tasks />,
    };

    return (
        <div className="dashboard">
            <Sidebar isTaskManager={true} onSelectInfoHandler={onSelectInfoHandler} areNewEmployees={employees?.filter(x => x.isNew === true)} />
            {areEmployeesLoading ? 'Loading...' : components[selectedInfo]}
        </div>
    );
};

export default TaskManagerDashboard;
