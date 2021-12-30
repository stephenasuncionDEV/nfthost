import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, TextField } from '@mui/material';
import style from "../../../styles/ProjectSettings.module.scss"

const ProjectSettings = ({alertRef}) => {
    const [name, setName] = useState("");

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    return (
        <Card className={style.card}>
            <CardContent className={style.cardContent}>
                <Typography variant="h6" component="div" gutterBottom>
                    Project Settings
                </Typography>
                <TextField required label="Name" variant="outlined" size="small" sx={{ flexGrow: 1 }} autoComplete='off' value={name} onChange={onNameChange}/>
            </CardContent>
        </Card>
    )
}

export default ProjectSettings