import { useEffect, useState } from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import EditEmployee from './EditEmployee';
import TableTitle from '../../../styled/components/TableTitle';
import DashboardInfoContainer from '../../../styled/components/layout/DashboardInfoContainer';

const NewEmployees = ({ employees, title, setEmployees }) => {
    const [employeesToEdit, setEmployeesToEdit] = useState(employees?.filter((x) => x.isNew === true));
    const [employeeToEdit, setEmployeeToEdit] = useState();

    useEffect(() => {
        setEmployeesToEdit(() => employees?.filter((x) => x.isNew === true));
    }, [employees]);

    return employees.length > 0 ? (
        <DashboardInfoContainer>
            {employeesToEdit.length > 0 && employeeToEdit && (
                <EditEmployee
                    employeeToEdit={employeeToEdit}
                    setEmployees={setEmployees}
                />
            )}
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
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employeesToEdit?.map((employee, index) => (
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
                                <TableCell align="left">
                                    <Button onClick={() => setEmployeeToEdit(employee)}>
                                        <BorderColorIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DashboardInfoContainer>
    ) : null;
};

export default NewEmployees;
