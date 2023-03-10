import { useState } from 'react';
import MenuItem from './MenuItem/MenuItem';
import './Sidebar.scss';

const Sidebar = ({onSelectInfoHandler}) => {
    const [currMenuItem, setCurrMenuItem] = useState('Personal Information');

    const menuItemClickHandler = (menuItem) => {
        setCurrMenuItem(() => menuItem);
        onSelectInfoHandler(menuItem);
    }

    return (
        <div id="sidebar">
            <h2>Employee Dashboard</h2>
            <ul className="menu-items">
                <MenuItem onClick={menuItemClickHandler} title={'Personal Information'} currMenuItem={currMenuItem}/>
                <MenuItem onClick={menuItemClickHandler} title={'Tasks'} currMenuItem={currMenuItem}/>
            </ul>
        </div>
    );
};

export default Sidebar;
