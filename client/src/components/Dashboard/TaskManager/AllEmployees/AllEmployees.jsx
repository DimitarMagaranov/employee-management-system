import { Table } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import {Paper} from '@mui/material';
import NewEmployees from '../NewEmployees/NewEmployees';

const AllEmployees = ({ employees }) => {
    return (
        <div id="tasks-ctr">
            <NewEmployees employees={employees?.filter(x => x.isNew === true)} />

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
                            <TableCell align="right">Completed Tasks</TableCell>
                            <TableCell align="right">Uncompleted Tasks</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees?.filter(x => x.isNew === false).map((employee, index) => (
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
                                <TableCell align="right">{employee.tasks.filter((t) => t.completed === true).length}</TableCell>
                                <TableCell align="right">{employee.tasks.filter((t) => t.completed !== true).length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AllEmployees;
