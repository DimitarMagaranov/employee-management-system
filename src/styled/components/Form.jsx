import { Link } from 'react-router-dom';

import { useTheme, styled } from '@mui/material/styles';
import { Button, Grid, TextField, Typography } from '@mui/material';

import { LoginRegisterContainer } from './layout/LoginRegisterContainer';

const SForm = styled('form')(() => ({
    padding: '40px',
}));

const Form = ({ title, redirectLink, onSubmit, setEmail, setPassword, setFirstName, setLastName, setPhoneNumber, setDateOfBirth, errors }) => {
    const theme = useTheme();

    return (
        <LoginRegisterContainer>
            <SForm onSubmit={onSubmit}>
                <Typography variant="h4" sx={{ textAlign: 'center', color: theme.palette.primary.main, marginBottom: 2 }}>
                    {title}
                </Typography>
                <Grid container spacing={2}>
                    {title === 'Sign In' ? (
                        <>
                            <Grid item width="100%">
                                <TextField
                                    type="email"
                                    label="Email"
                                    name="email"
                                    placeholder="Enter email"
                                    fullWidth
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item width="100%">
                                <TextField
                                    label="Password"
                                    name="password"
                                    placeholder="Enter password"
                                    type="password"
                                    fullWidth
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item width="100%">
                                <TextField
                                    type="text"
                                    label="First name"
                                    name="firstName"
                                    placeholder="First name"
                                    fullWidth
                                    required
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item width="100%">
                                <TextField
                                    type="text"
                                    label="Last name"
                                    name="lastName"
                                    placeholder="Last name"
                                    fullWidth
                                    required
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                            <Grid item width="100%">
                                <TextField
                                    type="email"
                                    label="Email"
                                    name="email"
                                    placeholder="Enter email"
                                    fullWidth
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item width="100%">
                                <TextField
                                    type="text"
                                    label="Phone number"
                                    name="phoneNumber"
                                    placeholder="Phone number"
                                    fullWidth
                                    required
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </Grid>
                            <Grid item width="100%">
                                <TextField
                                    type="date"
                                    label="Date og birth"
                                    name="dateOfBirth"
                                    placeholder="Date og birth"
                                    fullWidth
                                    required
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                />
                            </Grid>
                            <Grid item width="100%">
                                <TextField
                                    label="Password"
                                    name="password"
                                    placeholder="Enter password"
                                    type="password"
                                    fullWidth
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                        </>
                    )}
                </Grid>
                {errors.map((e) => (
                    <Typography variant="span" color="red">
                        {e}
                    </Typography>
                ))}
                <Button type="submit" color="primary" variant="contained" sx={{ margin: '8px 0' }} fullWidth>
                    Sign in
                </Button>
                {title === 'Sign In' ? (
                    <Typography>
                        Do you have an account ?<Link to={redirectLink}>Sign Up</Link>
                    </Typography>
                ) : (
                    <Typography>
                        Back to login? <Link to={redirectLink}>Login</Link>
                    </Typography>
                )}
            </SForm>
        </LoginRegisterContainer>
    );
};

export default Form;
