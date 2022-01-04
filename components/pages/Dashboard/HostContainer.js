import { useState, useEffect, useRef } from "react"
import { useToast, Box, Text, Button, Input, Checkbox, Textarea, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react'
import { BsImageFill } from 'react-icons/bs'
import { getEthPriceNow } from "get-eth-price"
import { useMoralis } from "react-moralis"
import uniqid from 'uniqid';
import WebsiteContainer from "./WebsiteContainer"
import UploadImageDialog from "./UploadImageDialog"
import PaymentDialog from "./PaymentDialog"
import style from "../../../styles/Container.module.scss"

const HostContainer = () => {
    const { Moralis, user, setUserData } = useMoralis();
    const [isPreview, setIsPreview] = useState(false);
    const [hostIndex, setHostIndex] = useState(null);
    const [hostURL, setHostURL] = useState("");
    const [hostImage, setHostImage] = useState("");
    const [hostTitle, setHostTitle] = useState("");
    const [hostHeader, setHostHeader] = useState("");
    const [hostDescription, setHostDescription] = useState("");
    const [hostIframe, setHostIframe] = useState("");
    const [hostList, setHostList] = useState([]);
    const [hostKeywords, setHostKeywords] = useState("");
    const [hostIsRobot, setHostIsRobot] = useState(true);
    const [hostLanguage, setHostLanguage] = useState("");
    const [chipData, setChipData] = useState([
        "NFT Host",
        "Host NFTs",
        "Mint Website",
        "NFT Website Hosting",
        "Mint NFT Website Hosting",
        "Mint NFT",
        "NFT",
        "Mint",
        "Crypto Currency",
        "Crypto",
        "Ethereum",
    ]);
    const uploadImageRef = useRef();
    const paymentDialogRef = useRef();
    const alert = useToast();

    useEffect(() => {
        setHostList(user.attributes.websites);
        console.log(user.attributes.websites)
    }, [])

    const onCreation = () => {
        // Parse Keywords
        let keywords = "";
        chipData.forEach((chip, idx) => {
            keywords += chip + (idx == chipData.length - 1 ? "" : ", ");
        });

        const newHost = {
            title: hostTitle,
            header: hostHeader,
            description: hostDescription,
            image: hostImage,
            iframe: hostIframe,
            url: "",
            keywords: keywords,
            isRobot: hostIsRobot,
            language: hostLanguage
        }

        // User's current website array
        const websiteArr = user.attributes.websites;

        try {
            // Check if duplicated
            const uniqueTitles = new Set(websiteArr.map(w => w.title));
            if (uniqueTitles.has(hostTitle)) throw new Error("You cannot have a duplicated website");

            let newWebsiteArr;
            if (websiteArr.length > 0) {
                newWebsiteArr = [...websiteArr];
                newWebsiteArr.push(newHost);
            }
            
            const generatedURL = `https://nfthost.vercel.app/${uniqid()}`;

            // Create Website
            setUserData({
                websites: websiteArr.length == 0 ? [newHost] : newWebsiteArr
            })
            .then(res => {
                const websiteClass = Moralis.Object.extend("Website");
                const website = new websiteClass();
                website.set('owner', user.attributes.ethAddress);
                website.set('title', hostTitle);
                website.set('header', hostHeader);
                website.set('description', hostDescription);
                website.set('image', hostImage);
                website.set('iframe', hostIframe);
                website.set('keywords', keywords);
                website.set('isRobot', hostIsRobot);
                website.set('language', hostLanguage);
                website.set('url', generatedURL);
                return website.save();
            })
            .then(res => {
                return onSaveURL(generatedURL);
            })
            .then(res => {
                setHostList(user.attributes.websites);
                handleClear();
                alert({
                    title: 'Website Created',
                    description: 'Your website has been created.',
                    status: 'success',
                    duration: 3000,
                })
            })
            .catch(err => {        
                alert({
                    title: 'Error',
                    description: err.message,
                    status: 'error',
                    duration: 3000,
                })
            })
        } catch (err) { 
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        }
    }

    const onSaveURL = (url) => {
        const websiteArr = user.attributes.websites;
        let newHostList = [...websiteArr];
        newHostList[websiteArr.length - 1].url = url;
        setHostList(newHostList);
        return setUserData({ websites: newHostList })
    }

    const handleWebsiteDelete = () => {
        if (hostIndex == -1) {
            alert({
                title: 'Error',
                description: 'Please select a website',
                status: 'error',
                duration: 3000,
            })
            return;
        }

        let newHostList = [...hostList];
        newHostList.splice(hostIndex, 1);
        setHostList(newHostList);
        setUserData({
            websites: newHostList
        })
        .then(res => {
            const websiteClass = Moralis.Object.extend("Website");
            const query = new Moralis.Query(websiteClass);
            query.equalTo("url", hostURL);
            return query.first();
        })
        .then(res => {
            return res.destroy();
        })
        .then(res => {
            handleClear();
            setIsPreview(false);
            alert({
                title: 'Success',
                description: "Website has been deleted",
                status: 'success',
                duration: 3000,
            })
        })
        .catch(err =>  {
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        })
    }

    const handleDeleteKeyword = (index) => {
        let newChipData = [...chipData];
        newChipData.splice(index, 1);
        setChipData(newChipData);
    }

    const handleCreateWebsite = () => {
        try {
            // Reset state if isPreview
            if (isPreview) {
                handleClear();
                setIsPreview(false);
                return;
            }

            // Validate if fields are empty
            if (hostImage.trim().length == 0 || 
                hostTitle.trim().length == 0 || 
                hostHeader.trim().length == 0 || 
                hostDescription.trim().length == 0 || 
                hostIframe.trim().length == 0) {
                throw new Error("Please fill in all the required fields");
            }

            // Validate Iframe source code
            if (hostIframe.indexOf("iframe") == -1 || hostIframe.indexOf("src='https://cloudflare-ipfs.com/ipfs/") == -1) {
                throw new Error("You must use Thirdweb's iframe embed code");
            }

            // Initialize hostSize (for new users)
            const websiteArr = user.attributes.websites;
            if (websiteArr == null) {
                setUserData({
                    hostSize: 1
                });
            }

            // Check if user needs to pay
            const hostSize = user.attributes.hostSize;
            if (hostSize != null && hostList.length >= hostSize) {
                paymentDialogRef.current.show({
                    title: "Out of Website Slots",
                    footer: "You will be prompted 1 transaction"
                });
                getEthPriceNow()
                .then(data => {
                    const ethPrice = 50 / data[Object.keys(data)[0]].ETH.USD;
                    const val = ethPrice.toString().substring(0, 11);
                    return Moralis.transfer({
                        type: "native", 
                        amount: Moralis.Units.ETH(val), 
                        receiver: process.env.METAMASK_ADDRESS
                    })
                })
                .then(res => {
                    paymentDialogRef.current.hide();
                    const curHostSize = user.attributes.hostSize;
                    return setUserData({
                        hostSize: curHostSize + 1
                    });
                })
                .then(res => {
                    onCreation();
                })
                .catch(err => {
                    paymentDialogRef.current.hide();
                    alert({
                        title: 'Error',
                        description: err.message,
                        status: 'error',
                        duration: 3000,
                    })        
                    return;
                })
            } else {
                onCreation();
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

    const handleSaveChanges = () => {
        if (hostIndex == -1) {
            alert({
                title: 'Error',
                description: 'Please select a website',
                status: 'error',
                duration: 3000,
            })
            return;
        } 

        let keywords = "";
        chipData.forEach((chip, idx) => {
            keywords += chip + (idx == chipData.length - 1 ? "" : ", ");
        });
        
        let newHostList = [...hostList];
        newHostList[hostIndex].title = hostTitle;
        newHostList[hostIndex].header = hostHeader;
        newHostList[hostIndex].description = hostDescription;
        newHostList[hostIndex].iframe = hostIframe;
        newHostList[hostIndex].image = hostImage;
        newHostList[hostIndex].isRobot = hostIsRobot;
        newHostList[hostIndex].language = hostLanguage;
        newHostList[hostIndex].keywords = keywords;
        setHostList(newHostList);
        setUserData({
            websites: newHostList
        })
        .then(res => {
            const websiteClass = Moralis.Object.extend("Website");
            const query = new Moralis.Query(websiteClass);
            query.equalTo("url", hostURL);
            return query.first();
        })
        .then(res => {
            res.set('title', hostTitle);
            res.set('header', hostHeader);
            res.set('description', hostDescription);
            res.set('image', hostImage);
            res.set('iframe', hostIframe);
            res.set('keywords', keywords);
            res.set('isRobot', hostIsRobot);
            res.set('language', hostLanguage);
            return res.save();
        })
        .then(res => {
            handleClear();
            setIsPreview(false);
            alert({
                title: 'Website Updated',
                description: "Changes has been updated.",
                status: 'success',
                duration: 3000,
            })
        })
        .catch(err =>  {
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
        })
    }

    const handleWebsitePreview = (host) => {
        setHostList(user.attributes.websites);
        const index = hostList.findIndex(res => res.title == host.title);
        setHostImage(host.image);
        setHostTitle(host.title);
        setHostHeader(host.header);
        setHostDescription(host.description);
        setHostIframe(host.iframe);
        setHostURL(host.url);
        setHostIsRobot(host.isRobot);
        setHostLanguage(host.language);
        if (host.keywords.length > 0) {
            setChipData(host.keywords.split(", "));
        };
        setHostIndex(index);
        setIsPreview(true);
    }

    const handleClear = () => {
        setHostImage("");
        setHostTitle("");
        setHostHeader("");
        setHostDescription("");
        setHostIframe("");
        setHostLanguage("");
        setHostKeywords("");
        setHostURL("");
        setChipData([
            "NFT Host",
            "Host NFTs",
            "Mint Website",
            "NFT Website Hosting",
            "Mint NFT Website Hosting",
            "Mint NFT",
            "NFT",
            "Mint",
            "Crypto Currency",
            "Crypto",
            "Ethereum",
        ]);
        setHostIsRobot(true);
    }

    const handleImageUpload = () => {
        uploadImageRef.current.show();
    }

    const handleCopyURL = () => {
        if (hostURL.length == 0) return;
        navigator.clipboard.writeText(hostList[hostIndex].url);
        alert({
            title: 'Info',
            description: "Link has been copied.",
            status: 'info',
            duration: 2000,
        })
    }

    const handleIsRobotChange = () => {
        setHostIsRobot((prev) => !prev)
    }

    const onTitleChange = (e) => {
        setHostTitle(e.target.value);
    }

    const onHeaderChange = (e) => {
        setHostHeader(e.target.value);
    }

    const onDescriptionChange = (e) => {
        setHostDescription(e.target.value);
    }

    const onIframeChange = (e) => {
        setHostIframe(e.target.value.replaceAll('"', "'"));
    }

    const onLanguageChange = (e) => {
        setHostLanguage(e.target.value);
    }

    const onKeywordsChange = (e) => {
        setHostKeywords(e.target.value);
    }

    const onKeywordsEnter = (e) => {
        if (e.key === 'Enter') {
            if (hostKeywords.indexOf(",") != -1) {
                const chipArray = hostKeywords.split(', ');
                setChipData([...chipData, ...chipArray]);
                setHostKeywords("");
            } else {
                const word = hostKeywords.trim();
                if (!chipData.includes(word)) {
                    setChipData([...chipData, word]);
                    setHostKeywords("");
                } else {
                    alert({
                        title: 'Error',
                        description: `You already used "${word}" keyword`,
                        status: 'error',
                        duration: 3000,
                    })
                }
            }
        }
    }

    return (
        <Box 
            maxW='1000px' 
            w='100%' 
            bg='white' 
            borderRadius='5px'
            mt='6'
            p='5'
            className={style.box}
        >
            <UploadImageDialog 
                ref={uploadImageRef} 
                hostImage={hostImage}
                setHostImage={setHostImage}
            />
            <PaymentDialog ref={paymentDialogRef} />
            <Text fontSize='16pt'>
                NFT Drop Hosting
            </Text>
            <Text fontSize='10pt'>
                ({hostList.length}/{user.attributes.hostSize == null ? 1 : user.attributes.hostSize})
            </Text>
            <WebsiteContainer 
                onCreate={handleCreateWebsite} 
                onClickHost={handleWebsitePreview}
            />
            <Box
                display='flex'
                flexDir='wrap'
                mt='2'
                h='180px'
            >
                <Button
                    variant='outline'
                    w='200px'
                    h='full'
                    mr='2'
                    onClick={handleImageUpload}
                >
                    <BsImageFill size='18pt' />
                    {hostImage.length > 0 && <img src={hostImage} alt='Website Logo'/>}
                </Button>
                <Box
                    display='flex'
                    flexDir='column'
                    w='full'
                    justifyContent='space-between'
                >
                    <Box
                        display='flex'
                    >
                        <Input 
                            placeholder='Title' 
                            variant='outline' 
                            value={hostTitle} 
                            onChange={onTitleChange}
                            isRequired
                        />
                        <Input 
                            placeholder='Link' 
                            variant='outline' 
                            value={hostURL} 
                            ml='2'
                            disabled
                            onClick={handleCopyURL}
                        />
                    </Box>
                    <Input 
                        placeholder='Header' 
                        variant='outline' 
                        value={hostHeader} 
                        onChange={onHeaderChange}
                        isRequired
                    />
                    <Textarea 
                        placeholder='Description' 
                        variant='outline' 
                        value={hostDescription} 
                        onChange={onDescriptionChange}
                        isRequired
                    />
                </Box>
            </Box>
            <Box
                mt='2'
            >
                <Textarea 
                    placeholder='ThirdWeb IFrame Embed Code' 
                    variant='outline' 
                    value={hostIframe} 
                    onChange={onIframeChange}
                    isRequired
                />
                <Checkbox 
                    mt='3'
                    size='md'
                    isChecked={hostIsRobot} 
                    onChange={handleIsRobotChange}
                >
                    Allow robots to index your website?
                </Checkbox>
                <Box
                    display='flex'
                    mt='3'
                >
                    <Input 
                        placeholder='Language'
                        variant='outline' 
                        value={hostLanguage} 
                        onChange={onLanguageChange}
                    />
                    <Input 
                        placeholder='Keywords'
                        variant='outline' 
                        value={hostKeywords} 
                        ml='2'
                        onChange={onKeywordsChange}
                        onKeyDown={onKeywordsEnter}
                    />
                </Box>
                <Box
                    mt='3'
                    display='flex'
                    flexWrap='wrap'
                    justifyContent='center'
                >
                    {chipData.map((chip, idx) => (
                        <Tag 
                            variant='solid'
                            size='md' 
                            borderRadius='full'
                            bg='rgb(230, 230, 230)'
                            color='blackAlpha.800'
                            key={idx}
                        >
                            <TagLabel>{chip}</TagLabel>
                            <TagCloseButton onClick={() => handleDeleteKeyword(idx)}/>
                        </Tag>
                    ))}
                </Box>
                {isPreview && (
                    <Box
                        mt='2'
                        display='flex'
                        justifyContent='space-between'
                    >
                        <Button variant="solid" colorScheme="red" onClick={handleWebsiteDelete}>
                            Delete
                        </Button>
                        <Box
                            display='flex'
                        >
                            <Button variant="solid" colorScheme="gray" onClick={handleClear}>
                                Clear
                            </Button>
                            <Button variant="solid" ml='2' colorScheme="blue" onClick={handleSaveChanges}>
                                Save Changes
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default HostContainer