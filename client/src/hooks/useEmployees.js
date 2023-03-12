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

    return [state?.filter((x) => x.role != 'taskManager').sort((a, b) => a.firstName.localeCompare(b.firstName)), isLoading, setState];
};

export default useEmployees;
