import { Text, Flex, Textarea, useColorModeValue, Button, useToast } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'

const Preview = () => {
    const toast = useToast();
    const { 
        layers,
        name,
        description,
        externalURL,
        standardType,
        symbol,
        sellerFee,
        creators,
        storageURL,
        animationURL,
        youtubeURL,
        backgroundColor,
        isRandomizedMetadata,
        setIsRandomizedMetadata
    } = useGenerator();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');
    const bgColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)');

    const previewMetadata = () => {
        const standard = standardType.name.toLowerCase();
        const externalStorage = storageURL.trim().charAt(storageURL.length - 1) === '/' ? storageURL.substring(0, storageURL.length - 1) : storageURL;
    
        const DEFAULT_METADATA = {
            name: `${name.trim()} #1`,
            description: description.trim(),                
            image: `${externalStorage}/0.png`,
            attributes: layers.map((layer) => {
                return {
                    trait_type: layer.name,
                    value: layer?.images[0]?.name || 'Sample Value'
                }
            }),
            compiler: 'https://nfthost.app/'
        }
    
        let metadataObj = {
            ethereum: {
                ...DEFAULT_METADATA,
            },
            solana: {
                ...DEFAULT_METADATA,
                symbol,
                seller_fee_basis_points: sellerFee,
                properties: {
                    category: 'image',
                    files: [
                        {
                            uri: `0.png`,
                            type: 'image/png'
                        }
                    ],
                    creators: creators
                }
            }
        }
    
        // Optional data
    
        if (externalURL.length > 0) {
            metadataObj.ethereum = {...metadataObj.ethereum, external_url: externalURL};
            metadataObj.solana = {...metadataObj.solana, external_url: externalURL};
        }
    
        if (backgroundColor.length > 0) {
            metadataObj.ethereum = {...metadataObj.ethereum, background_color: backgroundColor};
        }
    
        if (animationURL.length > 0) {
            metadataObj.ethereum = {...metadataObj.ethereum, animation_url: animationURL};
            metadataObj.solana = {...metadataObj.solana, animation_url: animationURL};
        }
    
        if (youtubeURL.length > 0) {
            metadataObj.ethereum = {...metadataObj.ethereum, youtube_url: youtubeURL};
        }
    
        return JSON.stringify(metadataObj[standard], null, 4);
    }

    const Copy = () => {
        navigator.clipboard.writeText(previewMetadata());

        toast({
            title: 'Success',
            description: 'Metadata Sample has been copied to clipboard',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom-center'
        })
    }

    return (
        <Flex 
            flexDir='column'
            id='metadata'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='.25em'
            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
            alignItems='flex-start'
        >
            <Text fontWeight='bold' fontSize='10pt'>
                Preview
            </Text>
            <Text fontSize='9pt' mb='1.5em'>
                A preview of your NFT collection's json metadata file.
            </Text>
            <Flex bg={bgColor} borderRadius='10px' justifyContent='center' alignItems='center' p='1em' w='full' position='relative'>
                <Textarea value={previewMetadata()} size='sm' rows={20} readOnly/>
                <Button size='sm' variant='primary' position='absolute' top='7' right='7' onClick={Copy}>
                    COPY
                </Button>
            </Flex>
        </Flex>
    )
}

export default Preview