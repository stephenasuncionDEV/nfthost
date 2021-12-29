import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, IconButton, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import style from "../../../styles/HostContainer.module.scss"

const HostContainer = () => {
    const [hostList, setHostList] = useState([{

    }]);

    return (
        <Card className={style.card}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    NFT Host
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Websites:
                </Typography>
                <div className={style.firstLayout}>
                    <List className={style.hostList}>
                        <ListItem>
                            <ListItemIcon>
                                <WebAssetIcon />
                            </ListItemIcon>
                            <ListItemText primary="Test"/>
                        </ListItem>
                    </List>
                    <div>
                        
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default HostContainer