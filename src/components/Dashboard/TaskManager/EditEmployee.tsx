import { useState } from 'react';

import { Button, TextField, Box, Alert, Collapse, IconButton, styled } from '@mui/material';
import useEmployees from '../../../hooks/useEmployees';
import { IFirestoreUserData } from '../../../interfaces';

const StyledTextField = styled(TextField)(() => ({
    width: '40%',
    margin: '5px',
    backgroundColor: 'white',
    boxShadow: '0px 10px 18px -11px white',
}));

const EditEmployee = ({ employeeToEdit }: { employeeToEdit: IFirestoreUserData }) => {
    const [salary, setSalary] = useState(0);
    const [open, setOpen] = useState(false);
    const [alertVariant, setAlerVariant] = useState('error');
    const [, , , , , updateEmployee] = useEmployees();

    const onEditEmployeeHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (salary > 0) {
            updateEmployee(employeeToEdit.id!, { salary: salary, isNew: false });
            setAlerVariant('success');
        } else {
            setAlerVariant('error');
        }
        setOpen(true);
    };

    return (
        <Box sx={{ textAlign: 'center' }}>
            <StyledTextField type="text" label="First name" variant="outlined" defaultValue={employeeToEdit.firstName} disabled />
            <StyledTextField type="text" label="Last name" variant="outlined" defaultValue={employeeToEdit.lastName} disabled />
            <StyledTextField type="text" label="Email" variant="outlined" defaultValue={employeeToEdit.email} disabled />
            <StyledTextField type="text" label="Phone number" variant="outlined" defaultValue={employeeToEdit.phoneNumber} disabled />
            <StyledTextField type="text" label="Date of birth" variant="outlined" defaultValue={employeeToEdit.dateOfBirth} disabled />
            <StyledTextField
                className="textField"
                type="number"
                label="Salary"
                variant="outlined"
                defaultValue={employeeToEdit.salary}
                onChange={(e) => setSalary(Number(e.target.value))}
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
                            severity={alertVariant === 'error' ? 'error' : 'success'}
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
                            {alertVariant === 'error' ? 'You have to set salary first!' : 'You have successfully changed the user\'s data!'}
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
