import { useState } from 'react';
import MenuItem from './MenuItem/MenuItem';
import './Sidebar.scss';

const Sidebar = ({ isTaskManager, onSelectInfoHandler }) => {
    const [currMenuItem, setCurrMenuItem] = useState(`${isTaskManager ? 'employees' : 'Personal Information'}`);

    const menuItemClickHandler = (menuItem) => {
        setCurrMenuItem(() => menuItem);
        onSelectInfoHandler(menuItem);
    };

    return (
        <div id="sidebar">
            <h2>{isTaskManager ? 'Task Manager' : 'Employee'} Dashboard</h2>
            {isTaskManager ? (
                <ul className="menu-items">
                    <MenuItem onClick={menuItemClickHandler} title={'Personal Information'} currMenuItem={currMenuItem} />
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
