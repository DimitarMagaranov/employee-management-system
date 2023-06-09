import { useState, useEffect } from 'react';

import * as apiService from '../services/apiService';

const useEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        setAllEmployees();
    }, []);

    const setAllEmployees = () => {
        setIsLoading(true);
        apiService
            .getAllEmployees()
            .then((data) => {
                setEmployees(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    const sortTop5Employees = () => {
        const currentDate = new Date();
        const timeBefore30Days = new Date(currentDate.getTime() - 30 * 86400000);
        const sorted = [...employees]
            ?.sort(
                (a, b) =>
                    b.tasks.filter((x) => x.completed === true && x.completeDate > timeBefore30Days).length -
                    a.tasks.filter((x) => x.completed === true).length
            )
            .slice(0, 5);
        return sorted;
    };

    const filterNewEmployees = () => {
        return employees?.filter((x) => x.isNew === true);
    };

    const updateEmployee = (employeeId, data) => {
        apiService
            .updateEmployee(employeeId, data)
            .then(() => {
                setAllEmployees();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getOneEmployee = (employeeId) => {
        const employee = apiService.getOneEmployee(employeeId)
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error);
        })

        return employee;
    };

    return [employees, setEmployees, isLoading, sortTop5Employees, filterNewEmployees, updateEmployee, getOneEmployee];
};

export default useEmployees;
