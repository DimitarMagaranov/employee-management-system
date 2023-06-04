import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import * as apiService from '../services/apiService';

import { firebaseErrMessages } from '../utils/firebase';
import Form from '../styled/components/Form';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

function Register() {
    const [dateOfBirth, setDateOfBirth] = useState('1999-01-01');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();

    const pushError = (error) => {
        setErrors([...errors].concat([error]));
    };

    const onRegisterFormSUbmitHandler = async (e) => {
        e.preventDefault();

        const userToDb = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            role: 'employee',
            dateOfBirth: dateOfBirth,
            salary: '0',
            tasks: [],
            deleted: false,
            isNew: true,
        };

        apiService
            .createEmployee(email, password, userToDb)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                pushError(firebaseErrMessages[error.message]);
            });
    };

    return !isAuthenticated ? (
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
    ) : (
        <Navigate to="/" />
    );
}

export default Register;
