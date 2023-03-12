import useTasks from '../../../../hooks/useTasks';
import List from './List/List';
import CreateTask from './CreateTask/CreateTask';
import { useState } from 'react';

import './Tasks.scss';

const Tasks = () => {
    const [tasks, isLoading, deleteTask] = useTasks();
    const [activeButton, setActiveButton] = useState('COMPLETED');

    const onSwapTables = (e) => {
        setActiveButton(() => e.target.textContent);
    };

    const getCompletedTasks = () => {
        if (activeButton === 'COMPLETED IN THE PAST WEEK') {
            const currentDate = new Date();
            const timeBefore7Days = new Date(currentDate.getTime() - 7 * 86400000);
            const filtered = [...tasks].filter((x) => x.completeDate > timeBefore7Days);
            return filtered;
        } else {
            const currentDate = new Date();
            const timeBefore30Days = new Date(currentDate.getTime() - 30 * 86400000);
            const filtered = [...tasks].filter((x) => x.completeDate > timeBefore30Days);
            return filtered;
        }
    };

    const components = {
        'CREATE TASK': <CreateTask />,
        UNCOMPLETED: <List title={'Uncompleted Tasks'} tasks={tasks.filter((x) => x.taskProcess === false)} deleteTask={deleteTask} />,
        COMPLETED: <List title={'Completed Tasks'} tasks={tasks.filter((x) => x.taskProcess === true)} />,
        'COMPLETED IN THE PAST WEEK': <List title={'Completed in the past week'} tasks={getCompletedTasks()} />,
        'COMPLETED IN THE PAST MONTH': <List title={'Completed in the past month'} tasks={getCompletedTasks()} />,
    };

    return isLoading ? (
        'Loading...'
    ) : (
        <div className="table-ctr">
            <div id="task-menu">
                <div>
                    <button className={activeButton === 'CREATE TASK' ? 'active' : ''} onClick={onSwapTables}>
                        CREATE TASK
                    </button>
                    <button className={activeButton === 'COMPLETED' ? 'active' : ''} onClick={onSwapTables}>
                        COMPLETED
                    </button>
                    <button className={activeButton === 'UNCOMPLETED' ? 'active' : ''} onClick={onSwapTables}>
                        UNCOMPLETED
                    </button>
                </div>
                <div>
                    <button className={activeButton === 'COMPLETED IN THE PAST WEEK' ? 'active' : ''} onClick={onSwapTables}>
                        COMPLETED IN THE PAST WEEK
                    </button>
                    <button className={activeButton === 'COMPLETED IN THE PAST MONTH' ? 'active' : ''} onClick={onSwapTables}>
                        COMPLETED IN THE PAST MONTH
                    </button>
                </div>
            </div>
            {[components[activeButton]]}
        </div>
    );
};

export default Tasks;
