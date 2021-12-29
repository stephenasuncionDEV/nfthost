import React, { useState, useEffect, useRef } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Divider, Toolbar, Button, Avatar, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import style from "../styles/Sidebar.module.scss"

const drawerWidth = 240;
const menuItems = [
    {id: 0, name: "Home", icon: 0},
    {id: 1, name: "Dashboard", icon: 1},
    {id: 2, name: "About", icon: 2},
    {id: 3, name: "Logout", icon: 3}
];

const Sidebar = ({currentPage, setCurrentPage, logout}) => {
    const onItemClick = (itemID) => {
        if (itemID == 3) {
            logout();
        }
        else {
            setCurrentPage(itemID)
        }
    }

    return (
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar className={style.logo}>
                <Button
                    variant="text"
                    color="secondary"
                    startIcon={<Avatar src="/logo.png" />}
                    href="/"
                >
                    NFT Host
                </Button>
            </Toolbar>
            <Divider />
            <List>
                <Box
                    sx={{ 
                        ml: 2,
                        mr: 2
                    }}
                    >
                    {menuItems.map((item, idx) => (
                        <ListItem button key={idx} className={item.id == currentPage ? style.itemSelectedTrue : style.itemSelectedFalse} onClick={() => onItemClick(item.id)}>
                            <ListItemIcon>
                                {item.icon == 0 && (<HomeIcon />)}
                                {item.icon == 1 && (<DashboardIcon />)}
                                {item.icon == 2 && (<InfoIcon />)}
                                {item.icon == 3 && (<LogoutIcon />)}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
                </Box>
            </List>
        </Drawer>
    )
}

export default Sidebar