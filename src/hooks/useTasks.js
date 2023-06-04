import { useState, useEffect } from 'react';

import * as apiService from '../services/apiService';

const useTasks = () => {
    const [state, setState] = useState([]);
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        setIsLoading(true);

        apiService
            .getAllTasks()
            .then((tasks) => {
                setState(() => tasks);
            })
            .then(() => {
                setIsLoading(() => false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

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

    return [state, isLoading, deleteTask];
};

export default useTasks;
