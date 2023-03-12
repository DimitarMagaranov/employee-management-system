import { useState } from 'react';
import MenuItem from './MenuItem/MenuItem';
import './Sidebar.scss';

const Sidebar = ({ isTaskManager, onSelectInfoHandler, areNewEmployees }) => {
    const [currMenuItem, setCurrMenuItem] = useState(`${isTaskManager ? 'All Employees' : 'Personal Information'}`);

    const menuItemClickHandler = (menuItem) => {
        setCurrMenuItem(() => menuItem);
        onSelectInfoHandler(menuItem);
    };

    return (
        <div id="sidebar">
            <h2>{isTaskManager ? 'Task Manager' : 'Employee'} Dashboard</h2>
            {isTaskManager ? (
                <ul className="menu-items">
                    {areNewEmployees && <MenuItem onClick={menuItemClickHandler} title={'New Employees'} currMenuItem={currMenuItem} />}
                    <MenuItem onClick={menuItemClickHandler} title={'All Employees'} currMenuItem={currMenuItem} />
                    <MenuItem onClick={menuItemClickHandler} title={'Top 5 Employees'} currMenuItem={currMenuItem} />
                    <MenuItem onClick={menuItemClickHandler} title={'Tasks'} currMenuItem={currMenuItem} />
                </ul>
            ) : (
                <ul className="menu-items">
                    <MenuItem onClick={menuItemClickHandler} title={'Personal Information'} currMenuItem={currMenuItem} />
                    <MenuItem onClick={menuItemClickHandler} title={'Tasks'} currMenuItem={currMenuItem} />
                </ul>
            )}
        </div>
    );
};

export default Sidebar;
