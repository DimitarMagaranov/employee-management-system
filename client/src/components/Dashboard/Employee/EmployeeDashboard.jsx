import { useState } from 'react';

import Sidebar from '../../Sidebar/Sidebar';
import PersonalInformation from './PersonalInformation/PersonalInformation';
import Tasks from './Tasks/Tasks';

const EmployeeDashboard = ({ userInfo, setUserInfo }) => {
    const [selectedInfo, setSelectedInfo] = useState('Personal Information');

    const onSelectInfoHandler = (info) => {
        setSelectedInfo(() => info);
    };

    return (
        <div className="dashboard">
            <Sidebar isTaskManager={false} onSelectInfoHandler={onSelectInfoHandler} />
            {selectedInfo === 'Personal Information' ? (
                <PersonalInformation userInfo={userInfo} setUserInfo={setUserInfo} />
            ) : (
                <Tasks userInfo={userInfo} setUserInfo={setUserInfo} />
            )}
        </div>
    );
};

export default EmployeeDashboard;
