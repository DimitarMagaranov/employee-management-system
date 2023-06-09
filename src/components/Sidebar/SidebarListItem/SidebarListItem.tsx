import { ListItemButton, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import { ISidebarListItemProps } from '../../../interfaces';

const SidebarListItem = ({ onClick, title, currSidebarItem }: ISidebarListItemProps) => {
    let classes = ['nav-link'];

    if (currSidebarItem === title) {
        classes.push('selected');
    }

    return (
        <ListItem disablePadding>
            <ListItemButton component="a" onClick={() => onClick(title)}>
                <ListItemIcon>
                    <FormatListBulletedIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={
                        <Typography sx={{ fontWeight: currSidebarItem === title ? '500' : '300' }}>
                            {title}
                        </Typography>
                    }
                />
            </ListItemButton>
        </ListItem>
    );
};

export default SidebarListItem;
