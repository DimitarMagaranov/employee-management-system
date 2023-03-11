import './CreateTask.scss';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

import useEmployees from '../../../../../hooks/useEmployees';
import { FormGroup } from '@mui/material';

import * as apiService from '../../../../../services/apiService';

const CreateTask = () => {
    const [employee, setEmployee] = useState({});
    const [taskName, setTaskName] = useState('');
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
        setSubmitDisabled(e.target.value === '');
    };

    const handleSubmit = () => {
        apiService.updateEmployee(employee.id, {
            tasks: [
                ...employee.tasks,
                {
                    taskName: taskName,
                    startDate: new Date().valueOf(),
                    completeDate: null,
                    completed: false,
                },
            ],
        }).then((data) => {
            setOpen(true);
            setEmployee(() => data);
        });
    };

    return areEmployeesLoading ? (
        'Loading...'
    ) : (
        <div className="table-ctr">
            <Box sx={{ width: '100%' }}>
                <Collapse in={open}>
                    <Alert
                    severity='success'
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
                        <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Employee"
                            defaultValue={''}
                            onChange={handleChangeEmployee}
                        >
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
