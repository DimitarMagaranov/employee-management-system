import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, styled, Button } from '@mui/material';

import List from './List/List';
import CreateTask from './CreateTask/CreateTask';
import DashboardInfoContainer from '../../../../styled/components/layout/DashboardInfoContainer';
import { routingPaths } from '../../../../utils/constants';
import { Route, Routes } from 'react-router-dom';
import useTasks from '../../../../hooks/useTasks';

const TaskMenu = styled(Box)(() => ({
    margin: '50px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
}));

const SButton = styled(Button)(({ theme }) => ({
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

export const Tasks = () => {
    const [tasks, isLoading, deleteTask, getCompletedTasks, createTask] = useTasks();
    const [activeComponentTitle, setActiveComponentTitle] = useState('COMPLETED');

    const navigate = useNavigate();

    useEffect(() => {
        navigate(routingPaths[activeComponentTitle]);
    }, [activeComponentTitle]);

    return isLoading ? (
        'Loading...'
    ) : (
        <DashboardInfoContainer>
            <TaskMenu>
                <Box>
                    <SButton onClick={(e) => setActiveComponentTitle(e.target.textContent)}>CREATE TASK</SButton>
                    <SButton onClick={(e) => setActiveComponentTitle(e.target.textContent)}>COMPLETED</SButton>
                    <SButton onClick={(e) => setActiveComponentTitle(e.target.textContent)}>UNCOMPLETED</SButton>
                </Box>
                <Box>
                    <SButton onClick={(e) => setActiveComponentTitle(e.target.textContent)}>COMPLETED IN THE PAST WEEK</SButton>
                    <SButton onClick={(e) => setActiveComponentTitle(e.target.textContent)}>COMPLETED IN THE PAST MONTH</SButton>
                </Box>
            </TaskMenu>

            <Routes>
                <Route path="create" element={<CreateTask createTask={createTask} />} />
                <Route
                    path="uncompleted"
                    element={<List title={'Uncompleted Tasks'} tasks={tasks.filter((x) => x.taskProcess === false)} deleteTask={deleteTask} />}
                />
                <Route path="completed" element={<List title={'Completed Tasks'} tasks={tasks?.filter((x) => x.taskProcess === true)} />} />
                <Route
                    path="completedPastWeek"
                    element={<List title={'Completed in the past week'} tasks={getCompletedTasks(activeComponentTitle)} />}
                />
                <Route
                    path="completedPastMonth"
                    element={<List title={'Completed in the past month'} tasks={getCompletedTasks(activeComponentTitle)} />}
                />
            </Routes>
        </DashboardInfoContainer>
    );
};
