import React, { useState, useEffect, useRef } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Divider, Toolbar, Button, Avatar, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import style from "../styles/Sidebar.module.scss"

const drawerWidth = 240;
const menuItems = [
    {id: 0, name: "Home", icon: 0},
    {id: 1, name: "Dashboard", icon: 1},
    {id: 2, name: "About", icon: 2},
];

const Sidebar = ({currentPage, setCurrentPage, logout}) => {

    const onSupport = () => {
        window.open("https://discord.gg/CYgj5DHc3t");
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
            <List sx={{ height: "100%", mb: 2 }}>
                <Box
                    sx={{ 
                        ml: 2,
                        mr: 2,
                        height: "100%",
                        position: "relative"
                    }}
                >
                {menuItems.map((item, idx) => (
                    <ListItem button key={idx} className={item.id == currentPage ? style.itemSelectedTrue : style.itemSelectedFalse} onClick={() => setCurrentPage(item.id)}>
                        <ListItemIcon>
                            {item.icon == 0 && (<HomeIcon />)}
                            {item.icon == 1 && (<DashboardIcon />)}
                            {item.icon == 2 && (<InfoIcon />)}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
                    <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
                        <ListItem button className={style.itemSelectedFalse} onClick={onSupport}>
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            <ListItemText primary="Support" />
                        </ListItem>
                        <ListItem button className={style.itemSelectedFalse} onClick={logout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </div>
                </Box>
            </List>
        </Drawer>
    )
}

export default Sidebar