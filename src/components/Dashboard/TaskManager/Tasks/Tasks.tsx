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
    const [activeComponentTitle, setActiveComponentTitle] = useState<string>('COMPLETED');

    const navigate = useNavigate();

    useEffect(() => {
        navigate(routingPaths[activeComponentTitle]);
    }, [activeComponentTitle]);

    const setActiveComponentTitleHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = e.target as HTMLElement;
        setActiveComponentTitle(target.textContent!);
    }

    return (
        <DashboardInfoContainer>
            {!isLoading ? (
                <>
                    <TaskMenu>
                        <Box>
                            <SButton onClick={setActiveComponentTitleHandler}>CREATE TASK</SButton>
                            <SButton onClick={setActiveComponentTitleHandler}>COMPLETED</SButton>
                            <SButton onClick={setActiveComponentTitleHandler}>UNCOMPLETED</SButton>
                        </Box>
                        <Box>
                            <SButton onClick={setActiveComponentTitleHandler}>COMPLETED IN THE PAST WEEK</SButton>
                            <SButton onClick={setActiveComponentTitleHandler}>COMPLETED IN THE PAST MONTH</SButton>
                        </Box>
                    </TaskMenu>

                    <Routes>
                        <Route path="create" element={<CreateTask createTask={createTask} />} />
                        <Route
                            path="uncompleted"
                            element={
                                <List title={'Uncompleted Tasks'} tasks={tasks.filter((x) => x.taskProcess === false)} deleteTask={deleteTask} />
                            }
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
                </>
            ) : (
                'Loading...'
            )}
        </DashboardInfoContainer>
    );
};
