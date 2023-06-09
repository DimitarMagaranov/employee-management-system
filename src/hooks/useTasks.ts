import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import * as apiService from '../services/apiService';
import useEmployees from './useEmployees';
import { ITask, ITaskConverted, ITasksToUpdate } from '../interfaces';

const useTasks = () => {
    const [state, setState] = useState<ITaskConverted[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [, , , , , updateEmployee, , setAllEmployees] = useEmployees();

    useEffect(() => {
        setIsLoading(true);
        getAllTasks();
    }, []);

    const getAllTasks = (): void => {
        apiService
            .getAllTasks()
            .then((tasks) => {
                setState(tasks as ITaskConverted[]);
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    const deleteTask = (employeeId: string, taskName: string): void => {
        let employeeTasks = [] as ITask[];

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

    const createTask = (employeeId: string, tasksToUpdate: ITask[], setOpen: Dispatch<SetStateAction<boolean>>): void => {
        updateEmployee(employeeId, {tasks: tasksToUpdate});
        getAllTasks();
        setOpen(true);
    };

    const getCompletedTasks = (criteria: string): ITaskConverted[] => {
        const currentDate = new Date();
        const days = criteria === 'COMPLETED IN THE PAST WEEK' ? 7 : 30;
        const timeBefore = new Date(currentDate.getTime() - days * 86400000).valueOf();

        return state.filter((x) => x.completeDate! > timeBefore);
    };

    return [state, isLoading, deleteTask, getCompletedTasks, createTask] as const;
};

export default useTasks;
