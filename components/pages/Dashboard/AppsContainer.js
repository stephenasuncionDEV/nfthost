import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import GiteIcon from '@mui/icons-material/Gite';
import PrecisionManufacturingSharpIcon from '@mui/icons-material/PrecisionManufacturingSharp';
import style from "../../../styles/AppsContainer.module.scss"

const AppsContainer = ({setCurrentApp}) => {
    const onClick = (value) => {
        setCurrentApp(value);
    }

    return (
        <Card className={style.card}>
            <CardContent className={style.cardContent}>
                <Typography variant="h6" gutterBottom>
                    Your Applications
                </Typography>
                <div className={style.appsContainer}>
                    <IconButton 
                        aria-label="Host NFT Drops" 
                        size="large" 
                        className={style.button} 
                        sx={{ bgcolor: "rgb(233,30,99)" }} 
                        onClick={() => onClick(0)}
                    >
                        <GiteIcon />
                    </IconButton>
                    <IconButton 
                        aria-label="Generate NFTs" 
                        size="large" 
                        className={style.button} 
                        sx={{ bgcolor: "rgb(32,129,226)" }} 
                        onClick={() => onClick(1)}
                    >
                        <PrecisionManufacturingSharpIcon />
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    )
}

export default AppsContainer