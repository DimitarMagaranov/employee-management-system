import { useState, useEffect } from 'react';
import * as apiService from '../services/apiService';
import {auth} from '../utils/firebase';

const useEmployees = () => {
    const [state, setState] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        apiService
            .getAllEmployees()
            .then((data) => {
                setState(() => data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, [reload]);

    const updateEmployee = (employeeId, salary) => {
        const employee = state.find(x => x.id === employeeId);
        apiService
            .updateEmployee(employeeId, {
                ...employee,
                salary: salary,
                isNew: false,
            })
            .then(() => {
                setReload(!reload);
            });
    };

    const deleteEmployee = (employeeId) => {
        apiService.deleteEmployee(employeeId)
        .then((res) => {
            setReload(!reload);
        })
    }

    const employees = state?.filter((x) => x.role != 'taskManager').sort((a, b) => a.firstName.localeCompare(b.firstName));

    return [employees, isLoading, updateEmployee, deleteEmployee];
};

export default useEmployees;
