import { useEffect, useState } from 'react';

import { TextField, Grid, Button, useTheme } from '@mui/material';

import { auth } from '../../../utils/firebase';
import * as apiService from '../../../services/apiService';
import DashboardInfoContainer from '../../../styled/components/layout/DashboardInfoContainer';

const PersonalInformation = ({ userInfo, setUserInfo }) => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        setIsLoading(() => !userInfo?.firstName);
    }, [userInfo]);

    const onChangeDetailsSubmitHandler = (e) => {
        e.preventDefault();
        const newInfo = {
            email: e.target.email.value,
            phoneNumber: e.target.phoneNumber.value,
        };

        auth.signInWithEmailAndPassword(userInfo?.email, e.target.password.value).then(function (userCredential) {
            userCredential.userInfo.updateEmail(newInfo.email);
        });

        apiService.updateEmployee(userInfo.id, newInfo).then((data) => setUserInfo(data));
    };

    return isLoading ? (
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
                <Grid container spacing={2} direction="col">
                    <Grid item sx={{ width: '100%' }}>
                        <TextField
                            sx={{ width: '100%', backgroundColor: 'rgb(240, 240, 240)' }}
                            disabled
                            type="text"
                            label="Full name"
                            name="Full name"
                            placeholder="Full name"
                            defaultValue={`${userInfo?.firstName} ${userInfo?.lastName}`}
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
                            defaultValue={userInfo?.dateOfBirth}
                            InputLabelProps={{
                                style: { color: theme.palette.primary.main },
                            }}
                        />
                    </Grid>
                    {!userInfo?.isNew && (
                        <Grid item sx={{ width: '100%' }}>
                            <TextField
                                sx={{ width: '100%', backgroundColor: 'rgb(240, 240, 240)' }}
                                disabled
                                type="text"
                                label="Salary"
                                name="Salary"
                                placeholder="Salary"
                                defaultValue={userInfo?.salary}
                                InputLabelProps={{
                                    style: { color: theme.palette.primary.main },
                                }}
                            />
                        </Grid>
                    )}
                    <Grid item sx={{ width: '100%' }}>
                        <TextField
                            sx={{ width: '100%', backgroundColor: 'rgb(240, 240, 240)' }}
                            type="email"
                            label="Email"
                            name="Email"
                            placeholder="Email"
                            defaultValue={userInfo?.email}
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
                            name="Phone number"
                            placeholder="Phone number"
                            defaultValue={userInfo?.phoneNumber}
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
                            name="Password"
                            placeholder="Password"
                            InputLabelProps={{
                                style: { color: theme.palette.primary.main },
                            }}
                        />
                    </Grid>
                    <Button variant="contained" sx={{ margin: 'auto' }} type="submit">
                        change
                    </Button>
                </Grid>
            </form>
        </DashboardInfoContainer>
    );
};

export default PersonalInformation;
