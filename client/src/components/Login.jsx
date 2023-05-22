import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';

import { auth, firebaseErrMessages } from '../utils/firebase';
import * as apiService from '../services/apiService';
import Form from '../styled/components/Form';

function Login({ user }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const pushError = (error) => {
        setErrors([...errors].concat([error]));
    };

    const onLoginFormSUbmitHandler = (e) => {
        e.preventDefault();
        setErrors(errors.splice());

        apiService.getAllEmployees().then((data) => {
            const user = data.find((x) => x.email === email);
            if (user === undefined) {
                pushError('User with this email does not exist.');
            } else {
                setErrors(errors.splice());
                loginToFirebase();
            }
        });
    };

    const loginToFirebase = () => {
        setErrors([]);
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                navigate('/');
            })
            .then(setErrors([]))
            .catch((error) => {
                pushError(firebaseErrMessages[error.message]);
            });
    };

    return !user ? (
        <Form
            title="Sign In"
            redirectLink="/register"
            onSubmit={onLoginFormSUbmitHandler}
            setEmail={setEmail}
            setPassword={setPassword}
            errors={errors}
        />
    ) : (
        <Navigate to="/" />
    );
}

export default Login;
