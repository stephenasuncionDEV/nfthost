import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, IconButton, List, ListItem, ListItemText, Avatar } from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import style from "../../../styles/LayersContainer.module.scss"

const LayerContainer = ({alertRef, layerList, layerIndex, setLayerList, setLayerIndex}) => {
    
    const onAddLayer = () => {
        if (layerList.length >= 6) return;
        const newLayer = {
            name: "New Layer",
            images: []
        }
        setLayerList([...layerList, newLayer]);
        setLayerIndex(layerList.length);
    }

    const onClick = (index) => {
        setLayerIndex(index);
    }

    const onDelete = (index) => {
        if (layerList.length == 1) {
            alertRef.current.handleOpen("error", "You cannot delete the first layer");
            return;
        }
        let newLayerList = [...layerList];
        newLayerList.splice(index, 1);
        setLayerList(newLayerList);
    }

    const onTitleChange = (e, index) => {
        let newLayerList = [...layerList];
        newLayerList[index].name = e.target.value;
        setLayerList(newLayerList);
    }

    const onSettings = () => {

    }

    return (
        <Card className={style.card}>
            <CardContent className={style.cardContent}>
                <Typography variant="h6" gutterBottom>
                    Layers
                </Typography>
                <List sx={{ paddingBottom: 0 }}>
                    <ListItem button className={style.layerItemFalse} onClick={onAddLayer}>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                        <ListItemText
                            sx={{ ml: 2 }}
                            primary={"Add Layer"}
                            secondary={`Layers ${layerList.length}`}
                        />
                        <IconButton onClick={onSettings}>
                            <SettingsIcon />
                        </IconButton>
                    </ListItem>
                {layerList.map((layer, idx) => (
                    <ListItem key={idx} button className={layerIndex == idx ? style.layerItemTrue : style.layerItemFalse} onClick={() => onClick(idx)}>
                        <Avatar style={{ backgroundColor: "rgb(242,80,34)" }}>
                            <LayersIcon />
                        </Avatar>
                        <ListItemText
                            sx={{ ml: 2 }}
                            primary={<span 
                                className={style.layerTitleInput} 
                                contentEditable="true" 
                                suppressContentEditableWarning={true} 
                                onChange={(e) => onTitleChange(e, idx)}>{layer.name}</span>} 
                            secondary={`Images ${layer.images.length}`}
                        />
                        <IconButton onClick={() => onDelete(idx)}>
                            <CloseIcon />
                        </IconButton>
                    </ListItem>
                ))}
                </List>
            </CardContent>
        </Card>
    )
}

export default LayerContainer