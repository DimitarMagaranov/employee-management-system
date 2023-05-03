import { styled } from '@mui/material/styles';

export const LoginRegisterContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '10px 10px 15px rgba(0, 0, 0, 0.05)',
}));
