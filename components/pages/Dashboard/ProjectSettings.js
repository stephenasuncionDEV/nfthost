import React, { useState, useEffect, useRef } from "react";
import JSZip from "jszip";
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DownloadIcon from '@mui/icons-material/Download';
import style from "../../../styles/ProjectSettings.module.scss"

const ProjectSettings = ({alertRef, layerList}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [base, setBase] = useState("");
    const [count, setCount] = useState(100);
    const [imgWidth, setImgWidth] = useState(0);
    const [imgLength, setImgLength] = useState(0);
    const [startCount, setStartCount] = useState(0);
    const [curRenderIndex, setCurRenderIndex] = useState(0);
    const [isRendering, setIsRendering] = useState(false);
    const [metadata, setMetadata] = useState([]);
    const canvasRef = useRef();

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
        setMetadata([]);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        let tempMetadata = [];
        let countStart = startCount;

        setIsRendering(true);

        for (let i = 1; i <= count; i++) {
            setTimeout(() => {
                setCurRenderIndex(i);
                ctx.clearRect(0, 0, canvas.width, canvas.height);           
                let attributes = [];
                layerList.forEach((layer, idx) => {
                    setTimeout(() => {
                        let layerImage = new Image();
                        const randomIndex = Math.floor(Math.random() * layer.images.length);
                        layerImage.src = layer.images[randomIndex].url;
                        layerImage.onload = () => {
                            ctx.drawImage(layerImage, 0, 0, imgWidth, imgLength)
                        }
                        const newAttribute = {
                            trait_type: layer.name,
                            value: layer.images[randomIndex].name
                        }
                        attributes.push(newAttribute);
                    }, idx * 20);
                });
                const nftJson = {
                    name: name,
                    description: description,
                    image: `${base}${countStart}.png`,
                    date: new Date().getTime(),
                    attributes: attributes,
                    compiler: "NFT Host"
                }
                tempMetadata.push(nftJson);
                countStart++;
            }, i * 500);
        }

        setMetadata(tempMetadata);
        setIsRendering(false);
    }

    const onDownload = () => {
        if (metadata == null) {
            alertRef.current.handleOpen("error", "Please generate your collection first");
            return;
        }

        let countStart = startCount;
        const zip = new JSZip();
        zip.file("metadata.json", JSON.stringify(metadata, null, 2));

        metadata.forEach(data => {
            zip.file(`${countStart}.json`, JSON.stringify(data, null, 2));
            countStart++;
        });

        zip.generateAsync({type: "base64"})
        .then(res => {
            location.href = "data:application/zip;base64," + res;
        })
        .catch(err => {
            alertRef.current.handleOpen("error", err.message);
            console.log(err)
        });
    }

    return (
        <Card className={style.card}>
            <CardContent className={style.cardContent}>
                <Typography variant="h6" component="div" gutterBottom>
                    Project Settings
                </Typography>
                <div className={style.horizontalLayout}>
                    <TextField required label="Name" variant="outlined" size="small" autoComplete='off' value={name} onChange={onNameChange}/>
                    <TextField required label="Image BaseURI" variant="outlined" size="small" autoComplete='off' sx={{ ml: 1 }} value={base} onChange={onBaseChange}/>
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
                    {curRenderIndex == count && (
                        <Button variant="contained" color="success" startIcon={<DownloadIcon />} onClick={onDownload}>
                            Download
                        </Button>
                    )}
                    <LoadingButton sx={{ ml:"auto" }} variant="contained" endIcon={<ChevronRightIcon />} loading={isRendering} onClick={onGenerate}>
                        Generate
                    </LoadingButton>
                </div>
                {isRendering && (
                    <Typography variant="h6" component="div" gutterBottom>
                        Rendering ({curRenderIndex}/{count})
                    </Typography>
                )}
                <canvas ref={canvasRef} width={imgWidth} height={imgLength} className={isRendering ? style.canvas : style.canvasInvisible}/>
            </CardContent>
        </Card>
    )
}

export default ProjectSettings