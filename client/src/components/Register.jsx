import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { auth, db, firebaseErrMessages } from '../utils/firebase';
import * as apiService from '../services/apiService';
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
    const {isAuthenticated} = useContext(AuthContext);

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
                apiService
                    .createEmployee(userToDb)
                    .then(() => {
                        setDoc(doc(db, 'users', user._delegate.uid), {
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
                            timeStamp: serverTimestamp(),
                        });
                    })
                    .then(() => navigate('/'));
            })
            .catch((error) => {
                pushError(firebaseErrMessages[error.message]);
            });
    }

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
