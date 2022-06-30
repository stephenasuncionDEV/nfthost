import { Text, Flex, Button, VStack, useColorModeValue, 
    Input, FormControl, FormHelperText
} from '@chakra-ui/react'
import { useUtils } from '@/hooks/useUtils'
import { FaDownload } from 'react-icons/fa'
import JsonDropbox from './JsonDropbox'

const ImageStorage = () => {
    const { 
        newImageStorage, 
        setNewImageStorage, 
        DownloadImageStorage, 
        isDownloading 
    } = useUtils();

    const helperColor = useColorModeValue('gray.500', 'whiteAlpha.600');

    return (
        <Flex flexDir='column' w='full'>
            <Text fontWeight='bold' fontSize='10pt'>
                Update Image Storage
            </Text>
            <Text fontSize='10pt'>
                Update the image key on your metadata. 
            </Text>
            <VStack w='full' mt='1em'>
                <FormControl>
                    <Input id='collectionUrl' placeholder='New Image Storage URL' w='full' value={newImageStorage} onChange={(e) => setNewImageStorage(e.target.value)} />
                    <FormHelperText fontSize='9pt'>This is the External URL to the image of the item. Can be just about any type of image (including SVGs, which will be cached into PNGs by OpenSea), and can be IPFS URLs or paths. We recommend using a 350 x 350 image.</FormHelperText>
                </FormControl>
                <Text>
                    "image": "{newImageStorage}/0.png",
                </Text>
            </VStack>
            <JsonDropbox mt='1em' />
            <Flex mt='1em' justifyContent='space-between'>
                <Text fontSize='9pt' color={helperColor}>
                    Your metadata folder must contain all the numbered json files and metadata.json
                </Text>
                <Button size='sm' variant='primary' leftIcon={<FaDownload />} onClick={DownloadImageStorage} isLoading={isDownloading} disabled={isDownloading} loadingText='Downloading'>
                    Download
                </Button>
            </Flex>
        </Flex>
    )
}

export default ImageStorage