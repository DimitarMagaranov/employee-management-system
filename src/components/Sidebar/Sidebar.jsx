import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled, Box, Typography, List } from '@mui/material';

import SidebarListItem from './SidebarListItem/SidebarListItem';
import { routingPaths } from '../../utils/constants';
import useEmployees from '../../hooks/useEmployees';

const StyledSidebar = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    paddingLeft: '20px',
    minHeight: '100vh',
}));

const Sidebar = ({ isTaskManager }) => {
    const [, , , , filterNewEmployees] = useEmployees();
    const [currSidebarItem, setCurrSidebarItem] = useState(isTaskManager ? 'All Employees' : 'Personal Information');
    const navigate = useNavigate();

    useEffect(() => {
        // currSidebarItem is also the current component title
        navigateTo(currSidebarItem);
    }, []);

    const sidebarItemClickHandler = (componentTitle) => {
        setCurrSidebarItem(() => componentTitle);
        navigateTo(componentTitle);
    };

    const navigateTo = (componentTitle) => {
        isTaskManager ? navigate(routingPaths.taskManager[componentTitle]) : navigate(routingPaths.employee[componentTitle]);
    }

    return (
        <StyledSidebar flex={1}>
            <Box position="fixed">
                <Typography variant="h5" marginBottom={4} paddingTop={2}>
                    {isTaskManager ? 'Task Manager' : 'Employee'} Dashboard
                </Typography>
                {isTaskManager ? (
                    <List>
                        {filterNewEmployees() && (
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
