import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const AllEmployees = ({ employees, deleteEmployee, title }) => {
    return (
        <div className="table-ctr">
            <h2 className="table-title">{title}</h2>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Phone Number</TableCell>
                            <TableCell align="left">Date of Birth</TableCell>
                            <TableCell align="left">Salary</TableCell>
                            <TableCell align="center">Completed Tasks</TableCell>
                            <TableCell align="center">Uncompleted Tasks</TableCell>
                            {title !== 'Top 5 Employees' && <TableCell align="right"></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees
                            ?.filter((x) => x.isNew === false)
                            .map((employee, index) => (
                                <TableRow key={employee.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {`${employee.firstName} ${employee.lastName}`}
                                    </TableCell>
                                    <TableCell align="left">{employee.email}</TableCell>
                                    <TableCell align="left">{employee.phoneNumber}</TableCell>
                                    <TableCell align="left">{employee.dateOfBirth}</TableCell>
                                    <TableCell align="left">{employee.salary}</TableCell>
                                    <TableCell align="center">{employee.tasks.filter((t) => t.completed === true).length}</TableCell>
                                    <TableCell align="center">{employee.tasks.filter((t) => t.completed !== true).length}</TableCell>
                                    {title !== 'Top 5 Employees' && (
                                        <TableCell align="right">
                                            <Button variant="contained" color="error" onClick={() => deleteEmployee(employee.id)}>
                                                delete
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AllEmployees;
