import './Header.scss';
import { NavLink } from 'react-router-dom';

const header = ({ isAuthenticated, userEmail }) => {
    return (
        <header id="site-header">
            <nav className="navbar">
                {isAuthenticated ? (
                    <ul>
                        <li>Welcome, {userEmail}!</li>
                        <li>
                            <NavLink to="/logout">
                                <i className="fas fa-sign-out-alt"></i> Log Out
                            </NavLink>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <NavLink to="/login">
                                <i className="fas fa-sign-in-alt"></i> Login
                            </NavLink>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
};

export default header;