import { useState, useEffect, useRef } from "react"
import { useToast, Box, Text, Button, Link, HStack, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMoralis } from "react-moralis"
import grapesjs from "grapesjs"
import gjsPresetWebpage from "grapesjs-preset-webpage"
import NftHostLogo from "../components/icons/NftHostLogo"
import ThirdWebLogo from "../components/icons/ThirdWebLogo"
import LogoutModal from "../components/pages/Editor/LogoutModal"
import Header from '../components/Header'

const Editor = () => {
    const { Moralis, user } = useMoralis();
    const [editable, setEditable] = useState(false);
    const [websiteData, setWebsiteData] = useState(null);
    const [editor, setEditor] = useState(null);
    const logoutModalRef = useRef();
    const nftLogo = useRef();
    const twLogo = useRef();
    const router = useRouter();
    const alert = useToast();
    const { id } = router.query;

    // Editor Validations
    useEffect(() => {
        if (user == null) {
            logoutModalRef.current.show();
            return;
        }

        const websiteClass = Moralis.Object.extend("Website");
        const query = new Moralis.Query(websiteClass);
        query.equalTo("url", `https://www.nfthost.app/${id}`);
        query.first()
        .then(res => {
            if (res.attributes.owner != user.attributes.ethAddress) throw new Error("Website ownership mismatch");
            setEditable(true);
            setWebsiteData(res.attributes);
        })
        .catch(err => {
            alert({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
            })
            location.href='/console?page=dashboard';
        });
    }, [])

    // Initialize Grapes JS
    useEffect(() => {
        if (websiteData == null) return;

        // Initialize Editor
        const editor = grapesjs.init({
            container: "#editor",
            plugins: [gjsPresetWebpage],
            pluginOpts: {
                gjsPresetWebpage: {},
            },
            autoload: false,
            autosave: false,
            blockManager: {
                blocks: [
                    {
                        id: 'nfthost-image',
                        label: "NFTHost Image",
                        type: "image",
                        category: "NFT Host",
                        content: `<img data-gjs-type="nfthost-image" src="${websiteData.image}" alt="${websiteData.header}" />`,
                        media: NftHostLogo()
                    },
                    {
                        id: 'nfthost-header',
                        label: "NFTHost Header",
                        type: "text",
                        category: "NFT Host",
                        content: `<div data-gjs-type="nfthost-header" style="font-size:50px; font-family:'Lucida Sans Unicode'">${websiteData.header}</div>`,
                        media: NftHostLogo()
                    },
                    {
                        id: 'nfthost-description',
                        label: "NFTHost Description",
                        type: "text",
                        category: "NFT Host",
                        content: `<div data-gjs-type="nfthost-description" style="font-family:'Lucida Sans Unicode'">${websiteData.description}</div>`,
                        media: NftHostLogo()
                    },
                    {
                        id: 'nfthost-iframe',
                        label: "Thirdweb Iframe",
                        type: "iframe",
                        category: "NFT Host",
                        content: `<div data-gjs-type="nfthost-iframe">${websiteData.iframe}`,
                        media: ThirdWebLogo()
                    },
                ]
            },
        })

        // Remove Component Settings
        editor.DomComponents.addType("nfthost-iframe", {
            model: {
                defaults: {
                    selectable: true,
                    draggable: true,
                    removable: true,
                    activate: true,
                    resizable: true,
                    traits: []
                }
            }
        })

        editor.DomComponents.addType("nfthost-header", {
            model: {
                defaults: {
                    selectable: true,
                    draggable: true,
                    removable: true,
                    activate: true,
                    traits: []
                }
            }
        })

        editor.DomComponents.addType("nfthost-description", {
            model: {
                defaults: {
                    selectable: true,
                    draggable: true,
                    removable: true,
                    activate: true,
                    traits: []
                }
            }
        })

        editor.DomComponents.addType("nfthost-image", {
            model: {
                defaults: {
                    selectable: true,
                    draggable: true,
                    removable: true,
                    activate: true,
                    resizable: true,
                    traits: []
                }
            }
        })

        // Load Current Website Data
        if (websiteData.body != null) {
            editor.loadData(websiteData.body);
        }

        setEditor(editor);
        
    }, [websiteData])

    const handleCancel = () => {
        location.href='/console?page=dashboard';
    }

    const handleVisit = () => {
        window.open(`https://www.nfthost.app/${id}`);
    }

    const handleSaveChanges = () => {
        const websiteClass = Moralis.Object.extend("Website");
        const query = new Moralis.Query(websiteClass);
        query.equalTo("url", `https://www.nfthost.app/${id}`);
        query.first()
        .then(res => {
            res.set("body", editor.storeData());
            return res.save();
        })
        .then(res => {
            alert({
                title: 'Success',
                description: 'Changes has been saved.',
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
    }

    return (
        <Box 
            display='flex'
            flexDir='column'
        >
            <Header
                title='NFT Host - Website Editor'
                description='Website Editor for NFT Host'
                keywords="NFT Host, Host NFT, Mint Website, Mint NFT Website Hosting, Mint NFT, NFT, Mint, Crypto Currency, Crypto, Ethereum"
                robots={false}
                language='English'
                image='/logo.png'
            />
            <object ref={nftLogo} data="/Logo.svg" type="image/svg+xml" style={{display: 'none'}}/>
            <object ref={twLogo} data="/ThirdWeb.svg" type="image/svg+xml" style={{display: 'none'}}/>
            <LogoutModal ref={logoutModalRef} />
            {websiteData && (
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    p='2' 
                >
                    <Box
                        display='flex'
                        alignItems='center'
                    >
                        <Link 
                            href='/' 
                            _hover={{ textDecoration: "none" }}
                            display='flex'
                            alignItems='center'
                        >
                            <Image 
                                ml='1em'
                                boxSize='50px'
                                objectFit='scale-down'
                                src='/logo.png'
                                fallbackSrc='https://via.placeholder.com/50'
                            />
                            <Text 
                                ml='1em'
                                fontSize='18pt'
                            >
                                NFT Host
                            </Text>
                        </Link>
                        <Text 
                            ml='2em'
                            fontSize='10pt'
                            color='rgb(120,120,120)'
                        >
                            Website: {websiteData.title}
                        </Text>
                    </Box>
                    <HStack
                        mr='1em'
                    >
                        <Button
                            variant='solid'
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='solid'
                            colorScheme='blue'
                            onClick={handleSaveChanges}
                        >
                            Save Changes
                        </Button>
                        <Button
                            variant='outline'
                            onClick={handleVisit}
                        >
                            Visit Website
                        </Button>
                    </HStack>
                </Box>
            )}
            {editable && (
                <div id='editor'></div>
            )}
        </Box>
    )
}

export default Editor