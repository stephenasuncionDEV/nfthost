import { Box, Text, Flex, VStack, IconButton, useColorModeValue, 
    Wrap, Icon, Image, Button, HStack
} from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useTraits } from '@/hooks/services/generator/useTraits'
import { FaTrashAlt } from 'react-icons/fa'
import { BsFillImageFill } from 'react-icons/bs'
import Dropzone from 'react-dropzone'
import { webColor } from '@/theme/index'

const Traits = () => {
    const { layers, currentLayer } = useGenerator();
    const { DeleteTrait, UploadAssets, DeleteAllTraits } = useTraits();
    const { setAreYouSureData, setIsAreYouSureModal } = useCore();

    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);
    const dropContainerColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)');
    const itemColor = useColorModeValue('blackAlpha.100', 'blackAlpha.400');
    const itemBorderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300');

    return (
        <Flex
            p='1em'
            bg={containerColor}
            borderRadius='.25em'
            flex='1'
            minW='180px'
            flexDir='column'
            h='100%'
            border='1px solid rgb(117,63,229)'
        >
            <Flex justifyContent='space-between'>
                <Flex flexDir='column'>
                    <Text fontWeight='bold' fontSize='10pt'>
                        Traits
                    </Text>
                    <Text fontSize='10pt'>
                        Current Layer: <span style={{ color: '#08BDD4', fontWeight: 'bold' }}>{layers[currentLayer]?.name}</span>
                    </Text>
                </Flex>
                <HStack>
                    <Button variant='danger' leftIcon={<FaTrashAlt />} onClick={() => {
                        setAreYouSureData({
                            item: 'traits',
                            action: 'Clear',
                            button: 'danger',
                            callback: () => {
                                DeleteAllTraits();
                            }
                        })
                        setIsAreYouSureModal(true);
                    }}>
                        Clear
                    </Button>
                </HStack>
            </Flex>
            {layers[currentLayer]?.images.length > 0 && (
                <Wrap spacing='1em' mt='1em' mb='2em' p='1em'>
                    {layers[currentLayer]?.images?.map((image, idx) => (
                        <Box p='1em' key={idx} bg={itemColor} borderRadius='10px' position='relative' borderColor={itemBorderColor} borderStyle='dashed' borderWidth='3px'>
                            <VStack>
                                <Image src={image.preview} alt={image.name} w='85px' h='85px' />
                                <Text fontSize='10pt' w='85px' noOfLines='1'>
                                    {image.name}
                                </Text>
                            </VStack>
                            <IconButton 
                                aria-label='Delete Trait' 
                                position='absolute'
                                top='-2.5'
                                right='-2.5'
                                isRound
                                icon={<FaTrashAlt />}
                                bg='rgb(52,140,212)'
                                size='sm'
                                onClick={() => DeleteTrait(image.name)}
                            />
                        </Box>
                    ))}
                </Wrap>
            )}
            <Dropzone 
                accept={{
                    'image/png': [],
                }}
                multiple 
                onDrop={files => UploadAssets(files)}
            >
                {({getRootProps, getInputProps}) => (
                    <Flex 
                        w='full' 
                        h='200px' 
                        mt='1em' 
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
                            <Icon as={BsFillImageFill} fontSize='18pt' />
                            <Text>
                                Drag and drop images here
                            </Text>
                            <Text fontSize='10pt'>
                                Supported Format: .png
                            </Text>
                        </VStack>
                    </Flex>
                )}
            </Dropzone>
        </Flex>
    )
}

export default Traits