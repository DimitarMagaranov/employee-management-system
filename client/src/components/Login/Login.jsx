import './Login.scss';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../utils/firebase';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function onLoginFormSUbmitHandler(e) {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
            navigate('/');
        });
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={onLoginFormSUbmitHandler}>
                <div className="txt_field">
                    <input name="email" id="email" placeholder="Email" type="text" onChange={(e) => setEmail(() => e.target.value)} />
                    <span></span>
                </div>
                <div className="txt_field">
                    <input name="password" id="password" placeholder="Password" type="password" onChange={(e) => setPassword(() => e.target.value)} />
                    <span></span>
                </div>

                <p id="reg-msg">
                    You don't have registration? <Link to={'/register'}>Register</Link>
                </p>

                <input type="submit" value={'Login'} />
            </form>
        </div>
    );
}

export default Login;
