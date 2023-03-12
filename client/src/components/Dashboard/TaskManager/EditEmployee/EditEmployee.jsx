import { useState } from 'react';

import { Button, TextField, Box, Alert, Collapse, IconButton } from '@mui/material';

import './EditEmployee.scss';

const EditEmployee = ({ employee, updateEmployee }) => {
    const [salary, setSalary] = useState(0);
    const [open, setOpen] = useState(false);

    const onEditEmployeeHandler = (e) => {
        e.preventDefault();
        salary > 0 ? updateEmployee(employee.id, salary) : setOpen(true);
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
