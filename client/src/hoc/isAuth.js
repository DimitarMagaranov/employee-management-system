import {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function isAuth(WrappedComponent) {
    
    function WrapperComponent(props) {
        const {isAuthenticated} = useContext(AuthContext);
        const navigate = useNavigate();

        if (!isAuthenticated) {
            navigate('/login');
        }

        return <WrappedComponent {...props} />;
    }

    return WrapperComponent;
};

export default isAuth;