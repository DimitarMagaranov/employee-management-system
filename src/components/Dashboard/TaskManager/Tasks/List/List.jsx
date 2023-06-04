import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

import DashboardInfoContainer from '../../../../../styled/components/layout/DashboardInfoContainer';
import TableTitle from '../../../../../styled/components/TableTitle';

const List = ({ title, tasks, deleteTask }) => {
    return (
        <DashboardInfoContainer>
            <TableTitle title={title} />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="left">Employee</TableCell>
                            <TableCell>Task Name</TableCell>
                            <TableCell style={{ width: '50%' }}>Task Description</TableCell>
                            {title === 'Uncompleted Tasks' && <TableCell align="right"></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks?.map((task, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left">{task.employeeFullName}</TableCell>
                                <TableCell component="th" scope="row">
                                    {task.taskName}
                                </TableCell>
                                <TableCell style={{ width: '50%' }} component="th" scope="row">
                                    {task.taskDescription}
                                </TableCell>
                                <TableCell align="left">
                                    {title === 'Uncompleted Tasks' && (
                                        <Button onClick={() => deleteTask(task.employeeId, task.taskName)} variant="contained" color="error">
                                            delete
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DashboardInfoContainer>
    );
};

export default List;
