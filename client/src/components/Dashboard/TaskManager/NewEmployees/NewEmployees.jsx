import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useState } from 'react';
import './NewEmployees.scss';
import EditEmployee from '../EditEmployee/EditEmployee';


const NewEmployees = ({ employees }) => {
    const [employeesToEdit, setEmployeesToEdit] = useState(employees);
    const [employeeToEdit, setEmployeeToEdit] = useState();

    const onEdintEmployeeInfoHandler = (employee) => {
        setEmployeeToEdit(() => employee);
    };

    return employeesToEdit.length > 0 ? (
        <>
            {employeeToEdit && (
                <EditEmployee employee={employeeToEdit} setEmployeeToEdit={setEmployeeToEdit} setEmployeesToEdit={setEmployeesToEdit} />
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
        </>
    ) : (
        ''
    );
};

export default NewEmployees;
