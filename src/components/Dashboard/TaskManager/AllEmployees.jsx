import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

import DashboardInfoContainer from '../../../styled/components/layout/DashboardInfoContainer';
import TableTitle from '../../../styled/components/TableTitle';

const AllEmployees = ({ employees, title }) => {
    return (
        <DashboardInfoContainer>
            <TableTitle title={title} />
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
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DashboardInfoContainer>
    );
};

export default AllEmployees;
