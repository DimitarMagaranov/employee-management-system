import { Typography, useTheme } from '@mui/material';

const TableTitle = ({ title }) => {
    const theme = useTheme();

    return (
        <Typography variant="h5" sx={{ color: 'white', textShadow: `1px 1px ${theme.palette.primary.main}`, letterSpacing: '2px' }}>
            {title}
        </Typography>
    );
};

export default TableTitle;
