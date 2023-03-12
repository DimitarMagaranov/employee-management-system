import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { auth, firebaseErrMessages } from '../../utils/firebase';
import * as apiService from '../../services/apiService';

function Register() {
    const [dateOfBirth, setDateOfBirth] = useState('1999-01-01');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [firebaseErrorMsg, setFirebaseErrorMsg] = useState('');

    const navigate = useNavigate();

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
                console.log(error.message);
                setFirebaseErrorMsg(() => firebaseErrMessages[error.message]);
            });
    }

    return (
        <div className="login">
            <h1>Register</h1>
            <form onSubmit={onRegisterFormSUbmitHandler}>
                <div className="txt_field">
                    <input
                        name="firstName"
                        id="firstName"
                        placeholder="First name"
                        type="text"
                        onChange={(e) => setFirstName(() => e.target.value)}
                        required
                    />
                </div>
                <div className="txt_field">
                    <input
                        name="lastName"
                        id="lastName"
                        placeholder="Last name"
                        type="text"
                        onChange={(e) => setLastName(() => e.target.value)}
                        required
                    />
                </div>
                <div className="txt_field">
                    <input name="email" id="email" placeholder="Email" type="text" onChange={(e) => setEmail(() => e.target.value)} required />
                </div>
                <div className="txt_field">
                    <input
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Phone number"
                        type="text"
                        onChange={(e) => setPhoneNumber(() => e.target.value)}
                        required
                    />
                </div>
                <div className="txt_field">
                    <label htmlFor="dateOfBirth">Date of birth</label>
                    <input
                        name="dateOfBirth"
                        id="dateOfBirth"
                        placeholder="Date of birth"
                        type="date"
                        onChange={(e) => setDateOfBirth(() => e.target.value)}
                        required
                    />
                </div>
                <div className="txt_field">
                    <input
                        name="password"
                        id="password"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(() => e.target.value)}
                        required
                    />
                </div>

                <span className="err-msg">{firebaseErrorMsg}</span>

                <p id="reg-msg">
                    Back to login? <Link to={'/login'}>Login</Link>
                </p>

                <input type="submit" value={'Register'} />
            </form>
        </div>
    );
}

export default Register;
