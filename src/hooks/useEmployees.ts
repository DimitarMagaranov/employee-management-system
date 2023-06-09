import { useState, useEffect } from 'react';

import * as apiService from '../services/apiService';
import { IFirestoreUserData } from '../interfaces';

const useEmployees = () => {
    const [employees, setEmployees] = useState<IFirestoreUserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setAllEmployees();
    }, []);

    const setAllEmployees = (): void => {
        setIsLoading(true);
        apiService
            .getAllEmployees()
            .then((data) => {
                setEmployees(data as IFirestoreUserData[]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    const sortTop5Employees = (): IFirestoreUserData[] => {
        const currentDate = new Date();
        const timeBefore30Days = new Date(currentDate.getTime() - 30 * 86400000).valueOf();
        const sorted = [...employees]
            ?.sort(
                (a, b) =>
                    b.tasks.filter((x) => x.completed === true && x.completeDate > timeBefore30Days).length -
                    a.tasks.filter((x) => x.completed === true).length
            )
            .slice(0, 5);
        return sorted;
    };

    const filterNewEmployees = (): IFirestoreUserData[] => {
        return employees?.filter((x) => x.isNew === true);
    };

    const updateEmployee = (employeeId: string, data: any) => {
        apiService
            .updateEmployee(employeeId, data)
            .then(() => {
                setAllEmployees();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getOneEmployee = async (employeeId: string): Promise<IFirestoreUserData> => {
        // const employee = apiService.getOneEmployee(employeeId)
        // .then((data) => {
        //     return data as IFirestoreUserData;
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
        const employee = await apiService.getOneEmployee(employeeId);

        return employee as IFirestoreUserData;
    };

    return [employees, setEmployees, isLoading, sortTop5Employees, filterNewEmployees, updateEmployee, getOneEmployee, setAllEmployees] as const;
};

export default useEmployees;
