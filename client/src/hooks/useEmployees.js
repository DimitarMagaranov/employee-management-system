import { useState, useEffect } from 'react';
import * as apiService from '../services/apiService';

const useEmployees = () => {
    const [state, setState] = useState([]);
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        setIsLoading(true);
        apiService
            .getAllEmployees()
            .then((data) => {
                setState(() => data);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    const updateEmployee = (employeeId, salary) => {
        const employee = state.find(x => x.id === employeeId);
        apiService
            .updateEmployee(employeeId, {
                ...employee,
                salary: salary,
                isNew: false,
            })
            .then(() => {
                setState(() => state.filter((x) => x.id !== employee.id));
            });
    };

    const employees = state?.filter((x) => x.role != 'taskManager').sort((a, b) => a.firstName.localeCompare(b.firstName));

    return [employees, isLoading, updateEmployee];
};

export default useEmployees;
