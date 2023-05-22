import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { doc, setDoc } from 'firebase/firestore';

import { auth, db, firebaseErrMessages } from '../utils/firebase';
import * as apiService from '../services/apiService';
import Form from '../styled/components/Form';

function Register({ user }) {
    const [dateOfBirth, setDateOfBirth] = useState('1999-01-01');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const pushError = (error) => {
        setErrors([...errors].concat([error]));
    };

    function onRegisterFormSUbmitHandler(e) {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                const userToDb = {
                    id: user._delegate.uid,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber,
                    role: 'employee',
                    dateOfBirth: dateOfBirth,
                    salary: '0',
                    tasks: [],
                    isNew: true,
                };
                apiService.createEmployee(userToDb).then(() => navigate('/'));
            })
            .then(() => {
                setDoc(doc(db, 'cities', 'LA'), {
                    name: 'Los Angeles',
                    state: 'CA',
                    country: 'USA',
                });
            })
            .catch((error) => {
                pushError(firebaseErrMessages[error.message]);
            });
    }

    return !user ? (
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
