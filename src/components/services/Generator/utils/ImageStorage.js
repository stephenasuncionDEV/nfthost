import { Text, Flex, Button, VStack, useColorModeValue,
    Box, Input, FormControl, FormHelperText
} from '@chakra-ui/react'
import { useUtils } from '@/hooks/useUtils'
import Dropzone from 'react-dropzone'
import { VscJson } from 'react-icons/vsc'
import { FaDownload, FaRedo } from 'react-icons/fa'
import { AiOutlineFile } from 'react-icons/ai'

const ImageStorage = () => {
    const { 
        jsonFiles,
        setJsonFiles,
        UploadJSON, 
        newImageStorage, 
        setNewImageStorage, 
        DownloadImageStorage, 
        isDownloading 
    } = useUtils();

    const dropContainerColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)');
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
            <Box mt='1em'>
                {!jsonFiles ? (
                    <Dropzone 
                        accept={{
                            'application/JSON': [],
                        }}
                        multiple 
                        onDrop={files => UploadJSON(files)}
                    >
                        {({getRootProps, getInputProps}) => (
                            <Flex 
                                w='full' 
                                h='200px'
                                bg={dropContainerColor}
                                borderRadius='10px'
                                justifyContent='center' 
                                alignItems='center' 
                                flexDir='column'
                                cursor='pointer'
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <VStack>
                                    <VscJson fontSize='18pt' />
                                    <Text fontSize='10pt'>
                                        Drag and drop Metadata Folder Here
                                    </Text>
                                    <Text fontSize='9pt'>
                                        Supported Format: .json
                                    </Text>
                                </VStack>
                            </Flex>
                        )}
                    </Dropzone>
                ) : (
                    <VStack
                        w='full' 
                        h='200px'
                        bg={dropContainerColor}
                        borderRadius='10px'
                        justifyContent='center' 
                        alignItems='center' 
                    >
                        <AiOutlineFile fontSize='18pt' />
                        <Text fontSize='10pt'>
                            Files: {jsonFiles?.length} json files
                        </Text>
                        <Button variant='danger' size='sm' leftIcon={<FaRedo />} onClick={() => setJsonFiles(null)}>
                            Reset
                        </Button>
                    </VStack>
                )}
            </Box>
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