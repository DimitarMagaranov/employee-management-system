import { useState } from 'react';

import { styled, Box, Typography, List } from '@mui/material';

import SidebarListItem from './SidebarListItem/SidebarListItem';

const StyledSidebar = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    paddingLeft: '20px',
    minHeight: '100vh',
}));

const Sidebar = ({ isTaskManager, setSelectedInfo, areNewEmployees }) => {
    const [currSidebarItem, setCurrSidebarItem] = useState(`${isTaskManager ? 'All Employees' : 'Personal Information'}`);

    const sidebarItemClickHandler = (menuItem) => {
        setCurrSidebarItem(() => menuItem);
        setSelectedInfo(menuItem);
    };

    return (
        <StyledSidebar flex={1}>
            <Box position="fixed">
                <Typography variant="h5" marginBottom={4} paddingTop={2}>
                    {isTaskManager ? 'Task Manager' : 'Employee'} Dashboard
                </Typography>
                {isTaskManager ? (
                    <List>
                        {areNewEmployees && (
                            <SidebarListItem onClick={sidebarItemClickHandler} title={'New Employees'} currSidebarItem={currSidebarItem} />
                        )}
                        <SidebarListItem onClick={sidebarItemClickHandler} title={'All Employees'} currSidebarItem={currSidebarItem} />
                        <SidebarListItem onClick={sidebarItemClickHandler} title={'Top 5 Employees'} currSidebarItem={currSidebarItem} />
                        <SidebarListItem onClick={sidebarItemClickHandler} title={'Tasks'} currSidebarItem={currSidebarItem} />
                    </List>
                ) : (
                    <List>
                        <SidebarListItem onClick={sidebarItemClickHandler} title={'Personal Information'} currSidebarItem={currSidebarItem} />
                        <SidebarListItem onClick={sidebarItemClickHandler} title={'Tasks'} currSidebarItem={currSidebarItem} />
                    </List>
                )}
            </Box>
        </StyledSidebar>
    );
};

export default Sidebar;
