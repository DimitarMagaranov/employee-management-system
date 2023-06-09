import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import * as apiService from '../services/apiService';
import { getFirebaseErrMessage } from '../utils/firebase';
import Form from '../styled/components/Form';
import { IFirestoreUserData, ITask } from '../interfaces';

function Register({ userData }: {userData: IFirestoreUserData | null}) {
    const [dateOfBirth, setDateOfBirth] = useState('1999-01-01');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const navigate = useNavigate();

    const pushError = (error: string) => {
        setErrors([...errors].concat([error]));
    };

    const onRegisterFormSUbmitHandler = async (e: FormEvent) => {
        e.preventDefault();

        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            role: 'employee',
            dateOfBirth: dateOfBirth,
            salary: '0',
            tasks: [] as ITask[],
            deleted: false,
            isNew: true,
        };

        apiService
            .createEmployee(email, password, data)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                pushError(getFirebaseErrMessage(error.message));
            });
    };

    if (userData) {
        return <Navigate to="/dashboard" />;
    } else {
        return (
            <Form
                title="Register"
                redirectLink="/login"
                onSubmit={onRegisterFormSUbmitHandler}
                setEmail={setEmail}
                setPassword={setPassword}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setPhoneNumber={setPhoneNumber}
                setDateOfBirth={setDateOfBirth}
                errors={errors}
            />
        );
    }
}

export default Register;
