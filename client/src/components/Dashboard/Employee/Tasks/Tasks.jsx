import { Table } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import {Paper} from '@mui/material';

import * as apiService from '../../../../services/apiService';
import { useEffect, useState } from 'react';
import './Tasks.scss';

const Tasks = ({ userInfo, onChangeUserInfo }) => {
    const [currTasks, setTasks] = useState();

    useEffect(() => {
        setTasks(() => userInfo?.tasks);
    }, [userInfo]);

    useEffect(() => {
        const updateTasksInterval = setInterval(() => {
            apiService.getOneEmployee(userInfo?.id).then((data) => {
                onChangeUserInfo(data);
            });
        }, 5000);

        return () => {
            clearInterval(updateTasksInterval);
        };
    }, []);

    const onMarkAsReadyHandler = (e, taskName) => {
        const index = currTasks.findIndex((x) => x.taskName === taskName);
        let tasksToUpdate = currTasks;
        tasksToUpdate[index].completed = !tasksToUpdate[index].completed;
        tasksToUpdate[index].completeDate = new Date().valueOf();
        apiService.updateEmployee(userInfo?.id, { tasks: tasksToUpdate }).then((data) => {
            setTasks(() => data.tasks);
        });
    };

    return (
        <div className="table-ctr">
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
                                <TableCell style={{width: '60%'}} align="left">
                                    {task.description}
                                </TableCell>
                                <TableCell align="left">
                                    <p className={`${task.completed !== true ? 'uncompleted' : 'completed'}`}>
                                        {task.completed !== true ? 'Uncompleted' : 'Completed'}
                                    </p>
                                </TableCell>
                                <TableCell align="right">
                                    {task.completed !== true ? (
                                        <button id="btn-ready" onClick={(e) => onMarkAsReadyHandler(e, task.taskName)}>
                                            Mark as completed
                                        </button>
                                    ) : (
                                        ''
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Tasks;
