import './Login.scss';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../utils/firebase';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as apiService from '../../services/apiService';

function Login() {
    const [isRegistered, setIsRegistered] = useState(true);
    const [dateOfBirth, setDateOfBirth] = useState('1999-01-01');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function onLoginFormSUbmitHandler(e) {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
            navigate('/');
        });
    }

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
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    return (
        <div className="login">
            <h1>{isRegistered ? 'Login' : 'Register'}</h1>
            <form onSubmit={isRegistered ? onLoginFormSUbmitHandler : onRegisterFormSUbmitHandler}>
                {!isRegistered && (
                    <div className="txt_field">
                        <input
                            name="firstName"
                            id="firstName"
                            placeholder="First name"
                            type="text"
                            onChange={(e) => setFirstName(() => e.target.value)}
                        />
                        <span></span>
                    </div>
                )}
                {!isRegistered && (
                    <div className="txt_field">
                        <input
                            name="lastName"
                            id="lastName"
                            placeholder="Last name"
                            type="text"
                            onChange={(e) => setLastName(() => e.target.value)}
                        />
                        <span></span>
                    </div>
                )}
                <div className="txt_field">
                    <input name="email" id="email" placeholder="Email" type="text" onChange={(e) => setEmail(() => e.target.value)} />
                    <span></span>
                </div>
                {!isRegistered && (
                    <div className="txt_field">
                        <input
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Phone number"
                            type="text"
                            onChange={(e) => setPhoneNumber(() => e.target.value)}
                        />
                        <span></span>
                    </div>
                )}
                {!isRegistered && (
                    <div className="txt_field">
                        <label htmlFor="dateOfBirth">Date of birth</label>
                        <input
                            name="dateOfBirth"
                            id="dateOfBirth"
                            placeholder="Date of birth"
                            type="date"
                            onChange={(e) => setDateOfBirth(() => e.target.value)}
                        />

                        <span></span>
                    </div>
                )}
                <div className="txt_field">
                    <input name="password" id="password" placeholder="Password" type="password" onChange={(e) => setPassword(() => e.target.value)} />
                    <span></span>
                </div>

                {isRegistered ? (
                    <p id="reg-msg">
                        You don't have registration? <Link onClick={() => setIsRegistered(false)}>Register</Link>
                    </p>
                ) : (
                    <p id="reg-msg">
                        Back to login? <Link onClick={() => setIsRegistered(true)}>Login</Link>
                    </p>
                )}

                <input type="submit" value={isRegistered ? 'Login' : 'Register'} />
            </form>
        </div>
    );
}

export default Login;
