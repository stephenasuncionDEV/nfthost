import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import style from "../../../styles/ProjectSettings.module.scss"

const ProjectSettings = ({alertRef, layerList}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [base, setBase] = useState("");
    const [count, setCount] = useState(0);
    const [imgWidth, setImgWidth] = useState(0);
    const [imgLength, setImgLength] = useState(0);
    const [startCount, setStartCount] = useState(0);

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const onBaseChange = (e) => {
        setBase(e.target.value);
    }

    const onCountChange = (e) => {
        setCount(e.target.value);
    }

    const onWidthChange = (e) => {
        setImgWidth(e.target.value);
    }

    const onLengthChange = (e) => {
        setImgLength(e.target.value);
    }

    const onStartCountChange = (e) => {
        setStartCount(e.target.value);
    }

    const onGenerate = () => {
        let metadata = [];
        
    }

    return (
        <Card className={style.card}>
            <CardContent className={style.cardContent}>
                <Typography variant="h6" component="div" gutterBottom>
                    Project Settings
                </Typography>
                <div className={style.horizontalLayout}>
                    <TextField required label="Name" variant="outlined" size="small" autoComplete='off' value={name} onChange={onNameChange}/>
                    <TextField required label="BaseUri" variant="outlined" size="small" autoComplete='off' sx={{ ml: 1 }} value={base} onChange={onBaseChange}/>
                </div>
                <TextField required label="Description" variant="outlined" size="small" autoComplete='off' sx={{ mt: 1 }} value={description} onChange={onDescriptionChange}/>
                <div className={style.horizontalLayout}>
                    <div className={style.verticalLayout}>
                        <TextField required label="Collection Count" type="number" variant="outlined" size="small" autoComplete='off' sx={{ mt: 2 }} value={count} onChange={onCountChange}/>
                        <TextField required label="Start Count" type="number" variant="outlined" size="small" autoComplete='off' sx={{ mt: 2 }} value={startCount} onChange={onStartCountChange}/>
                    </div>
                    <div className={style.verticalLayout}>
                        <TextField required label="Image Width" type="number" variant="outlined" size="small" autoComplete='off' sx={{ ml: 1, mt: 2 }} value={imgWidth} onChange={onWidthChange}/>
                        <TextField required label="Image Length" type="number" variant="outlined" size="small" autoComplete='off' sx={{ ml: 1, mt: 2 }} value={imgLength} onChange={onLengthChange}/>
                    </div>
                </div>
                <div className={style.buttonContainer}>
                    <Button variant="contained" endIcon={<ChevronRightIcon />} onClick={onGenerate}>
                        Generate
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProjectSettings