import { FormEvent, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { auth, getFirebaseErrMessage } from '../utils/firebase';
import Form from '../styled/components/Form';
import { IFirestoreUserData } from '../interfaces';

function Login({userData}: {userData: IFirestoreUserData | null}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const navigate = useNavigate();

    const onLoginFormSUbmitHandler = async (e: FormEvent) => {
        e.preventDefault();
        setErrors([]);

        auth.signInWithEmailAndPassword(email, password)
            .then(async () => {
                navigate('/');
            })
            .catch((error: Error) => {
                console.log(error);
                const errMsg = getFirebaseErrMessage(error.message);
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
