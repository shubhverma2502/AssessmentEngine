import { Avatar, Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../edvenswa.ae.auth/actions/actions";
import { Logout, People } from "@mui/icons-material";

const LOGOUT_ACTION = "LOGOUT";
const SETTTINGS_MENU_ITEMS = [
    {
        label: "Profile",
        navigateTo: "/console/profile",
        icon: <People />
    },
    {
        label: "Logout",
        action: LOGOUT_ACTION,
        icon: <Logout />
    }
];

export default function SettingsMenu(props) {

    const { user } = props;

    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogoutClick = () => {
        doLogout();
        navigate("/");
    };

    const handleNavigation = (action, navigateTo) => {
        handleCloseUserMenu();
        if (action === LOGOUT_ACTION) {
            handleLogoutClick();
            return;
        }
        navigate(navigateTo);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                    <Avatar alt={user ? (user?.username) : ""} src={user.profileImage} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuList>
                    {SETTTINGS_MENU_ITEMS.map((SETTING_MENU_ITEM, index) => (
                        <MenuItem key={index} onClick={() => handleNavigation(SETTING_MENU_ITEM.action, SETTING_MENU_ITEM.navigateTo)}>
                            <ListItemIcon>
                                { SETTING_MENU_ITEM.icon }
                            </ListItemIcon>
                            <ListItemText>
                                {SETTING_MENU_ITEM.label}
                            </ListItemText>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Box>
    )
}