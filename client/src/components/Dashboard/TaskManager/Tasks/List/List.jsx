import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const List = ({ title, tasks, deleteTask }) => {
    return (
        <div id="table-ctr">
            <h2 className="table-title">{title}</h2>
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
        </div>
    );
};

export default List;
