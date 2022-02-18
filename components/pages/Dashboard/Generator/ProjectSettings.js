import { useState, useEffect, useRef } from "react";
import { useToast, Box, Text, Button, 
    Tag, TagLabel, Input, NumberInputField, 
    NumberInputStepper, NumberIncrementStepper,
    NumberDecrementStepper, NumberInput, FormControl, FormLabel,
    RadioGroup, Radio, Stack, TagCloseButton, Alert, AlertIcon, AlertDescription, useColorModeValue } from '@chakra-ui/react'
import { MdChevronRight, MdDownload, MdAdd } from 'react-icons/md'
import { BiDna, BiImport } from 'react-icons/bi'
import { getEthPriceNow } from "get-eth-price"
import { useMoralis } from "react-moralis"
import { ethers } from "ethers"
import { saveAs } from 'file-saver'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import MD5 from "crypto-js/md5"
import JSZip from "jszip"
import PaymentDialog from "../PaymentDialog"
import PaymentMethodDialog from "../PaymentMethodDialog"
import PaymentLoadingDialog from "../PaymentLoadingDialog"
import ScreenLockModal from "./ScreenLockModal"
import axios from "axios"
import style from "../../../../styles/Container.module.scss"

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
const zip = new JSZip();

const getImageHeightAndWidth = (dataURL) => new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width
      })
    }
    img.src = dataURL
})

const ProjectSettings = ({layerList}) => {
    const {account, user, Moralis, setUserData} = useMoralis();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [base, setBase] = useState("");
    const [count, setCount] = useState(100);
    const [imgWidth, setImgWidth] = useState(0);
    const [imgLength, setImgLength] = useState(0);
    const [startCount, setStartCount] = useState(1);
    const [curRenderIndex, setCurRenderIndex] = useState(0);
    const [isRendering, setIsRendering] = useState(false);
    const [metadata, setMetadata] = useState([]);
    const [DNA, setDNA] = useState([]);
    const [metadataType, setMetadataType] = useState("ETH");
    const [symbol, setSymbol] = useState("");
    const [sellerPoints, setSellerPoints] = useState(1000);
    const [externalURL, setExternalURL] = useState("");
    const [creatorAddress, setCreatorAddress] = useState("");
    const [creatorShare, setCreatorShare] = useState(100);
    const [creators, setCreators] = useState([
        {address: user.attributes.ethAddress, share: 100}
    ]);
    const [isDownloading, setIsDownloading] = useState(false);
    const [freeGeneration, setFreeGeneration] = useState(0);
    const [isGreaterThan1000, setIsGreaterThan1000] = useState(false);
    const canvasRef = useRef();
    const paymentDialogRef = useRef();
    const paymentMethodDialogRef = useRef();
    const paymentLoadingDialogRef = useRef();
    const screenLockModalRef = useRef();
    const alert = useToast();
    const containerColor = useColorModeValue('transparent', 'rgb(50, 55, 67)');

    useEffect(() => {
        if (layerList[0].images.length == 0) return;
        getImageHeightAndWidth(layerList[0].images[0].url)
        .then(res => {
            setImgWidth(res.width);
            setImgLength(res.height);
        });
    }, [layerList[0].images])

    useEffect(() => {
        if (!account) return;
        const getUser = async () => {
            try {
                const user = await axios.get((location.hostname === 'localhost' ? "http://localhost:8080/api/user/get" : "/api/user/get"), { params: { address: account } });
                const freeGeneration = user.data[0].generationCount;
                setFreeGeneration(freeGeneration);
                //console.log(user, freeGeneration);
            }
            catch (err) {
                console.log(err);
            }
        }
        getUser();
    }, [account])

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

    const onAddGenerateCount = () => {
        const count = user.attributes.generateCount;
        setUserData({
            generateCount: count == null ? 1 : count + 1
        })
    }

    const onGenerateCollection = async () => {
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

            // Check if collection has enough 
            let possibleCombination = 1;
            layerList.map((layer, idx) => {
                const imgSize = layer.images.length;
                possibleCombination *= imgSize;
            })
            if (possibleCombination < count) {
                throw new Error(`Possible combination is under the desired collection count (${possibleCombination}/${count})`);
            }

            // Checks for big files
            if((imgWidth > 3000 || imgLength > 3000)) {
                throw new Error("Files are too big, reduce the dimension of your images");
            } 

            // Check if user needs to pay
            if (count > 100 && freeGeneration === 0) {
                // lower generation count
                paymentMethodDialogRef.current.show();
            } else {
                if (freeGeneration > 0) {
                    const res = await axios.post((location.hostname === 'localhost' ? "http://localhost:8080/api/user/update" : "/api/user/update"), { address: account, count: freeGeneration - 1 });
                    //console.log(res);
                }
                onAddGenerateCount();  
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
        }
    }

    const loadImage = (image) => {
        return new Promise(resolve => {
            let layerImage = new Image();
            layerImage.src = image.url;
            layerImage.onload = () => {
                resolve(layerImage);
            }
        })
    }

    const loadLayerImages = (layer) => {
        return Promise.all(
            layer.images.map((image, idx) => {
                return loadImage(image)
                .then(layerImages => {
                    return layerImages;
                })
            })
        )
    }

    const getLoadedImages = () => {
        return Promise.all(
            layerList.map((layer, idx) => {
                return loadLayerImages(layer)
                .then(res => {
                    return res;
                });
            })
        )
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
        let autoSaveCount = 0;

        let hashList = [];

        if (DNA.length > 0) {
            hashList = [...DNA];
        }

        if (count >= 1000) {
            setIsGreaterThan1000(true);
        } else {
            setIsGreaterThan1000(false);
        }

        screenLockModalRef.current.show();
        //localStorage.setItem("isRendering", true);
        setIsRendering(true);
        setMetadata([]);
        setDNA([]);

        let t0 = performance.now();
        let t1;

        while (imageIndex != count) {
            setCurRenderIndex(renderIndex);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const loadedImages = await getLoadedImages(); // Load Images
            const attributes = await stackLayers(ctx, loadedImages); // Stack Layers
            const currentHash = MD5(JSON.stringify(attributes)).toString();
            if (hashList.indexOf(currentHash) == -1) { // If image is unique
                hashList.push(currentHash);
                await saveCanvas(countStart); // Save canvas
                if (count >= 1000 && (renderIndex == count || renderIndex % 1000 == 0)) {
                    await autoSave(++autoSaveCount); // auto save every 1000
                }
                let nftJson = {
                    name: `${name} #${renderIndex}`,
                    description: description,                
                    image: `${base}${countStart}.png`,
                    //hash: currentHash,
                    //edition: renderIndex,
                    //date: new Date().getTime(),
                    attributes: attributes,
                    compiler: "https://nfthost.app/"
                }
                if (metadataType === "SOL") {
                    nftJson = {
                        name: nftJson.name,
                        symbol: symbol,
                        description: nftJson.description,
                        seller_fee_basis_points: sellerPoints,
                        image: `${countStart}.png`,
                        external_url: `${externalURL}${countStart}.png`,
                        //edition: nftJson.edition,
                        //hash: currentHash,
                        //date: new Date().getTime(),
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
                        compiler: "https://nfthost.app/"
                    }
                }
                tempMetadata.push(nftJson);
                imageIndex++;
                countStart++;
                renderIndex++;
            }
            if (imageIndex == count) {
                setMetadata(tempMetadata);
                setDNA(hashList);
                setIsRendering(false);
               // localStorage.setItem("isRendering", false);
                screenLockModalRef.current.hide();
                t1 = performance.now();
                console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
            }
        }
    }

    const drawOnCanvas = (ctx, layer, idx, loadedImages) => {
        return new Promise(resolve => {
            const randomIndex = getLayerImageIndex(layer);
            const newAttribute = {
                trait_type: layer.name,
                value: layer.images[randomIndex].name
            }
            ctx.drawImage(loadedImages[idx][randomIndex], 0, 0, imgWidth, imgLength);
            resolve(newAttribute);
        })
    }

    const stackLayers = (ctx, loadedImages) => {
        return Promise.all(
            layerList.map((layer, idx) => {
                return drawOnCanvas(ctx, layer, idx, loadedImages)
                .then(res => {
                    return res;
                });
            })
        )
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

    const saveCanvas = (countStart) => {
        return new Promise((resolve, reject) => {
            canvasRef.current.toBlob((blob) => {
                zip.folder("Images").file(`${countStart}.png`, blob);
                resolve();
            });
        })
    }

    const autoSave = (autoSaveCount) => {
        return new Promise(async (resolve, reject) => {
            try {
                const content = await zip.generateAsync({
                    type: "blob",
                    streamFiles: true
                }, (data) => {
                    //console.log(data, window.performance.memory);
                    console.log("Auto Download Progress: " + data.percent.toFixed(2) + "%");
                })
    
                saveAs(content, `NFT Host Image Chunk ${autoSaveCount}.zip`);

                zip.remove("Images");

                resolve();
            }
            catch (e) {
                console.log(e);
                reject();
            }
        })
    }

    const onDownload = async () => {
        try {
            if (metadata == null) throw new Error("Please generate your collection first");

            console.log("Downloading");

            // File name start count
            let countStart = startCount;
            screenLockModalRef.current.show('Downloading...');
            setIsDownloading(true);

            // Add Metadata file in zip
            zip.folder("Metadata").file("metadata.json", JSON.stringify(metadata, null, 2));

            console.log("Added Metadata");

            // Add each image's metadata in zip
            metadata.forEach(data => {
                zip.folder("Metadata").file(`${countStart}.json`, JSON.stringify(data, null, 2));
                countStart++;
            });

            console.log("Added JSON Files");

            console.time('DownloadComplete')
            // const content = await zip.generateInternalStream({type:"blob"}).accumulate((metadata) => {
            //     //console.log("Download Progress: " + metadata.percent.toFixed(2) + " %");
            // });
            const content = await zip.generateAsync({
                type: "blob",
                streamFiles: true
                // compression: "DEFLATE",
                // compressionOptions: {
                //     level: 9
                // }
            }, (data) => {
                console.log(data, window.performance.memory);
               // console.log("Download Progress: " + data.percent.toFixed(2) + " %");
            })
            console.timeEnd('DownloadComplete')
            console.log(content);
            saveAs(content, "NFT Host.zip");
            console.log("Finished Downloading");
            setIsDownloading(false);
            screenLockModalRef.current.hide();
        }
        catch (err) {
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
            console.log(err);
        }
    }

    const handleGenerateCSV = async () => {
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
            ]
            data.attributes.forEach((attribute, idx) => {
                row.push(attribute.value);
            })
            csvData.push(row);
        })

        //console.log(csvData)

        let csv = "";
        csvData.forEach((row) => {  
            csv += row.join(',');  
            csv += "\n";
        }); 

        var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
        saveAs(blob, "NFT Host.csv");
    }

    const handlePaymentMethodChange = (method) => {
        if (method === 'metamask') {
            paymentLoadingDialogRef.current.show({
                title: "Collection Count More Than 100",
                footer: "You will be prompted 1 transaction"
            });
            getEthPriceNow()
            .then(data => {
                const ethPrice = 20 / data[Object.keys(data)[0]].ETH.USD;
                const val = ethPrice.toString().substring(0, 11);
                return Moralis.transfer({
                    type: "native", 
                    amount: Moralis.Units.ETH(val), 
                    receiver: process.env.METAMASK_ADDRESS
                })
            })
            .then(res => {
                const transactionsClass = Moralis.Object.extend("Transactions");
                const transaction = new transactionsClass();
                transaction.set('owner', user.attributes.ethAddress);
                transaction.set('type', 'metamask');
                transaction.set('amount', 20);
                transaction.set('status', 'paid');
                transaction.set('paymentID', res.blockHash);
                return transaction.save();
            })
            .then(res => {
                paymentLoadingDialogRef.current.hide();
                onAddGenerateCount();
                generateCollection();
            })
            .catch(err => {
                paymentLoadingDialogRef.current.hide();
                alert({
                    title: 'Error',
                    description: err.message,
                    status: 'error',
                    duration: 3000,
                })
            })
        }
        else if (method === 'stripe') {
            paymentDialogRef.current.show("Buy Premium Generator", 20);
        }
    }

    const handlePaymentSuccess = () => {
        onAddGenerateCount();
        generateCollection();
    }

    const handleGenerateMetadata = async () => {

        console.log("genrating metadata")
        // File name start count
        let countStart = startCount;

        // Add Metadata file in zip
        zip.folder("Metadata").file("metadata.json", JSON.stringify(metadata, null, 2));

        // Add each image's metadata in zip
        metadata.forEach(data => {
            zip.folder("Metadata").file(`${countStart}.json`, JSON.stringify(data, null, 2));
            countStart++;
        });

        const data = await zip.generateAsync({
            type: "blob",
            streamFiles: true
        }, (data) => {
            console.log(data, window.performance.memory);
        })

        saveAs(data, "NFT Host Metadata.zip");
    }

    return (
        <Box           
            flex='1'
            mt='4'
            p='5'
            borderRadius='5px'
            bg={containerColor}
        >
            <ScreenLockModal 
                ref={screenLockModalRef}
            />
            <PaymentMethodDialog 
                ref={paymentMethodDialogRef}
                onChange={handlePaymentMethodChange}
            />
            <PaymentLoadingDialog 
                ref={paymentLoadingDialogRef} 
            />
            <Elements stripe={stripePromise} >
                <PaymentDialog 
                    ref={paymentDialogRef}
                    onSuccess={handlePaymentSuccess}
                />
            </Elements>
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
                            isLoading={isDownloading}
                            loadingText="Downloading"
                            variant='solid'
                            bg='black' 
                            color='white' 
                            _hover={{
                                bg: 'rgb(50,50,50)'
                            }}
                            rightIcon={<MdDownload />}
                            onClick={onDownload}
                        >
                            Download
                        </Button>
                        {isGreaterThan1000 && (
                            <Button
                                ml='2'
                                variant='solid'
                                colorScheme='gray'
                                rightIcon={<MdDownload />}
                                onClick={handleGenerateMetadata}
                            >
                                Get Metadata
                            </Button>
                        )}
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
                <Box
                    ml='auto'
                    display='flex'
                    flexDir='column'
                >
                    <Button
                        isLoading={isRendering}
                        loadingText='Generating'
                        variant='solid'
                        bg='black' 
                        color='white' 
                        _hover={{
                            bg: 'rgb(50,50,50)'
                        }}
                        rightIcon={<MdChevronRight />}
                        onClick={onGenerateCollection}
                    >
                        Generate Collection
                    </Button>
                    {DNA && (
                        <Text fontSize='10pt'>
                            Hash Size: {DNA.length}
                        </Text>
                    )}
                </Box>
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