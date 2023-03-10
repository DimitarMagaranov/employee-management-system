import './Dashboard.scss';
import TaskManagerDashboard from './TaskManager/TaskManagerDashboard';
import EmployeeDashboard from './Employee/EmployeeDashboard';

const Dashboard = ({ userInfo, onChangeUserInfo }) => {
    const isTaskManager = userInfo?.role === 'taskManager';
    return isTaskManager ? <TaskManagerDashboard userInfo={userInfo} /> : <EmployeeDashboard userInfo={userInfo} onChangeUserInfo={onChangeUserInfo} />;
};

export default Dashboard;
