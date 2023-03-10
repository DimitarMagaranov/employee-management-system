import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import * as taskService from '../../../services/taskService';
import { useState } from 'react';

import './Tasks.scss';

const Tasks = ({ userId, tasks }) => {
    const [currTasks, setTasks] = useState(tasks);

    const onMarkAsReadyHandler = (e, taskName) => {
        const isReady = e.target.textContent === 'Mark as ready';
        const index = currTasks.findIndex((x) => x.taskName === taskName);
        let tasksToUpdate = currTasks;
        tasksToUpdate[index].process = !tasksToUpdate[index].process;
        taskService.update(userId, { tasks: tasksToUpdate }).then((data) => {
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
                                    <p className={`${task.process === true ? 'inProcess' : 'ready'}`}>
                                        {task.process === true ? 'In process' : 'Ready'}
                                    </p>
                                </TableCell>
                                <TableCell align="right">
                                    {task.process === true ? (
                                        <button id='btn-ready' onClick={(e) => onMarkAsReadyHandler(e, task.taskName)}>Mark as ready</button>
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
