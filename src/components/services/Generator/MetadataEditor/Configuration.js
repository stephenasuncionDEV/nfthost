import { Box, HStack, Text, Flex, Button,
    Input, Textarea, NumberInput, NumberInputField, 
    NumberInputStepper, NumberIncrementStepper, 
    NumberDecrementStepper, FormControl, Tag, TagCloseButton, 
    FormHelperText, useColorModeValue
} from '@chakra-ui/react'
import { IoMdAdd } from '@react-icons/all-files/io/IoMdAdd'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useMetadata } from '@/hooks/services/generator/useMetadata'
import { webColor } from '@/theme/index'

const Configuration = () => {
    const { 
        name,
        setName,
        description: desc,
        setDescription,
        externalURL,
        setExternalURL,
        standardType,
        collectionSize,
        setCollectionSize,
        symbol,
        setSymbol,
        creatorAddress,
        setCreatorAddress,
        sellerFee,
        setSellerFee,
        creatorShare,
        setCreatorShare,
        creators,
        storageURL,
        setStorageURL,
        animationURL,
        setAnimationURL,
        youtubeURL,
        setYoutubeURL,
        backgroundColor,
        setBackgroundColor,
    } = useGenerator();
    const { AddCreator, DeleteCreator } = useMetadata();

    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);
    const componentColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)');

    const isDisplay = (component) => standardType?.components?.includes(component);

    return (
        <Flex 
            flexDir='column'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='.25em'
            alignItems='flex-start'
            flex='1'
            border='1px solid rgb(117,63,229)'
        >
            <Text fontWeight='bold' fontSize='10pt'>
                Configuration
            </Text>
            <Text fontSize='9pt'>
                Current Standard: <span style={{ color: 'rgb(52,140,212)' }}>{standardType?.name}</span>
            </Text>
            <Text fontSize='9pt' mb='1em'>
                Fields with * are required. Otherwise, leave it empty if you want.
            </Text>
            {isDisplay('name') && (
                <HStack w='full'>       
                    <FormControl flex='1'>
                        <Input 
                            id='collectionName' 
                            placeholder='Name*'
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                        />
                        <FormHelperText fontSize='9pt'>Name of your NFT Collection.</FormHelperText>
                    </FormControl>
                    {isDisplay('size') && (
                        <FormControl flex='1'>
                            <NumberInput min={1} max={10000} value={collectionSize} onChange={setCollectionSize}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <FormHelperText fontSize='9pt'>Size of your NFT Collection.</FormHelperText>
                        </FormControl>
                    )}
                </HStack>
            )}
            {isDisplay('symbol') && (
                <HStack alignItems='flex-start' mt='1em' w='full'>
                    <FormControl flex='1'>
                        <Input 
                            id='collectionSymbol' 
                            placeholder='Symbol'
                            value={symbol} 
                            onChange={(e) => setSymbol(e.target.value)}
                        />
                        <FormHelperText fontSize='9pt'>Symbol of your NFT Collection.</FormHelperText>
                    </FormControl>
                    {isDisplay('seller_fee_basis_points') && (
                        <FormControl flex='1'>
                            <NumberInput id='collectionSellerFee' min={1} max={1000} value={sellerFee} onChange={setSellerFee}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <FormHelperText fontSize='9pt'>Royalties percentage awarded to creators. Shown as a percentage received by each co-creator.</FormHelperText>
                        </FormControl>
                    )}
                </HStack>
            )}
            {isDisplay('description') && (
                <FormControl mt='1em'>
                    <Textarea id='collectionDescription' placeholder='Description*' w='full' rows='5' value={desc} onChange={(e) => setDescription(e.target.value)}/>
                    <FormHelperText fontSize='9pt'>Short Description of your NFT Collection. Markdown is supported.</FormHelperText>
                </FormControl>
            )}
            {isDisplay('image') && (
                <FormControl mt='1em'>
                    <Input id='collectionUrl' placeholder='Image Storage URL' w='full' value={storageURL} onChange={(e) => setStorageURL(e.target.value)}/>
                    <FormHelperText fontSize='9pt'>This is the External URL to the image of the item. Can be just about any type of image, and can be IPFS URLs or paths. This could be left blank because most contract deployers update the image key automatically when uploading your metadata to ipfs.</FormHelperText>
                </FormControl>
            )}
            {isDisplay('external_url') && (
                <FormControl mt='1em'>
                    <Input id='collectionExternalUrl' placeholder='External URL' w='full' value={externalURL} onChange={(e) => setExternalURL(e.target.value)}/>
                    <FormHelperText fontSize='9pt'>This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site. URL to an external application or website where users can also view the asset.</FormHelperText>
                </FormControl>
            )}
            {isDisplay('background_color') && (
                <FormControl mt='1em'>
                    <Input id='collectionBackgroundColor' placeholder='Background Color' w='full' value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)}/>
                    <FormHelperText fontSize='9pt'>Background color of the item on OpenSea. Must be a six-character hexadecimal without a pre-pended #.</FormHelperText>
                </FormControl>
            )}
            {isDisplay('animation_url') && (
                <FormControl mt='1em'>
                    <Input id='collectionAnimationUrl' placeholder='Animation URL' w='full' value={animationURL} onChange={(e) => setAnimationURL(e.target.value)}/>
                    <FormHelperText fontSize='9pt'>A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV, and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA. Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas, WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.</FormHelperText>
                </FormControl>
            )}
            {isDisplay('youtube_url') && (
                <FormControl mt='1em'>
                    <Input id='collectionYoutubeUrl' placeholder='Youtube URL' w='full' value={youtubeURL} onChange={(e) => setYoutubeURL(e.target.value)}/>
                    <FormHelperText fontSize='9pt'>A URL to a YouTube video.</FormHelperText>
                </FormControl>
            )}
            {isDisplay('compiler') && (
                <FormControl mt='1em'>
                    <Input id='collectionCompiler' w='full' value='https://nfthost.app/' readOnly disabled/>
                    <FormHelperText fontSize='9pt'>Compiler of your NFT Collection.</FormHelperText>
                </FormControl>
            )}
            {isDisplay('creators') && (
                <Box mt='1em' w='full'>
                    <HStack w='full' alignItems='flex-start'>
                        <FormControl flex='1'>
                            <Input 
                                id='collectionCreatorAddress' 
                                placeholder='Creator Wallet Address'
                                value={creatorAddress} 
                                onChange={(e) => setCreatorAddress(e.target.value)} 
                            />
                            <FormHelperText fontSize='9pt'>Wallet Address of a Creator</FormHelperText>
                        </FormControl>
                        <FormControl flex='1' maxW='100px'>
                            <NumberInput id='collectionCreatorShare' min={1} max={100} w='100px' value={creatorShare} onChange={setCreatorShare}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <FormHelperText fontSize='9pt'>Share Percentage</FormHelperText>
                        </FormControl>
                        <Button w='80px' onClick={AddCreator} variant='primary' rightIcon={<IoMdAdd />}>
                            Add
                        </Button>
                    </HStack>
                    {creators?.length > 0 && (
                        <Box py='.5em' px='1em' bg={componentColor} mt='1em' borderRadius='10px'>
                            <Text fontSize='10pt' mt='1em'>
                                Creator List
                            </Text>
                            <Flex flexDir='column' justifyContent='center' w='full' mt='.5em'>
                                {creators?.map((creator, idx) => (
                                    <Tag key={idx} mb='.5em' justifyContent='space-between'>
                                        <HStack justifyContent='space-between' w='full'>
                                            <Text noOfLines='1'>
                                                Address: {creator.address}
                                            </Text>
                                            <Text>
                                                Share: {creator.share}%
                                            </Text>
                                        </HStack>
                                        <TagCloseButton onClick={() => DeleteCreator(idx)}/>
                                    </Tag>
                                ))}
                            </Flex>
                        </Box>
                    )}
                </Box>
            )}
        </Flex>
    )
}

export default Configuration