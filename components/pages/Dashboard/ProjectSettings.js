import { useState, useEffect, useRef } from "react";
import { useToast, Box, Text, Button, 
    Tag, TagLabel, Input, NumberInputField, 
    NumberInputStepper, NumberIncrementStepper,
    NumberDecrementStepper, NumberInput, FormControl, FormLabel,
    RadioGroup, Radio, Stack, TagCloseButton, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react'
import { MdChevronRight, MdDownload, MdAdd } from 'react-icons/md'
import { getEthPriceNow } from "get-eth-price";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { saveAs } from 'file-saver';
import MD5 from "crypto-js/md5"
import JSZip from "jszip";
import PaymentDialog from "./PaymentDialog"
import style from "../../../styles/Container.module.scss"

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
    const alert = useToast();

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
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const onBaseChange = (e) => {
        setBase(e.target.value);
    }

    const onCountChange = (value) => {
        setCount(value);
    }

    const onStartCountChange = (value) => {
        setStartCount(value);
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

    const onMetadataTypeChange = (value) => {
        setMetadataType(value);
    }

    const onSymbolChange = (e) => {
        setSymbol(e.target.value);
    }

    const onSellerPointsChange = (value) => {
        setSellerPoints(value);
    }

    const onExternalURLChange = (e) => {
        setExternalURL(e.target.value);
    }

    const onCreatorAddressChange = (e) => {
        setCreatorAddress(e.target.value);
    }

    const onCreatorShareChange = (value) => {
        setCreatorShare(value);
    }

    const handleDeleteCreator = (index) => {
        if (creators.length == 1) {
            alert({
                title: 'Error',
                description: "You cannot have zero creator",
                status: 'error',
                duration: 3000,
            })
        }
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
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        }
    }

    const onGenerateCollection = () => {
        try {
            // Check if one of the layer(s) is empty
            layerList.forEach((layer, idx) => {
                if (layer.images.length == 0) {
                    throw new Error("All layers must have atleast one image");
                }
            });

            // Check if there at more than 1 layer
            if(layerList.length == 1) {
                throw new Error("You must have atleast 2 layers");
            }

            // Check if collection count is greater than 0
            if(count <= 0) {
                throw new Error("Collection count must be greater than 0");
            }

            // Check if start count is not negative
            if(startCount < 0) {
                throw new Error("Start count must be greater than 0");
            }

            // Check if img width and length is greater than 0
            if(imgWidth <= 0 || imgLength <= 0) {
                throw new Error("Image width or length must be greater than 0");
            }

            // Check if user needs to pay
            if (count > 100) {
                if (count > 100 && count <= 1000) {
                    setPrice(50);
                } else if (count > 1000 && count <= 5000) {
                    setPrice(100);
                } else if (count > 5000 && count <= 10000) {
                    setPrice(200);
                }
    
                // Show Payment Dialog
                paymentDialogRef.current.show({
                    title: "Collection Count More Than 100",
                    footer: "You will be prompted 1 transaction"
                });
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
                    paymentDialogRef.current.hide();
                    generateCollection();
                })
                .catch(err => {
                    paymentDialogRef.current.hide();
                    alert({
                        title: 'Error',
                        description: err.message,
                        status: 'error',
                        duration: 3000,
                    })
                    return
                })
            } else {
                generateCollection();
            }
        }
        catch (err) {
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
            return;
        }
    }

    const generateCollection = async () => {
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
                    edition: renderIndex,
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
                        edition: nftJson.edition,
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
                alert({
                    title: 'Error',
                    description: err.message,
                    status: 'error',
                    duration: 3000,
                })
            })
            await wait(500);
        }
    }

    const onDownload = () => {
        if (metadata == null) {
            alert({
                title: 'Error',
                description: "Please generate your collection first",
                status: 'error',
                duration: 3000,
            })
            return;
        }

        // File name start count
        let countStart = startCount;

        // Add Metadata file in zip
        zip.folder("Metadata").file("metadata.json", JSON.stringify(metadata, null, 2));

        // Add each image's metadata in zip
        metadata.forEach(data => {
            zip.folder("Metadata").file(`${countStart}.json`, JSON.stringify(data, null, 2));
            countStart++;
        });

        // Save the zip file
        zip.generateAsync({
            type: "blob", 
        })
        .then(res => {
            saveAs(res, "NFT Host.zip");
        })
        .catch(err => {
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        });
    }

    const handleGenerateCSV = () => {
        let csvData = [];

        // Get the columns
        let keys = Object.keys(metadata[0]).slice(0, 6);
        keys.splice(2, 1);
        const attributes = metadata[0].attributes.map((attribute, idx) => attribute.trait_type)
        const columns = [...keys, ...attributes];
        
        csvData.push(columns);

        // Get Rows
        metadata.forEach((data, idx) => {
            let row = [
                data.name,
                data.description,
                data.hash,
                data.edition,
                data.date
            ]
            data.attributes.forEach((attribute, idx) => {
                row.push(attribute.value);
            })
            csvData.push(row);
        })

        console.log(csvData)

        let csv = "";
        csvData.forEach((row) => {  
            csv += row.join(',');  
            csv += "\n";
        }); 

        var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
        saveAs(blob, "NFT Host.csv");
    }

    return (
        <Box           
            flex='1'
            mt='4'
            bg='white'
            p='5'
            className={style.box}
        >
            <PaymentDialog ref={paymentDialogRef} />
            <Text fontSize='16pt'>
                Project Settings
            </Text>
            <FormControl>
                <Box
                    mt='2'
                    display='flex'
                >
                    <Input 
                        placeholder='Name' 
                        variant='outline' 
                        value={name} 
                        onChange={onNameChange}
                    />
                    {metadataType != "SOL" && (
                        <Input 
                            ml='2'
                            placeholder='Image BaseURI' 
                            variant='outline' 
                            value={base} 
                            onChange={onBaseChange}
                        />
                    )}
                </Box>
                <Input
                    mt='2'
                    placeholder='Description' 
                    variant='outline' 
                    value={description} 
                    onChange={onDescriptionChange}
                />
                <Box
                    mt='2'
                    display='flex'
                >
                    <Box
                        flex='1'
                        display='flex'
                        flexDir='column'
                    >
                        <FormLabel htmlFor='collection-count'>Collection Count</FormLabel>
                        <NumberInput id='collection-count' step={1} value={count} min={1} onChange={onCountChange}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormLabel mt='3' htmlFor='collection-count'>Start Count</FormLabel>
                        <NumberInput step={1} value={startCount} min={0} onChange={onStartCountChange}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Box>
                    <Box
                        ml='2'
                        flex='1'
                        display='flex'
                        flexDir='column'
                    >
                        <FormLabel htmlFor='image-width'>Image Width</FormLabel>
                        <Input id='image-width' variant='outline' value={imgWidth} disabled/>

                        <FormLabel mt='3' htmlFor='image-height'>Image Height</FormLabel>
                        <Input id='image-height' variant='outline' value={imgLength} disabled/>
                    </Box>
                </Box>
                <FormLabel mt='3' htmlFor='metadata-type'>Metadata Type</FormLabel>
                <RadioGroup 
                    id='metadata-type' 
                    aria-label="Metadata Type" 
                    value={metadataType}
                    onChange={onMetadataTypeChange} 
                    display='flex'
                    justifyContent='space-between'
                >
                    <Stack direction='row' spacing='4'>
                        <Radio value='ETH'>ETH</Radio>
                        <Radio value='SOL'>SOL</Radio>
                    </Stack>
                    {metadataType === "SOL" && <FormLabel htmlFor='seller-fee-basis-points' m='0'>Seller Fee Basis Points (e.g. 1000 = 10%)</FormLabel>}
                </RadioGroup>
                {metadataType === "SOL" && (
                    <Box
                        mt='2'
                        display='flex'
                        flexDir='column'
                    >
                        <Box
                            display='flex'
                        >
                            <Input 
                                flex='1'
                                placeholder='Symbol' 
                                variant='outline' 
                                value={symbol} 
                                onChange={onSymbolChange}
                            />
                            <NumberInput id='seller-fee-basis-points' flex='1' ml='2' step={1} value={sellerPoints} min={0} onChange={onSellerPointsChange}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Box>
                        <Input 
                            mt='2'
                            placeholder='External URL' 
                            variant='outline' 
                            value={externalURL} 
                            onChange={onExternalURLChange}
                        />
                        <Box
                            mt='2'
                            display='flex'
                        >
                            <Box
                                flex='1'
                                display='flex'
                                flexDir='column'
                            >
                                <Input 
                                    placeholder='Creator Address' 
                                    variant='outline' 
                                    value={creatorAddress} 
                                    onChange={onCreatorAddressChange}
                                />
                                <Box
                                    mt='2'
                                    display='flex'
                                >
                                    <FormLabel mt='3' htmlFor='creator-share'>Creator Share</FormLabel>
                                    <NumberInput id="creator-share" flex='1' ml='2' step={1} value={creatorShare} min={0} onChange={onCreatorShareChange}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Box>
                            </Box>
                            <Button
                                ml='2'
                                px='2em'
                                variant='solid'
                                colorScheme='blue'
                                onClick={onAddCreator}
                                rightIcon={<MdAdd size='14pt'/>}
                            >
                                Add Creator
                            </Button>
                        </Box>
                        <Box
                            mt='3'
                            display='fex'
                            flexWrap='wrap'
                            justifyContent='center'
                        >
                            {creators.map((creator, idx) => (
                                <Tag
                                    variant='solid'
                                    size='md'
                                    borderRadius='full'
                                    bg='rgb(230, 230, 230)'
                                    color='blackAlpha.800'
                                    key={idx}
                                >
                                    <TagLabel>Address: {creator.address.substring(0, 15)}... / Share: {creator.share}</TagLabel>
                                    <TagCloseButton onClick={() => handleDeleteCreator(idx)}/>
                                </Tag>
                            ))}
                        </Box>
                    </Box>
                )}
            </FormControl>
            <Box
                display='flex'
                justifyContent='space-between'
                mt='6'
            >
                {curRenderIndex == count && metadata.length > 0 && (
                    <Box>
                        <Button
                            variant='solid'
                            colorScheme='blue'
                            rightIcon={<MdDownload />}
                            onClick={onDownload}
                        >
                            Download
                        </Button>
                        <Button
                            ml='2'
                            variant='solid'
                            colorScheme='gray'
                            rightIcon={<MdDownload />}
                            onClick={handleGenerateCSV}
                        >
                            Get CSV File
                        </Button>
                    </Box>
                )}
                <Button
                    isLoading={isRendering}
                    loadingText='Generating'
                    ml='auto'
                    variant='solid'
                    colorScheme='blue'
                    rightIcon={<MdChevronRight />}
                    onClick={onGenerateCollection}
                >
                    Generate Collection
                </Button>
            </Box>
            {isRendering && (
                <Box
                    mt='2'
                    mb='3'
                >
                    <Text fontSize='18pt'>
                        Rendering ({curRenderIndex}/{count})
                    </Text>
                    <Text fontSize='10pt'>
                        This will take a long time because we are not doing server-side rendering.
                    </Text>
                    <Alert status='warning' mt='2'>
                        <AlertIcon />
                        <AlertDescription>
                            Please do not click anything while rendering (DO NOT CHANGE PAGES).
                        </AlertDescription>
                    </Alert>
                </Box>
            )}
            <canvas ref={canvasRef} width={imgWidth} height={imgLength} style={{display: isRendering ? 'inherit' : 'none'}}/>
        </Box>
    )
}

export default ProjectSettings