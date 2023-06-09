import { useEffect, useState } from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, styled } from '@mui/material';
import DashboardInfoContainer from '../../../styled/components/layout/DashboardInfoContainer';
import useEmployees from '../../../hooks/useEmployees';
import { IFirestoreUserData, ITask } from '../../../interfaces';

const ButtonReady = styled(Button)(() => ({
    fontSize: '12px',
    padding: '6px 8px',
    borderRadius: '6px',
    border: 'none',
    color: 'white',
    backgroundColor: '#4bb543',
    '&:hover': {
        color: '#4bb543',
        backgroundColor: 'white',
    },
}));

export const Tasks = ({ userData }: {userData: IFirestoreUserData}) => {
    const [, , , , , updateEmployee, getOneEmployee] = useEmployees();
    const [currTasks, setTasks] = useState<ITask[] | null>(null);

    useEffect(() => {
        setTasks(() => userData?.tasks);
    }, [userData]);

    useEffect(() => {
        const updateTasksInterval = setInterval(() => {
            getOneEmployee(userData.id!).then((data) => {
                setTasks(data.tasks);
            });
        }, 5000);

        return () => {
            clearInterval(updateTasksInterval);
        };
    }, []);

    const onMarkAsReadyHandler = (taskName: string) => {
        const index = currTasks!.findIndex((x) => x.taskName === taskName);
        let tasksToUpdate = [...currTasks!];
        tasksToUpdate[index].completed = true;
        tasksToUpdate[index].completeDate = new Date().valueOf();
        updateEmployee(userData.id!, { tasks: tasksToUpdate });
    };

    return (
        <DashboardInfoContainer>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Task Name</TableCell>
                            <TableCell>Task Description</TableCell>
                            <TableCell align="left">Process</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currTasks?.map((task, index) => (
                            <TableRow key={task.taskName}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {task.taskName}
                                </TableCell>
                                <TableCell style={{ width: '60%' }} align="left">
                                    {task.description}
                                </TableCell>
                                <TableCell align="left">
                                    <Typography sx={task.completed !== true ? { color: 'red' } : { color: '#4bb543' }}>
                                        {task.completed !== true ? 'Uncompleted' : 'Completed'}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    {task.completed !== true ? (
                                        <ButtonReady onClick={() => onMarkAsReadyHandler(task.taskName)}>Mark as completed</ButtonReady>
                                    ) : null}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DashboardInfoContainer>
    );
};
