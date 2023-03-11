import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
        <div id="tasks-ctr">
            <TableContainer component={Paper}>
                <Table aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Task Name</TableCell>
                            <TableCell align="right">Process</TableCell>
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
                                <TableCell align="right">
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
