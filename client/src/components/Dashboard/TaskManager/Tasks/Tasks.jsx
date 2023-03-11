import { useEffect } from 'react';
import useTasks from '../../../../hooks/useTasks';
import List from './List/List';
import './Tasks.scss';

const Tasks = () => {
    const [tasks, isLoading] = useTasks();

    return (
        isLoading ? 'Loading...' : 
        <div id='tasks-ctr'>
            <List title={'Completed Tasks'} tasks={tasks.filter(x => x.taskProcess === false)}></List>
            <List title={'Uncompleted Tasks'} tasks={tasks.filter(x => x.taskProcess === true)}></List>
        </div>
    )
};

export default Tasks;
