import { useNavigate } from 'react-router-dom';

import { auth } from '../utils/firebase';

function Logout({ setUserInfo }) {
    const navigate = useNavigate();

    auth.signOut().then(() => {
        setUserInfo(null);
        navigate('/login');
    });
}

export default Logout;
