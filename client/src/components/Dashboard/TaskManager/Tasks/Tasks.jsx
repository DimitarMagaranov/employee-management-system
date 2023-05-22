import { useState } from 'react';

import { Box, styled, Button } from '@mui/material';

import List from './List/List';
import useTasks from '../../../../hooks/useTasks';
import CreateTask from './CreateTask/CreateTask';
import DashboardInfoContainer from '../../../../styled/components/layout/DashboardInfoContainer';

const Tasks = () => {
    const [tasks, isLoading, deleteTask] = useTasks();
    const [activeButton, setActiveButton] = useState('COMPLETED');

    const onChangeTable = (e) => {
        setActiveButton(() => e.target.textContent);
    };

    const getCompletedTasks = () => {
        const currentDate = new Date();
        let timeBefore = 0;

        if (activeButton === 'COMPLETED IN THE PAST WEEK') {
            timeBefore = new Date(currentDate.getTime() - 7 * 86400000);
        } else {
            timeBefore = new Date(currentDate.getTime() - 30 * 86400000);
        }

        return tasks.filter((x) => x.completeDate > timeBefore);
    };

    const components = {
        'CREATE TASK': <CreateTask />,
        UNCOMPLETED: <List title={'Uncompleted Tasks'} tasks={tasks.filter((x) => x.taskProcess === false)} deleteTask={deleteTask} />,
        COMPLETED: <List title={'Completed Tasks'} tasks={tasks.filter((x) => x.taskProcess === true)} />,
        'COMPLETED IN THE PAST WEEK': <List title={'Completed in the past week'} tasks={getCompletedTasks()} />,
        'COMPLETED IN THE PAST MONTH': <List title={'Completed in the past month'} tasks={getCompletedTasks()} />,
    };

    const TaskMenu = styled(Box)(({ theme }) => ({
        margin: '50px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
    }));

    const SButton = styled(Button)(({ theme }) => ({
        // marginLeft: '30px',
        padding: '8px, 16px',
        color: theme.palette.primary.main,
        backgroundColor: 'white',
        marginRight: '20px',
        '&:hover': {
            color: 'white',
            backgroundColor: theme.palette.primary.main,
        },
        '&:active': {},
    }));

    return isLoading ? (
        'Loading...'
    ) : (
        <DashboardInfoContainer>
            <TaskMenu>
                <Box>
                    <SButton onClick={onChangeTable}>CREATE TASK</SButton>
                    <SButton onClick={onChangeTable}>COMPLETED</SButton>
                    <SButton onClick={onChangeTable}>UNCOMPLETED</SButton>
                </Box>
                <Box>
                    <SButton onClick={onChangeTable}>COMPLETED IN THE PAST WEEK</SButton>
                    <SButton onClick={onChangeTable}>COMPLETED IN THE PAST MONTH</SButton>
                </Box>
            </TaskMenu>
            {[components[activeButton]]}
        </DashboardInfoContainer>
    );
};

export default Tasks;
