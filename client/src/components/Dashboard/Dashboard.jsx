import './Dashboard.scss';
import TaskManagerDashboard from './TaskManager/TaskManagerDashboard';
import EmployeeDashboard from './Employee/EmployeeDashboard';

const Dashboard = ({ userInfo }) => {
    const isTaskManager = userInfo?.role === 'taskManager';
    return isTaskManager ? <TaskManagerDashboard userInfo={userInfo} /> : <EmployeeDashboard userInfo={userInfo} />;
};

export default Dashboard;
