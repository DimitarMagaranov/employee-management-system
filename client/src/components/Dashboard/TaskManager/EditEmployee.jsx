import { useState } from 'react';

import { Button, TextField, Box, Alert, Collapse, IconButton, styled, Divider } from '@mui/material';

const EditEmployee = ({ employee, updateEmployee }) => {
    const [salary, setSalary] = useState(0);
    const [open, setOpen] = useState(false);

    const onEditEmployeeHandler = (e) => {
        e.preventDefault();
        salary > 0 ? updateEmployee(employee.id, salary) : setOpen(true);
    };

    const STextField = styled(TextField)(() => ({
        width: '40%',
        margin: '5px',
        backgroundColor: 'white',
        boxShadow: '0px 10px 18px -11px white',
    }));

    return (
        <Box sx={{ textAlign: 'center' }}>
            <STextField type="text" label="First name" variant="outlined" defaultValue={employee.firstName} disabled />
            <STextField type="text" label="Last name" variant="outlined" defaultValue={employee.lastName} disabled />
            <STextField type="text" label="Email" variant="outlined" defaultValue={employee.email} disabled />
            <STextField type="text" label="Phone number" variant="outlined" defaultValue={employee.phoneNumber} disabled />
            <STextField type="text" label="Date of birth" variant="outlined" defaultValue={employee.dateOfBirth} disabled />
            <STextField
                className="textField"
                type="number"
                label="Salary"
                variant="outlined"
                defaultValue={employee.salary}
                onChange={(e) => setSalary(() => e.target.value)}
            />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
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
            </Box>
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
        </Box>
    );
};

export default EditEmployee;
