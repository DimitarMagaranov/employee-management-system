import { NavLink } from 'react-router-dom';

import { AppBar, Box, Toolbar, Typography, styled, useTheme } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const Header = ({ user }) => {
    const {isAuthenticated, userEmail} = useContext(AuthContext);
    const theme = useTheme();

    const SAppBar = styled(AppBar)({
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: 'white',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
    });

    const SToolbar = styled(Toolbar)({
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        letterSpacing: '0.05rem',
        padding: 0,
        paddingRight: '16px',
        color: theme.palette.primary.main,
        boxShadow: '0px 10px 18px -11px rgba(0, 0, 0, 0.75)',
        height: '55px',
    });

    const SBox = styled(Box)({
        display: 'flex',
        gap: theme.spacing(3),
        fontWeight: '500',
    });

    return (
        <SAppBar>
            <SToolbar className="toolbar">
                {isAuthenticated ? (
                    <SBox>
                        <Typography>Welcome, {userEmail}!</Typography>
                        <NavLink to="/logout" style={{ textDecoration: 'none' }}>
                            <Typography display="flex" alignItems="center" fontSize="16px">
                                <LogoutIcon sx={{ marginRight: '5px' }} fontSize="16px" /> Log Out
                            </Typography>
                        </NavLink>
                    </SBox>
                ) : (
                    <SBox>
                        <NavLink to="/login" style={{ textDecoration: 'none' }}>
                            Login
                        </NavLink>
                        <NavLink to="/register" style={{ textDecoration: 'none' }}>
                            Register
                        </NavLink>
                    </SBox>
                )}
            </SToolbar>
        </SAppBar>
    );
};

export default Header;
