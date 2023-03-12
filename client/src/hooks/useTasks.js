import { useState, useEffect } from 'react';

import * as apiService from '../services/apiService';

const useTasks = () => {
    const [state, setState] = useState([]);
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        setIsLoading(true);
        apiService
            .getAllEmployees()
            .then((data) => {
                let tasks = [];
                data.filter((x) => x.role !== 'taskManager').forEach((employee) => {
                    employee.tasks.forEach((task) => {
                        tasks.push({
                            employeeId: employee.id,
                            employeeFullName: `${employee.firstName} ${employee.lastName}`,
                            taskName: task.taskName,
                            taskDescription: task.description,
                            taskProcess: task.completed,
                            startDate: task.startDate,
                            completeDate: task.completeDate,
                        });
                    });
                });
                setState(() => tasks);
                setIsLoading(() => false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    const deleteTask = (employeeId, taskName) => {
        apiService.getOneEmployee(employeeId).then((employee) => {
            let employeeTasks = [...employee.tasks];
            const index = employeeTasks.findIndex((x) => x.taskName === taskName);
            employeeTasks.splice(index, 1);
            apiService.updateEmployee(employeeId, { tasks: employeeTasks }).then(() => {
                const task = state.find((x) => x.employeeId === employeeId && x.taskName === taskName);
                setState(() => state.filter((x) => x !== task));
            });
        });
    };

    return [state, isLoading, deleteTask];
};

export default useTasks;
