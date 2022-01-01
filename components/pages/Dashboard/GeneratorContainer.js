import React, { useState } from "react";
import LayerContainer from "./LayersContainer";
import LayerDisplay from "./LayerDisplay"
import ProjectSettings from "./ProjectSettings"
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
            <div className={style.secondLayout}>
                <LayerDisplay 
                    alertRef={alertRef}
                    layerList={layerList} 
                    layerIndex={layerIndex}
                    setLayerList={setLayerList}
                />
                <ProjectSettings 
                    alertRef={alertRef}
                    layerList={layerList}
                />
            </div>
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