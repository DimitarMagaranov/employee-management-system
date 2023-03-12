import useTasks from '../../../../hooks/useTasks';
import List from './List/List';
import CreateTask from './CreateTask/CreateTask';
import './Tasks.scss';
import { useState } from 'react';

const Tasks = () => {
    const [tasks, isLoading, deleteTask] = useTasks();
    const [activeButton, setActiveButton] = useState('COMPLETED TASKS');

    const onSwapTables = (e) => {
        setActiveButton(() => e.target.textContent);
    }

    const components = {
        'CREATE TASK': <CreateTask />,
        'UNCOMPLETED TASKS': <List title={'Uncompleted Tasks'} tasks={tasks.filter(x => x.taskProcess === false)} deleteTask={deleteTask} />,
        'COMPLETED TASKS': <List title={'Completed Tasks'} tasks={tasks.filter(x => x.taskProcess === true)} />
    }

    return (
        isLoading ? 'Loading...' : 
        <div id='tasks-ctr'>
            <div id="task-menu">
                <button id="create-task" className={activeButton === 'CREATE TASK' ? 'active' : ''} onClick={onSwapTables}>CREATE TASK</button>
                <button id="completed" className={activeButton === 'COMPLETED TASKS' ? 'active' : ''} onClick={onSwapTables}>COMPLETED TASKS</button>
                <button id="uncomleted" className={activeButton === 'UNCOMPLETED TASKS' ? 'active' : ''} onClick={onSwapTables}>UNCOMPLETED TASKS</button>
            </div>
            {[components[activeButton]]}
        </div>
    )
};

export default Tasks;
