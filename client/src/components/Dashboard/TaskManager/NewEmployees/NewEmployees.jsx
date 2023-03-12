import { useEffect, useState } from 'react';
import './NewEmployees.scss';
import EditEmployee from '../EditEmployee/EditEmployee';

import { Table } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import {Paper} from '@mui/material';


const NewEmployees = ({ employees, setState }) => {
    const [employeesToEdit, setEmployeesToEdit] = useState(employees?.filter(x => x.isNew === true));
    const [employeeToEdit, setEmployeeToEdit] = useState();

    useEffect(() => {
        setEmployeesToEdit(() => employees?.filter(x => x.isNew === true));
    }, [employees])

    const onEdintEmployeeInfoHandler = (employee) => {
        setEmployeeToEdit(() => employee);
    };

    return employees.length > 0 ? (
        <div id="tasks-ctr">
            {employeesToEdit.length > 0 && employeeToEdit && (
                <EditEmployee employee={employeeToEdit} employees={employees} setState={setState} />
            )}
            <h2 className="table-title">New employees</h2>
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
                                    <i onClick={() => onEdintEmployeeInfoHandler(employee)} className="fas fa-edit"></i>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    ) : (
        ''
    );
};

export default NewEmployees;
