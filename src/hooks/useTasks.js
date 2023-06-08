import { useState, useEffect } from 'react';

import * as apiService from '../services/apiService';
import useEmployees from './useEmployees';

const useTasks = () => {
    const [state, setState] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [, , , , , updateEmployee] = useEmployees();

    useEffect(() => {
        setIsLoading(true);
        getAllTasks();
    }, []);

    const getAllTasks = () => {
        apiService
            .getAllTasks()
            .then((tasks) => {
                setState(tasks);
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    const deleteTask = (employeeId, taskName) => {
        let employeeTasks = [];

        apiService
            .getOneEmployee(employeeId)
            .then((employee) => {
                employeeTasks = [...employee.tasks];
                const index = employeeTasks.findIndex((x) => x.taskName === taskName);
                employeeTasks.splice(index, 1);
            })
            .then(() => {
                apiService.updateEmployee(employeeId, { tasks: employeeTasks }).then(() => {
                    const task = state.find((x) => x.employeeId === employeeId && x.taskName === taskName);
                    setState(() => state.filter((x) => x !== task));
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const createTask = (employeeId, tasksToUpdate, setOpen) => {
        updateEmployee(employeeId, tasksToUpdate);
        getAllTasks();
        setOpen(true);
    };

    const getCompletedTasks = (criteria) => {
        const currentDate = new Date();
        const days = criteria === 'COMPLETED IN THE PAST WEEK' ? 7 : 30;
        const timeBefore = new Date(currentDate.getTime() - days * 86400000);

        return state.filter((x) => x.completeDate > timeBefore);
    };

    return [state, isLoading, deleteTask, getCompletedTasks, createTask];
};

export default useTasks;
