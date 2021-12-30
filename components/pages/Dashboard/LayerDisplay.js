import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText, ListItemIcon, Avatar } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import style from "../../../styles/LayerDisplay.module.scss"

const LayerDisplay = ({alertRef, layerList, layerIndex, setLayerList}) => {
    const [fileOverState, setFileOverState] = useState(false);
    const dragAndDrop = useRef();

    const onDragLeave = (e) => {
        setFileOverState(false);
    }

    const onDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
        setFileOverState(true);
    }

    const onDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setFileOverState(false);
        fileHandler(e.dataTransfer.files);
    }

    const onUpload = (e) => {
        fileHandler(e.target.files);
    }

    const fileHandler = (files) => {
        let newImages = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.match(/image.png/)) {
                alertRef.current.handleOpen("error", "Please upload PNG files only", 3000);
                return;
            }
            newImages.push(URL.createObjectURL(file));
        }
        let newLayerList = [...layerList];
        const oldImageList = newLayerList[layerIndex].images;
        newLayerList[layerIndex].images = oldImageList.length == 0 ? newImages : [...oldImageList, ...newImages];
        setLayerList(newLayerList);
    }

    return (
        <Card className={style.card}>
            <CardContent className={style.cardContent}>
                <Typography variant="h6" component="div" gutterBottom>
                    Assets
                </Typography>
                <div className={style.layerDisplay}>
                    <div className={style.layerImageContainer}>
                        {layerList[layerIndex] && layerList[layerIndex].images.map((image, idx) => (
                            <Avatar
                                className={style.layerImageItem}
                                variant="rounded"
                                alt="User Image"
                                src={image}
                                sx={{ width: 100, height: 100 }}
                                key={idx}
                            />
                        ))}
                    </div>
                    <Button 
                        ref={dragAndDrop} 
                        className={fileOverState ? style.layerDisplayDropTrue : style.layerDisplayDropFalse} 
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        component="label"
                    >
                        <FileUploadIcon />
                        <span>Drag and drop images here!</span>
                        <span>(image/png, Max size: 10MB)</span>
                        <input type="file" accept="image/png" onChange={onUpload} hidden/>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LayerDisplay