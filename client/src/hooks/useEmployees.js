import { useState, useEffect } from 'react';
import * as taskManagerService from '../services/taskManagerService';

const useEmployees = () => {
    const [state, setState] = useState([]);
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        setIsLoading(true);
        taskManagerService
            .getAllEmployees()
            .then((data) => {
                setState(() => data);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    return [state?.filter((x) => x.role != 'taskManager').sort((a, b) => a.firstName.localeCompare(b.firstName)), isLoading];
};

export default useEmployees;
