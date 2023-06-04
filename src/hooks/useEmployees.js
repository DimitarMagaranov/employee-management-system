import { useState, useEffect } from 'react';

import * as apiService from '../services/apiService';

const useEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        setIsLoading(true);
        apiService
            .getAllEmployees()
            .then((data) => {
                setEmployees(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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

    

    return [employees, setEmployees, isLoading, sortTop5Employees];
};

export default useEmployees;
