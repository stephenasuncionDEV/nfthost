import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import style from "../../../styles/HostContainer.module.scss"

const GeneratorContainer = () => {
    return (
        <Card className={style.card}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    NFT Generator
                </Typography>
            </CardContent>
        </Card>
    )
}

export default GeneratorContainer