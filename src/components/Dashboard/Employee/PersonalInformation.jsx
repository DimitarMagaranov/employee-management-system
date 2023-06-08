import { useState } from 'react';

import { TextField, Grid, Button, useTheme } from '@mui/material';

import { auth } from '../../../utils/firebase';
import DashboardInfoContainer from '../../../styled/components/layout/DashboardInfoContainer';
import useEmployees from '../../../hooks/useEmployees';

const PersonalInformation = ({ userData, setUserData }) => {
    const theme = useTheme();
    const [email, setEmail] = useState(userData?.email);
    const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber);
    const [password, setPassword] = useState('');
    const [, , , , , updateEmployee] = useEmployees();


    const onChangeDetailsSubmitHandler = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                userCredential.user
                    .updateEmail(email)
                    .then(() => {
                        updateEmployee(userData.id, {email, phoneNumber});
                    })
                    .then(() => {
                        setUserData((oldInfo) => ({ ...oldInfo, email, phoneNumber}));
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return !userData ? (
        <div>Loading...</div>
    ) : (
        <DashboardInfoContainer>
            <form
                style={{
                    marginLeft: '50px',
                    padding: '0px 40px 20px 40px',
                    width: '30%',
                }}
                onSubmit={onChangeDetailsSubmitHandler}
            >
                <Grid container spacing={2}>
                    <Grid item sx={{ width: '100%' }}>
                        <TextField
                            sx={{ width: '100%', backgroundColor: 'rgb(240, 240, 240)' }}
                            disabled
                            type="text"
                            label="Full name"
                            name="Full name"
                            placeholder="Full name"
                            defaultValue={`${userData?.firstName} ${userData?.lastName}`}
                            InputLabelProps={{
                                style: { color: theme.palette.primary.main },
                            }}
                        />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <TextField
                            sx={{ width: '100%', backgroundColor: 'rgb(240, 240, 240)' }}
                            disabled
                            type="text"
                            label="Date of birth"
                            name="Date of birth"
                            placeholder="Date of birth"
                            defaultValue={userData?.dateOfBirth}
                            InputLabelProps={{
                                style: { color: theme.palette.primary.main },
                            }}
                        />
                    </Grid>
                    <Grid item sx={{ width: '100%', display: !userData?.isNew ? 'block' : 'none' }}>
                        <TextField
                            sx={{ width: '100%', backgroundColor: 'rgb(240, 240, 240)' }}
                            disabled
                            type="text"
                            label="Salary"
                            name="Salary"
                            placeholder="Salary"
                            defaultValue={userData?.salary}
                            InputLabelProps={{
                                style: { color: theme.palette.primary.main },
                            }}
                        />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <TextField
                            sx={{ width: '100%', backgroundColor: 'rgb(240, 240, 240)' }}
                            type="email"
                            label="email"
                            name="email"
                            placeholder="Email"
                            defaultValue={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputLabelProps={{
                                style: { color: theme.palette.primary.main },
                            }}
                        />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <TextField
                            sx={{ width: '100%', backgroundColor: 'rgb(240, 240, 240)' }}
                            type="text"
                            label="Phone number"
                            name="phoneNumber"
                            placeholder="Phone number"
                            defaultValue={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            InputLabelProps={{
                                style: { color: theme.palette.primary.main },
                            }}
                        />
                    </Grid>
                    <Grid item sx={{ width: '100%', marginBottom: '20px' }}>
                        <TextField
                            sx={{ width: '100%', backgroundColor: 'rgb(240, 240, 240)' }}
                            type="text"
                            label="Password"
                            name="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            InputLabelProps={{
                                style: { color: theme.palette.primary.main },
                            }}
                        />
                    </Grid>
                </Grid>
                <Button variant="contained" sx={{ margin: 'auto' }} type="submit">
                    change
                </Button>
            </form>
        </DashboardInfoContainer>
    );
};

export default PersonalInformation;
