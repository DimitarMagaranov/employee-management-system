import { NavLink } from 'react-router-dom';

import { AppBar, Box, Toolbar, Typography, styled } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { IFirestoreUserData } from '../interfaces';

const SAppBar = styled(AppBar)({
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: 'white',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
});

const SToolbar = styled(Toolbar)(({theme}) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    letterSpacing: '0.05rem',
    padding: 0,
    paddingRight: '16px',
    color: theme.palette.primary.main,
    boxShadow: '0px 10px 18px -11px rgba(0, 0, 0, 0.75)',
    height: '55px',
}));

const SBox = styled(Box)(({theme}) => ({
    display: 'flex',
    gap: theme.spacing(3),
    fontWeight: '500',
}));

const Header = ({userData}: {userData: IFirestoreUserData | null}) => {
    return (
        <SAppBar>
            <SToolbar className="toolbar">
                {userData ? (
                    <SBox>
                        <Typography>Welcome, {userData.email}!</Typography>
                        <NavLink to="/logout" style={{ textDecoration: 'none' }}>
                            <Typography display="flex" alignItems="center" fontSize="16px">
                                <LogoutIcon sx={{ marginRight: '5px' }} /> Log Out
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
