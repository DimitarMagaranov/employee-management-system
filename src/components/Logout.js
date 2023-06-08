import { useNavigate } from 'react-router-dom';

import { auth } from '../utils/firebase';

function Logout({ setUserData }) {
    const navigate = useNavigate();

    auth.signOut().then(() => {
        setUserData(null);
        navigate('/login');
    });
}

export default Logout;
