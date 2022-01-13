import { useState, forwardRef, useImperativeHandle } from "react"
import { useDisclosure, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, 
    ModalCloseButton, ModalFooter, Button, FormControl, FormLabel, FormHelperText, 
    FormErrorMessage, Input, Textarea, HStack, Switch, Text, Select,
    InputGroup, InputRightAddon, Tag, TagLabel, TagCloseButton, useToast } from '@chakra-ui/react'
import { useMoralis } from "react-moralis"
import { useRouter } from 'next/router'

const languageList = [
    "English",
    "Mandarin Chinese",
    "Spanish",
    "Hindi/Urdu",
    "Arabic",
    "Bengali",
    "Portuguese",
    "Russian",
    "Japanese",
    "German",
    "Javanese",
    "Punjabi",
    "Wu",
    "French",
    "Telugu",
    "Vietnamese",
    "Marathi",
    "Korean",
    "Tamil",
    "Italian",
    "Turkish",
    "Cantonese/Yue"
];

const AddWebsiteDialog = (props, ref) => {
    const { onCreate, onSave } = props;
    const { user } = useMoralis();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isPreview, setIsPreview] = useState(false);
    const [isError, setIsError] = useState([false, false, false, false, false]);
    const [title, setTitle] = useState('');
    const [header, setHeader] = useState('');
    const [description, setDescription] = useState('');
    const [iframe, setIframe] = useState('');
    const [isRobot, setIsRobot] = useState(true);
    const [language, setLanguage] = useState('English');
    const [keywords, setKeywords] = useState('');
    const [image, setImage] = useState('');
    const [isPremium, setIsPremium] = useState(false);
    const [url, setUrl] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [keywordsList, setKeywordsList] = useState([
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
    const router = useRouter();
    const alert = useToast();

    useImperativeHandle(ref, () => ({
        show(website = {}) {
            if (Object.keys(website).length > 0) {
                setUrl(website.url);
                setIsPreview(true);
                setTitle(website.title);
                setHeader(website.header);
                setDescription(website.description);
                setIframe(website.iframe);
                setImage(website.image);
                setIsRobot(website.isRobot);
                setLanguage(website.language);
                setIsPremium(website.isPremium);
                setKeywordsList(website.keywords.split(", "));
            }
            onOpen();
        },
        done() {
            setIsProcessing(false);
            onClose();
        }
    }), [])

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleHeaderChange = (e) => {
        setHeader(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleIframeChange = (e) => {
        setIframe(e.target.value.replaceAll('"', "'"));
    }

    const handleIsRobotChange = (e) => {
        setIsRobot(e.target.checked);
    }

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    }

    const handleKeywordsChange = (e) => {
        setKeywords(e.target.value);
    }

    const handleDeleteKeyword = (index) => {
        let newKeywordsList = [...keywordsList];
        newKeywordsList.splice(index, 1);
        setKeywordsList(newKeywordsList);
    }

    const handleKeywordEnter = (e) => {
        try {
            if (e.key === 'Enter') {
                if (keywordsList.length > 12) throw new Error("Maximum allowed keywords is 12");
                if (keywords.indexOf(",") != -1) {
                    const newKeywords = keywords.split(', ');
                    setKeywordsList([...keywordsList, ...newKeywords]);
                    setKeywords("");
                } else {
                    const word = keywords.trim();
                    if (keywordsList.includes(word)) throw new Error(`You already used "${word}" keyword`);
                    setKeywordsList([...keywordsList, word]);
                    setKeywords("");
                }
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

    const handleImageChange = (e) => {
        setImage(e.target.value);
    }

    const handleClear = () => {
        setTitle("");
        setHeader("");
        setDescription("");
        setIframe("");
        setImage("");
        setIsRobot(true);
        setLanguage('English');
        setKeywords('');
        setKeywordsList([
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
    }

    const handleModifyWebsite = (isSave) => {
        try {
            // Validate if fields are empty
            if (title.trim().length == 0 || 
                header.trim().length == 0 || 
                description.trim().length == 0 || 
                iframe.trim().length == 0 || 
                image.trim().length == 0) {
                throw new Error("Please fill in all the required fields");
            }

            // Validate duplicate website title
            if (!isSave) {
                const websiteArr = user.attributes.websites;
                const uniqueTitles = new Set(websiteArr.map(w => w.title));
                if (uniqueTitles.has(title)) throw new Error("You cannot have a duplicated website");
            }

            // Validate Iframe source code
            if (iframe.indexOf("iframe") == -1 || iframe.indexOf("src='https://cloudflare-ipfs.com/ipfs/") == -1) {
                throw new Error("You must use Thirdweb's iframe embed code");
            }

            // Validate Image Link
            if (image.match(/\.(jpeg|jpg|gif|png|bmp|gif|webp)$/) == null) throw new Error("Please put a valid image link.");

            setIsProcessing(true);

            if (isSave) {
                // Save Website
                onSave({
                    url,
                    title,
                    header,
                    description,
                    iframe,
                    image,
                    isRobot,
                    language,
                    keywordsList
                });

            } else {
                // Create Website
                onCreate({
                    title,
                    header,
                    description,
                    iframe,
                    image,
                    isRobot,
                    language,
                    keywordsList
                });
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

    const handleEditor = () => {
        router.query.id = url.substring(url.lastIndexOf('/') + 1);
        router.push({ 
            pathname: '/editor',
            query: { id: router.query.id }
        }, 
            undefined, 
            {}
        )
    }

    const handleClose = () => {
        setIsPreview(false);
        handleClear();
        onClose();
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={handleClose} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent maxW="56em">
                <ModalHeader>{isPreview ? title : "Add a website"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack spacing='1.5em' alignItems='flex-start'>
                        <Box>
                            <HStack>
                                <FormControl isInvalid={isError[0]} isRequired>
                                    <FormLabel htmlFor='title'>Title</FormLabel>
                                    <Input 
                                        id='title' 
                                        type='text'
                                        value={title}
                                        onChange={handleTitleChange}
                                    />
                                    {!isError[0] ? (
                                        <FormHelperText>The window title of your website.</FormHelperText>
                                    ) : (
                                        <FormErrorMessage>Email is required.</FormErrorMessage>
                                    )}
                                </FormControl>
                                <FormControl mt='2' isInvalid={isError[1]} isRequired>
                                    <FormLabel htmlFor='header'>Header</FormLabel>
                                    <Input 
                                        id='header' 
                                        type='text'
                                        value={header}
                                        onChange={handleHeaderChange}
                                    />
                                    {!isError[1] ? (
                                        <FormHelperText>The main header of the website.</FormHelperText>
                                    ) : (
                                        <FormErrorMessage>Header is required.</FormErrorMessage>
                                    )}
                                </FormControl>
                            </HStack>
                            <FormControl mt='2' isInvalid={isError[2]} isRequired>
                                <FormLabel htmlFor='description'>Description</FormLabel>
                                <Textarea 
                                    id='description' 
                                    value={description}
                                    resize='vertical'
                                    onChange={handleDescriptionChange}
                                />
                                {!isError[2] ? (
                                    <FormHelperText>The description of the NFT collection.</FormHelperText>
                                ) : (
                                    <FormErrorMessage>Description is required.</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl mt='2' isInvalid={isError[3]} isRequired>
                                <FormLabel htmlFor='iframe'>Iframe Embed Code</FormLabel>
                                <Textarea 
                                    id='iframe' 
                                    value={iframe}
                                    resize='none'
                                    rows={8}
                                    onChange={handleIframeChange}
                                />
                                {!isError[3] ? (
                                    <FormHelperText>The NFT drop iframe embed code from Thirdweb.</FormHelperText>
                                ) : (
                                    <FormErrorMessage>Iframe code is required.</FormErrorMessage>
                                )}
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl isInvalid={isError[4]} isRequired>
                                <FormLabel htmlFor='image'>Image URL</FormLabel>
                                <Input 
                                    id='image' 
                                    type='text'
                                    value={image}
                                    onChange={handleImageChange}
                                />
                                {!isError[4] ? (
                                    <FormHelperText>The logo of your NFT collection.</FormHelperText>
                                ) : (
                                    <FormErrorMessage>Image URL is required.</FormErrorMessage>
                                )}
                            </FormControl>
                            <Text mt='2' fontWeight='medium'>Meta Tags</Text>
                            <Text fontSize='sm' color='gray.500'>Modify meta tags of your website.</Text>
                            <HStack mt='2'>
                                <FormLabel htmlFor='allowRobot' m='0' px='2'>Allow robots to index your website?</FormLabel>
                                <Switch id='allowRobot' isChecked={isRobot} onChange={handleIsRobotChange}/>
                            </HStack>
                            <FormLabel htmlFor='language' mt='4'>Language</FormLabel>
                            <Select id='language' mt='2' value={language} onChange={handleLanguageChange}>
                                {languageList.map((language, idx) => (
                                    <option value={language} key={idx}>{language}</option>
                                ))}
                            </Select>
                            <FormControl>
                                <FormLabel htmlFor='keywords' mt='2'>Keywords</FormLabel>
                                <InputGroup>
                                    <Input 
                                        id='keywords'
                                        type='text'
                                        value={keywords}
                                        onChange={handleKeywordsChange}
                                        onKeyDown={handleKeywordEnter}
                                    />
                                    <InputRightAddon children='Enter' />
                                </InputGroup>
                                <FormHelperText>You can add comma(s) to add multiple keywords at once.</FormHelperText>
                            </FormControl>
                            <Box
                                mt='3'
                                display='flex'
                                flexWrap='wrap'
                                justifyContent='center'
                                maxWidth='352.828px'
                            >
                                {keywordsList.map((keyword, idx) => (
                                    <Tag 
                                        variant='solid'
                                        size='md' 
                                        borderRadius='full'
                                        bg='rgb(230, 230, 230)'
                                        color='blackAlpha.800'
                                        key={idx}
                                    >
                                        <TagLabel>{keyword}</TagLabel>
                                        <TagCloseButton onClick={() => handleDeleteKeyword(idx)}/>
                                    </Tag>
                                ))}
                            </Box>
                        </Box>
                    </HStack>
                </ModalBody>
                <ModalFooter mt='2'>
                    <Button
                        variant='solid'
                        borderWidth='1px'
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='solid'
                        ml='2'
                        onClick={handleClear}
                        colorScheme='blue'
                    >
                        Clear
                    </Button>
                    {isPreview ? (
                        <Box>
                            {isPremium && (
                                <Button
                                    variant='solid'
                                    ml='2'
                                    bg='black'
                                    color='white'
                                    _hover={{
                                        bg: 'rgb(50,50,50)'
                                    }}
                                    onClick={handleEditor}
                                >
                                    Website Editor
                                </Button>
                            )}
                            <Button
                                variant='solid'
                                ml='2'
                                bg='black'
                                color='white'
                                _hover={{
                                    bg: 'rgb(50,50,50)'
                                }}
                                onClick={() => handleModifyWebsite(true)}
                                isLoading={isProcessing}
                                loadingText="Saving"
                            >
                                Save Changes
                            </Button>
                        </Box>
                    ) : (
                        <Button
                            variant='solid'
                            ml='2'
                            bg='black'
                            color='white'
                            _hover={{
                                bg: 'rgb(50,50,50)'
                            }}
                            onClick={() => handleModifyWebsite(false)}
                            isLoading={isProcessing}
                            loadingText="Creating"
                        >
                            Create
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default forwardRef(AddWebsiteDialog)