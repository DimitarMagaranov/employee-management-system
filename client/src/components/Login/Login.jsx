import './Login.scss';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../utils/firebase';

function Login() {
    const navigate = useNavigate();

    function onLoginFormSUbmitHandler(e) {
        e.preventDefault();
        const username = e.target.email.value;
        const password = e.target.password.value;

        auth.signInWithEmailAndPassword(username, password).then((userCredential) => {
            navigate('/');
        });
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={onLoginFormSUbmitHandler}>
                <div className="txt_field">
                    <input name="email" id="email" placeholder="Email" type="text" />
                    <span></span>
                </div>
                <div className="txt_field">
                    <input name="password" id="password" placeholder="Password" type="password" />
                    <span></span>
                </div>
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default Login;
