import { useNavigate } from 'react-router-dom';

import { auth } from '../../utils/firebase';

function Logout() {
    const navigate = useNavigate();

    auth.signOut().then(() => navigate('/login'));
}

export default Logout;
