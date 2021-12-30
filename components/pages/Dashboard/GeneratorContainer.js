import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, IconButton, List, ListItem, ListItemText, ListItemIcon, Avatar } from '@mui/material';
import LayerContainer from "./LayersContainer";
import LayerDisplay from "./LayerDisplay"
import FileUploadIcon from '@mui/icons-material/FileUpload';
import style from "../../../styles/GeneratorContainer.module.scss"

const GeneratorContainer = ({alertRef}) => {
    const [layerIndex, setLayerIndex] = useState(0);
    const [layerList, setLayerList] = useState([
        {
            name: "New Layer",
            images: []
        },
    ]);

    return (
        <div className={style.firstLayout}>
            <LayerDisplay 
                alertRef={alertRef}
                layerList={layerList} 
                layerIndex={layerIndex}
                setLayerList={setLayerList}
            />
            <LayerContainer 
                alertRef={alertRef}
                layerList={layerList} 
                layerIndex={layerIndex}
                setLayerList={setLayerList}
                setLayerIndex={setLayerIndex}
            />
        </div>
    )
}

export default GeneratorContainer