import { Box, HStack, Text, Flex, Button, 
    VStack, Input, IconButton, useColorModeValue, Wrap,
    Icon
} from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useAssets } from '@/hooks/useAssets'
import { FaTrashAlt } from 'react-icons/fa'
import { BsFillImageFill } from 'react-icons/bs'
import Dropzone from 'react-dropzone'

const Assets = () => {
    const { layers, currentLayer } = useGenerator();
    const { DeleteTrait, UploadAssets } = useAssets();

    const containerColor = useColorModeValue('whiteAlpha.500', 'blackAlpha.500');

    return (
        <Box
            id='assets'
            p='1em'
            bg={containerColor}
            borderRadius='10px'
            boxShadow='md'
            h='100%'
            ml='1em'
        >
            <Text variant='content_subtitle' mt='0'>
                Assets
            </Text>
            <Text fontSize='10pt'>
                Current Layer: {layers[currentLayer]?.name}
            </Text>
            <Wrap spacing='1em' mt='2em' mb='2em'>
                {layers[currentLayer]?.images?.map((image, idx) => (
                    <Box p='1em' key={idx} bg='rgba(0,0,0,0.2)' borderRadius='10px' position='relative'>
                        <VStack>
                            <Image src={image.preview} alt={image.name} w='85px' h='85px' />
                            <Text fontSize='10pt' isTruncated w='85px'>
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
                            bg='rgba(0,0,0,0.2)'
                            size='sm'
                            onClick={() => DeleteTrait(image.name)}
                        />
                    </Box>
                ))}
            </Wrap>
            <Dropzone accept={['image/png', 'image/webp']} multiple onDrop={files => UploadAssets(files)}>
                {({getRootProps, getInputProps}) => (
                    <Flex w='full' h='200px' mt='1em' bg='rgba(0,0,0,0.2)' borderRadius='10px' justifyContent='center' alignItems='center' flexDir='column' {...getRootProps()}>
                        <input {...getInputProps()} />
                        <VStack opacity='40%'>
                            <Icon as={BsFillImageFill} fontSize='18pt' />
                            <Text>
                                Drag and drop images here
                            </Text>
                            <Text fontSize='10pt'>
                                Supported Format: .png and .webp
                            </Text>
                        </VStack>
                    </Flex>
                )}
            </Dropzone>
        </Box>
    )
}

export default Assets