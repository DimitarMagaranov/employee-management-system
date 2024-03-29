import React, { useState } from 'react';

import {
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    TextField,
    Alert,
    IconButton,
    Collapse,
    Button,
    FormGroup,
    SelectChangeEvent,
} from '@mui/material';

import useEmployees from '../../../../../hooks/useEmployees';
import TableTitle from '../../../../../styled/components/TableTitle';
import { IFirestoreUserData, ITask } from '../../../../../interfaces';

const CreateTask = ({
    createTask,
}: {
    createTask: (employeeId: string, tasksToUpdate: ITask[], setOpen: React.Dispatch<React.SetStateAction<boolean>>) => void;
}) => {
    const [employee, setEmployee] = useState<IFirestoreUserData | null>(null);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [employees, , areEmployeesLoading] = useEmployees();
    const [taskFieldDisabled, setTaskFieldDisabled] = useState(true);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [open, setOpen] = useState(false);

    const handleChangeEmployee = (e: SelectChangeEvent<string>) => {
        const employee = employees.find((x) => x.id === e.target.value);
        setEmployee(employee!);
        setTaskFieldDisabled(false);
    };

    const handleChangeTaskDescription = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTaskDescription(() => e.target.value);
        setSubmitDisabled(e.target.value === '');
    };

    const handleSubmit = async () => {
        const task = {
            taskName: taskName,
            startDate: new Date().valueOf(),
            completeDate: null,
            completed: false,
            description: taskDescription,
        };

        const tasksToUpdate = [...employee!.tasks, task] as ITask[];

        createTask(employee!.id!, tasksToUpdate, setOpen);
    };

    return areEmployeesLoading ? (
        <Box>Loading...</Box>
    ) : (
        <Box>
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
                        {`You are successfully gave new task to ${employee?.firstName} ${employee?.lastName}`}
                    </Alert>
                </Collapse>
            </Box>
            <TableTitle title="Create Task" />
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
                            onChange={(e) => setTaskName(e.target.value)}
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
        </Box>
    );
};

export default CreateTask;
