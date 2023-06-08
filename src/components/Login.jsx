import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { auth, firebaseErrMessages } from '../utils/firebase';
import Form from '../styled/components/Form';

function Login({userData}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const onLoginFormSUbmitHandler = async (e) => {
        e.preventDefault();
        setErrors([]);

        auth.signInWithEmailAndPassword(email, password)
            .then(async () => {
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                const errMsg = firebaseErrMessages[error.message];
                setErrors([...errors].concat([errMsg ?? error.message]));
            });
    };

    if (userData) {
        return <Navigate to="/dashboard" />;
    } else {
        return (
            <Form
                title="Sign In"
                redirectLink="/register"
                onSubmit={onLoginFormSUbmitHandler}
                setEmail={setEmail}
                setPassword={setPassword}
                errors={errors}
            />
        );
    }
}

export default Login;
