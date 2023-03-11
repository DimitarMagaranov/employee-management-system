import { useEffect } from 'react';
import useTasks from '../../../../hooks/useTasks';
import List from './List/List';
import CreateTask from './CreateTask/CreateTask';
import './Tasks.scss';

const Tasks = () => {
    const [tasks, isLoading] = useTasks();

    return (
        isLoading ? 'Loading...' : 
        <div id='tasks-ctr'>
            <CreateTask />
            <List title={'Completed Tasks'} tasks={tasks.filter(x => x.taskProcess === false)} />
            <List title={'Uncompleted Tasks'} tasks={tasks.filter(x => x.taskProcess === true)} />
        </div>
    )
};

export default Tasks;
