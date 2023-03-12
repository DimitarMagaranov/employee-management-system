import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

import * as apiService from '../../../../../services/apiService';

import './List.scss';

const List = ({ title, tasks, setState }) => {
    const onDeleteTaskHandler = (employeeId, taskName) => {
        apiService.getOneEmployee(employeeId).then((employee) => {
            let employeeTasks = [...employee.tasks];
            const index = employeeTasks.findIndex((x) => x.taskName === taskName);
            employeeTasks.splice(index, 1);
            apiService
                .updateEmployee(employeeId, { tasks: employeeTasks })
                .then(() => setState(() => tasks.filter((x) => x.employeeId !== employeeId && x.taskName !== taskName)));
        });
    };

    return (
        <div id="table-ctr">
            <h2 className="table-title">{title}</h2>
            <TableContainer style={{ maxHeight: 400 }} component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Task Name</TableCell>
                            <TableCell align="left">Employee</TableCell>
                            {title === 'Uncompleted Tasks' && <TableCell align="right"></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks?.map((task, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {task.taskName}
                                </TableCell>
                                <TableCell align="left">{task.employeeFullName}</TableCell>
                                <TableCell align="left">
                                    {title === 'Uncompleted Tasks' && (
                                        <Button
                                            onClick={() => onDeleteTaskHandler(task.employeeId, task.taskName)}
                                            variant="contained"
                                            color="secondary"
                                        >
                                            delete
                                        </Button>
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

export default List;
