import React, { useState, useEffect, useRef } from "react";
import { Typography, Button } from '@mui/material';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import AddIcon from '@mui/icons-material/Add';
import style from "../../../styles/WebsiteContainer.module.scss"

const WebsiteContainer = ({hostList, onCreate, onClickHost}) => {
    return (
        <div className={style.websiteContainer}>
            <Button variant="outlined" component="label" className={style.websiteProp} onClick={onCreate}>
                <AddIcon />
                <Typography sx={{fontSize: 12}}>
                    Create
                </Typography>
            </Button>
            {hostList.map((host, idx) => (
                <Button variant="outlined" component="label" className={style.websiteProp} key={idx} onClick={() => onClickHost(host)}>
                    <WebAssetIcon />
                    <Typography sx={{fontSize: 12}}>
                        {host.title.length > 11 ? host.title.substring(0, 7) + "..." : host.title}
                    </Typography>
                </Button>
            ))}
        </div>
    )
}

export default WebsiteContainer