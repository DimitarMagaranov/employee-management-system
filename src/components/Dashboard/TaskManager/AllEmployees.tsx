import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

import DashboardInfoContainer from '../../../styled/components/layout/DashboardInfoContainer';
import TableTitle from '../../../styled/components/TableTitle';
import useEmployees from '../../../hooks/useEmployees';

const AllEmployees = ({ title }: {title: string}) => {
    const [employees, , isLoading, sortTop5Employees] = useEmployees();

    const filteredEmps = title === 'Top 5 Employees' ? sortTop5Employees() : employees;

    return (
        <DashboardInfoContainer>
            {!isLoading ? (
                <>
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
                                {filteredEmps.map((employee, index) => (
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
                </>
            ) : (
                'Loading...'
            )}
        </DashboardInfoContainer>
    );
};

export default AllEmployees;
