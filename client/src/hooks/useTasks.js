import { useState, useEffect } from 'react';
import * as apiService from '../services/apiService';

const useTasks = () => {
    const [state, setState] = useState([]);
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        setIsLoading(true);
        apiService.getAllEmployees().then((data) => {
            let tasks = [];
            data.filter(x => x.role !== 'taskManager').forEach((employee) => {
                employee.tasks.forEach((task) => {
                    tasks.push({
                        employeeId: employee.id,
                        employeeFullName: `${employee.firstName} ${employee.lastName}`,
                        taskName: task.taskName,
                        taskDescription: task.description,
                        taskProcess: task.completed
                    });
                });
            });
            setState(() => tasks);
            setIsLoading(() => false);
        });
    }, []);

    return [state, isLoading, setState];
};

export default useTasks;