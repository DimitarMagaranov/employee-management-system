import { useState } from 'react';

import { Box } from '@mui/material';

import Sidebar from '../../Sidebar/Sidebar';
import PersonalInformation from './PersonalInformation';
import Tasks from './Tasks';

const EmployeeDashboard = ({ userInfo, setUserInfo }) => {
    const [selectedInfo, setSelectedInfo] = useState('Personal Information');

    const onSelectInfoHandler = (info) => {
        setSelectedInfo(() => info);
    };

    return (
        <Box sx={{ width: '100%', display: 'flex' }}>
            <Sidebar isTaskManager={false} onSelectInfoHandler={onSelectInfoHandler} />
            {selectedInfo === 'Personal Information' ? (
                <PersonalInformation userInfo={userInfo} setUserInfo={setUserInfo} />
            ) : (
                <Tasks userInfo={userInfo} setUserInfo={setUserInfo} />
            )}
        </Box>
    );
};

export default EmployeeDashboard;
