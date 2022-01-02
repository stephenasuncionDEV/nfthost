import React, { useState, useEffect, useRef } from "react";
import { getEthPriceNow } from "get-eth-price";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";
import MD5 from "crypto-js/md5"
import JSZip from "jszip";
import { Card, CardContent, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Paper, Chip } from '@mui/material';
import { saveAs } from 'file-saver';
import PaymentDialog from "./PaymentDialog"
import LoadingButton from '@mui/lab/LoadingButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import style from "../../../styles/ProjectSettings.module.scss"

const zip = new JSZip();
const wait = ms => new Promise(res => setTimeout(res, ms));

const getImageHeightAndWidth = dataURL => new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width
      })
    }
    img.src = dataURL
})

const ProjectSettings = ({alertRef, layerList}) => {
    const {user, Moralis} = useMoralis();
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
    const [metadataType, setMetadataType] = useState("ETH");
    const [symbol, setSymbol] = useState("");
    const [sellerPoints, setSellerPoints] = useState(1000);
    const [externalURL, setExternalURL] = useState("");
    const [creatorAddress, setCreatorAddress] = useState("");
    const [creatorShare, setCreatorShare] = useState(100);
    const [creators, setCreators] = useState([
        {address: user.attributes.ethAddress, share: 100}
    ]);
    const [price, setPrice] = useState(50);
    const canvasRef = useRef();
    const paymentDialogRef = useRef();

    useEffect(() => {
        if (layerList[0].images.length == 0) return;
        getImageHeightAndWidth(layerList[0].images[0].url)
        .then(res => {
            setImgWidth(res.width);
            setImgLength(res.height);
        });
    }, [layerList[0].images])

    const onNameChange = (e) => {
        setName(e.target.value);
        setIsRendering(false);
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

    const onStartCountChange = (e) => {
        setStartCount(e.target.value);
    }

    const getLayerImageIndex = (layer) => {
        let i;
        let weights = [];

        layer.images.forEach((image, idx) => {
            weights.push(parseInt(image.value) + (weights[idx - 1] || 0));
        });

        const random = Math.random() * layer.images[0].maxValue;

        for (i = 0; i < weights.length; i++) {
            if (weights[i] > random) {
                break;
            }
        }     

        return i;
    }

    const stackLayers = (ctx) => {
        let attributes = [];
        return new Promise((resolve, reject) => {
            layerList.forEach((layer, idx) => {
                setTimeout(() => {
                    let layerImage = new Image();
                    const randomIndex = getLayerImageIndex(layer);
                    layerImage.src = layer.images[randomIndex].url;
                    layerImage.onload = () => {
                        ctx.drawImage(layerImage, 0, 0, imgWidth, imgLength)
                    }
                    const newAttribute = {
                        trait_type: layer.name,
                        value: layer.images[randomIndex].name
                    }
                    attributes.push(newAttribute);
                    if (idx === layerList.length - 1) resolve(attributes);
                }, idx * 50);
            });
        });
    }

    const saveCanvas = (countStart) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                canvasRef.current.toBlob((blob) => {
                    zip.folder("Images").file(`${countStart}.png`, blob);
                    resolve();
                });
            }, 50);
        })
    }

    const onDownload = () => {
        if (metadata == null) {
            alertRef.current.handleOpen("error", "Please generate your collection first");
            return;
        }

        let countStart = startCount;

        zip.folder("Metadata").file("metadata.json", JSON.stringify(metadata, null, 2));

        metadata.forEach(data => {
            zip.folder("Metadata").file(`${countStart}.json`, JSON.stringify(data, null, 2));
            countStart++;
        });

        zip.generateAsync({
            type: "blob", 
        })
        .then(res => {
            saveAs(res, "NFT Host.zip");
        })
        .catch(err => {
            alertRef.current.handleOpen("error", err.message);
            console.log(err)
        });
    }

    const onMetadataTypeChange = (e) => {
        setMetadataType(e.target.value);
    }

    const onSymbolChange = (e) => {
        setSymbol(e.target.value);
    }

    const onSellerPointsChange = (e) => {
        setSellerPoints(e.target.value);
    }

    const onExternalURLChange = (e) => {
        setExternalURL(e.target.value);
    }

    const onCreatorAddressChange = (e) => {
        setCreatorAddress(e.target.value);
    }

    const onCreatorShareChange = (e) => {
        setCreatorShare(e.target.value);
    }

    const handleDeleteCreator = (index) => {
        let newCreators = [...creators];
        newCreators.splice(index, 1);
        setCreators(newCreators);
    }

    const onAddCreator = () => {
        try {
            ethers.utils.getAddress(creatorAddress);
            const newCreator = {
                address: creatorAddress,
                preview: `${creatorAddress.substring(0, 15)}...`,
                share: creatorShare
            }
            setCreators([...creators, newCreator]);
            setCreatorAddress("");
        }
        catch (err) {
            alertRef.current.handleOpen("error", err.message);
        }
    }

    const onBuyCollection = () => {
        console.log("buy")
    }

    const onGenerateCollection = () => {
        try {
            layerList.forEach((layer, idx) => {
                if (layer.images.length == 0) {
                    throw new Error("All layers must have atleast one image");
                }
            });
            if(layerList.length == 1) {
                throw new Error("You must have atleast 2 layers");
            }
            if(count <= 0) {
                throw new Error("Collection count must be greater than 0");
            }
            if(startCount < 0) {
                throw new Error("Start count must be greater than 0");
            }
            if(imgWidth <= 0 || imgLength <= 0) {
                throw new Error("Image width or length must be greater than 0");
            }
        }
        catch (err) {
            alertRef.current.handleOpen("error", err.message);
            return;
        }

        if (count > 100) {
            if (count > 100 && count <= 1000) {
                setPrice(50);
            } else if (count > 1000 && count <= 5000) {
                setPrice(100);
            } else if (count > 5000 && count <= 10000) {
                setPrice(200);
            }

            getEthPriceNow()
            .then(data => {
                const ethPrice = price / data[Object.keys(data)[0]].ETH.USD;
                const val = ethPrice.toString().substring(0, 11);
                return Moralis.transfer({
                    type: "native", 
                    amount: Moralis.Units.ETH(val), 
                    receiver: process.env.METAMASK_ADDRESS
                })
            })
            .then(res => {
                onGenerate();
            })
            .catch(err => {
                alertRef.current.handleOpen("error", err.message);
            })
        } else {
            onGenerate();
        }
    }

    const onGenerate = async () => {
        zip.remove("Metadata");
        zip.remove("Images");

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        let tempMetadata = [];
        let countStart = startCount;
        let imageIndex = 0;
        let renderIndex = 1;

        let hashList = [];
        let currentHash = "";

        setIsRendering(true);
        setMetadata([]);
        
        while (imageIndex != count) {
            setCurRenderIndex(renderIndex);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let attributes = [];
            stackLayers(ctx)
            .then(res => {
                currentHash = MD5(JSON.stringify(res)).toString();
                if (!hashList.includes(currentHash)) {
                    attributes = [...res];
                    return saveCanvas(countStart);
                }
                throw new Error(`${currentHash} is a duplicate.`);
            })
            .then(() => {
                imageIndex++;
                let nftJson = {
                    name: name,
                    description: description,
                    image: `${base}${countStart}.png`,
                    hash: currentHash,
                    date: new Date().getTime(),
                    attributes: attributes,
                    compiler: "NFT Host"
                }
                if (metadataType === "SOL") {
                    nftJson = {
                        name: nftJson.name,
                        symbol: symbol,
                        description: nftJson.description,
                        seller_fee_basis_points: sellerPoints,
                        image: `${countStart}.png`,
                        external_url: externalURL,
                        hash: currentHash,
                        date: new Date().getTime(),
                        attributes: nftJson.attributes,
                        properties: {
                            category: "image",
                            files: [
                                {
                                    uri: `${countStart}.png`,
                                    type: "image/png"
                                }
                            ],
                            creators: creators
                        },
                        compiler: "NFT Host"
                    }
                }
                tempMetadata.push(nftJson);
                countStart++;
                renderIndex++;
                if (imageIndex == count) {
                    setMetadata(tempMetadata);
                    setIsRendering(false);
                }
            })
            .catch(err => {
                alertRef.current.handleOpen("info", err.message);
            })
            await wait(500);
        }
    }

    return (
        <Card className={style.card}>
            <PaymentDialog 
                ref={paymentDialogRef}
            />
            <CardContent className={style.cardContent}>
                <Typography variant="h6" component="div" gutterBottom>
                    Project Settings
                </Typography>
                <div className={style.horizontalLayout}>
                    <TextField label="Name" variant="outlined" size="small" autoComplete='off' value={name} onChange={onNameChange}/>
                    {metadataType != "SOL" && (
                        <TextField label="Image BaseURI" variant="outlined" size="small" autoComplete='off' sx={{ ml: 1 }} value={base} onChange={onBaseChange}/>
                    )}
                </div>
                <TextField label="Description" variant="outlined" size="small" autoComplete='off' sx={{ mt: 1 }} value={description} onChange={onDescriptionChange}/>
                <div className={style.horizontalLayout}>
                    <div className={style.verticalLayout}>
                        <TextField required label="Collection Count" type="number" variant="outlined" size="small" autoComplete='off' sx={{ mt: 2 }} value={count} onChange={onCountChange}/>
                        <TextField required label="Start Count" type="number" variant="outlined" size="small" autoComplete='off' sx={{ mt: 2 }} value={startCount} onChange={onStartCountChange}/>
                    </div>
                    <div className={style.verticalLayout}>
                        <TextField label="Image Width" type="number" variant="outlined" size="small" autoComplete='off' sx={{ ml: 1, mt: 2 }} value={imgWidth} disabled/>
                        <TextField label="Image Length" type="number" variant="outlined" size="small" autoComplete='off' sx={{ ml: 1, mt: 2 }} value={imgLength} disabled/>
                    </div>
                </div>
                <FormControl component="fieldset" sx={{mt: 1}}>
                    <FormLabel component="legend">Metadata Type</FormLabel>
                    <RadioGroup row aria-label="Metadata Type" name="row-radio-buttons-group" value={metadataType} onChange={onMetadataTypeChange}>
                        <FormControlLabel value="ETH" control={<Radio />} label="ETH" />
                        <FormControlLabel value="SOL" control={<Radio />} label="SOL" />
                    </RadioGroup>
                </FormControl>
                {metadataType === "SOL" && (
                    <div className={style.vertLayout}>
                        <div className={style.horizontalLayout}>
                            <TextField label="Symbol" variant="outlined" size="small" autoComplete='off' value={symbol} onChange={onSymbolChange} />
                            <TextField label="Seller Fee Basis Points (e.g. 1000 = 10%)" type="number" variant="outlined" size="small" autoComplete='off' sx={{ ml: 1 }} value={sellerPoints} onChange={onSellerPointsChange}/>
                        </div>
                        <TextField label="External URL" variant="outlined" size="small" sx={{mt: 1, mb: 1}} autoComplete='off' value={externalURL} onChange={onExternalURLChange}/>
                        <div className={style.horizontalLayout}>
                            <TextField label="Creator Address" variant="outlined" size="small" autoComplete='off' value={creatorAddress} onChange={onCreatorAddressChange}/>
                            <Button variant="contained" sx={{ml: 1}} endIcon={<AddIcon />} onClick={onAddCreator}>
                                Add Creator
                            </Button>
                        </div>
                        <TextField label="Share" type="number" variant="outlined" size="small" sx={{mt: 1}} autoComplete='off' value={creatorShare} onChange={onCreatorShareChange}/>
                        {creators.length > 0 && (
                            <Paper component="ul" className={style.creatorContainer}>
                                {creators.map((creator, idx) => (
                                    <li key={idx}>
                                        <Chip
                                            label={`Address: ${creator.address.substring(0, 15)}... / Share: ${creator.share}`}
                                            onDelete={() => handleDeleteCreator(idx)}
                                            className={style.hostKeywordChip}
                                        />
                                    </li>   
                                ))}
                            </Paper>
                        )}
                    </div>
                )}
                <div className={style.buttonContainer}>
                    {curRenderIndex == count && metadata.length > 0 && (
                        <Button variant="contained" color="success" endIcon={<DownloadIcon />} onClick={onDownload}>
                            Download
                        </Button>
                    )}
                    <LoadingButton sx={{ ml:"auto" }} onClick={onGenerateCollection} loading={isRendering} loadingPosition="end" endIcon={<ChevronRightIcon />} variant="contained">
                        Generate
                    </LoadingButton>
                </div>
                {isRendering && (
                    <div>
                        <Typography variant="h6" component="div" gutterBottom>
                            Rendering ({curRenderIndex}/{count})
                        </Typography>
                        <Typography sx={{fontSize: "10pt", color: "rgb(80, 80, 80)"}} component="div" gutterBottom>
                            This will take a long time because we are not doing server-side rendering.
                        </Typography>
                        <Typography sx={{fontSize: "10pt", color: "rgb(233,30,99)"}} component="div" gutterBottom>
                            Please do not click anything while rendering (DO NOT CHANGE PAGES).
                        </Typography>
                    </div>
                )}
                <canvas ref={canvasRef} width={imgWidth} height={imgLength} className={isRendering ? style.canvas : style.canvasInvisible}/>
            </CardContent>
        </Card>
    )
}

export default ProjectSettings