import { useState } from 'react';

import { Box, InputLabel, MenuItem, FormControl, Select, TextField, Alert, IconButton, Collapse, Button, FormGroup } from '@mui/material';

import useEmployees from '../../../../../hooks/useEmployees';
import * as apiService from '../../../../../services/apiService';

const CreateTask = () => {
    const [employee, setEmployee] = useState({});
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [employees, areEmployeesLoading] = useEmployees();
    const [taskFieldDisabled, setTaskFieldDisabled] = useState(true);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [open, setOpen] = useState(false);

    const handleChangeEmployee = (e) => {
        apiService.getOneEmployee(e.target.value).then((data) => {
            setEmployee(() => data);
            setTaskFieldDisabled(false);
        });
    };

    const handleChangeTaskName = (e) => {
        setTaskName(() => e.target.value);
    };

    const handleChangeTaskDescription = (e) => {
        setTaskDescription(() => e.target.value);
        setSubmitDisabled(e.target.value === '');
    };

    const handleSubmit = () => {
        apiService
            .updateEmployee(employee.id, {
                tasks: [
                    ...employee.tasks,
                    {
                        taskName: taskName,
                        startDate: new Date().valueOf(),
                        completeDate: null,
                        completed: false,
                        description: taskDescription,
                    },
                ],
            })
            .then((data) => {
                setOpen(true);
                setEmployee(() => data);
            });
    };

    return areEmployeesLoading ? (
        'Loading...'
    ) : (
        <div>
            <Box sx={{ width: '100%' }}>
                <Collapse in={open}>
                    <Alert
                        severity="success"
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
                        {`You are successfully gave new task to ${employee.firstName} ${employee.lastName}`}
                    </Alert>
                </Collapse>
            </Box>
            <h2 className="table-title">Create Task</h2>
            <Box sx={{ minWidth: 120, backgroundColor: 'white', padding: '20px', borderRadius: '5px', marginBottom: '50px' }}>
                <FormGroup>
                    <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                        <InputLabel id="simple-select-label">Employee</InputLabel>
                        <Select labelId="simple-select-label" id="simple-select" label="Employee" defaultValue={''} onChange={handleChangeEmployee}>
                            {employees?.map((employee) => {
                                return <MenuItem key={employee.id} value={employee.id}>{`${employee.firstName} ${employee.lastName}`}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                        <TextField
                            disabled={taskFieldDisabled}
                            onChange={handleChangeTaskName}
                            id="outlined-basic"
                            label="Task name"
                            variant="outlined"
                            multiline
                            defaultValue={taskName}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                        <TextField
                            disabled={taskFieldDisabled}
                            onChange={handleChangeTaskDescription}
                            id="outlined-basic"
                            label="Task description"
                            variant="outlined"
                            multiline
                            defaultValue={taskDescription}
                        />
                    </FormControl>
                    <Button
                        disabled={submitDisabled}
                        onClick={handleSubmit}
                        type="submit"
                        variant="outlined"
                        sx={{ width: '200px', marginLeft: '10px' }}
                    >
                        Submit
                    </Button>
                </FormGroup>
            </Box>
        </div>
    );
};

export default CreateTask;
