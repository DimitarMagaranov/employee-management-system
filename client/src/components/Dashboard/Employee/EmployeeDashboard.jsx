import { useState } from 'react';
import './EmployeeDashboard.scss';
import Sidebar from '../../Sidebar/Sidebar';
import PersonalInformation from './PersonalInformation/PersonalInformation';
import Tasks from './Tasks/Tasks';

const EmployeeDashboard = ({ userInfo, onChangeUserInfo }) => {
    const [selectedInfo, setSelectedInfo] = useState('Personal Information');

    const onSelectInfoHandler = (info) => {
        setSelectedInfo(() => info);
    };

    return (
        <div className="dashboard">
            <Sidebar isTaskManager={false} onSelectInfoHandler={onSelectInfoHandler} />
            {selectedInfo === 'Personal Information' ? (
                <PersonalInformation userInfo={userInfo} onChangeUserInfo={onChangeUserInfo} />
            ) : (
                <Tasks userInfo={userInfo} onChangeUserInfo={onChangeUserInfo} />
            )}
        </div>
    );
};

export default EmployeeDashboard;
