import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, Button } from '@mui/material';
import style from "../../../styles/LogsContainer.module.scss"

const LogsContainer = ({children}) => {
    return (
        <Card className={style.card}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Logs
                </Typography>
                {children}
            </CardContent>
        </Card>
    )
}

export default LogsContainer