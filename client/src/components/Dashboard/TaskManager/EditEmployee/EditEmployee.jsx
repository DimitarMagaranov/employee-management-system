import { useState } from 'react';
import './EditEmployee.scss';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import * as apiService from '../../../../services/apiService';

const EditEmployee = ({ employee, employees, setState }) => {
    const [salary, setSalary] = useState(0);
    const [open, setOpen] = useState(false);

    const onEditEmployeeHandler = (e) => {
        e.preventDefault();

        if (salary > 0) {
            apiService
                .updateEmployee(employee.id, {
                    ...employee,
                    salary: salary,
                    isNew: false,
                })
                .then(() => {
                    setState(() => employees.filter(x => x.id !== employee.id));
                });
        } else {
            setOpen(true);
        }
    };

    return (
        <form id="new-employee-form">
            <TextField className="textField" type="text" label="First name" variant="outlined" defaultValue={employee.firstName} disabled />
            <TextField className="textField" type="text" label="Last name" variant="outlined" defaultValue={employee.lastName} disabled />
            <br />
            <TextField className="textField" type="text" label="Email" variant="outlined" defaultValue={employee.email} disabled />
            <TextField className="textField" type="text" label="Phone number" variant="outlined" defaultValue={employee.phoneNumber} disabled />
            <br />
            <TextField className="textField" type="text" label="Date of birth" variant="outlined" defaultValue={employee.dateOfBirth} disabled />
            <TextField
                className="textField"
                type="number"
                label="Salary"
                variant="outlined"
                defaultValue={employee.salary}
                onChange={(e) => setSalary(() => e.target.value)}
            />
            <br />
            <div id="alert-ctr">
                <Box sx={{ width: '50%' }}>
                    <Collapse in={open}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    X
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            {`You have to set salary first!`}
                        </Alert>
                    </Collapse>
                </Box>
            </div>
            <br />
            <Button
                style={{
                    marginTop: '10px',
                    width: '200px',
                    backgroundColor: '#404e67',
                    boxShadow: '0px 10px 18px -11px white',
                    letterSpacing: '2px',
                }}
                variant="contained"
                color="primary"
                onClick={onEditEmployeeHandler}
            >
                edit employee
            </Button>
        </form>
    );
};

export default EditEmployee;
