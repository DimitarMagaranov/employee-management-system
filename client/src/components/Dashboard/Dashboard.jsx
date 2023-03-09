import './Dashboard.scss';
import TaskManagerDashboard from './TaskManager/TaskManagerDashboard';
import EmployeeDashboard from './Employee/EmployeeDashboard';

const Dashboard = ({ isTaskManager }) => {
    return isTaskManager ? <TaskManagerDashboard /> : <EmployeeDashboard />;
};

export default Dashboard;
