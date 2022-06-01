import { Box, HStack, Text, Flex, Button, VStack, Input, IconButton, useColorModeValue } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useLayer } from '@/hooks/useLayer'
import { MdOutlineAdd  } from 'react-icons/md'
import { FaTrashAlt } from 'react-icons/fa'

const Layers = () => {
    const { layers, currentLayer } = useGenerator();
    const { 
        ChangeLayerName, 
        PreviewLayer, 
        DeleteLayer, 
        AddLayer 
    } = useLayer();

    const containerColor = useColorModeValue('whiteAlpha.500', 'blackAlpha.500');
    
    return (
        <VStack 
            id='layers'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='10px'
            boxShadow='md'
            h='100%'
        >
            <HStack spacing='2em'>
                <Text variant='content_subtitle' mt='0'>
                    Layers
                </Text>
                <Button size='sm' rightIcon={<MdOutlineAdd />} onClick={AddLayer}>
                    Add Layer
                </Button>
            </HStack>
            <VStack alignItems='flex-start' w='full'>
                <HStack>
                    <Box borderRadius='5px' bg='orange' p='.25em' />
                    <Text>
                        Top Layer
                    </Text>
                </HStack>
                <HStack>
                    <Box borderRadius='5px' bg='#08BDD4' p='.25em' />
                    <Text>
                        Bottom Layer
                    </Text>
                </HStack>
            </VStack>
            <VStack spacing='1em'>
                {layers?.map((layer, idx) => (
                    <Box position='relative' key={idx}>
                        <Button 
                            key={idx} w='170px' h='55px' 
                            borderLeftWidth={idx === 0 || idx === layers.length - 1 ? '4px' : '0'} 
                            borderColor={idx === 0 ? '#08BDD4' : 'orange'}
                            onClick={() => PreviewLayer(idx)}
                        >
                            <Flex flexDir='column'>
                                <Input 
                                    variant='unstyled' 
                                    value={layer.name} 
                                    fontSize='10pt' 
                                    onChange={(e) => ChangeLayerName(e, idx)} 
                                    fontWeight={currentLayer === idx ? 'bold' : 'normal'}
                                />
                                <Text fontSize='8pt' textAlign='left' fontWeight='500' mt='.25em'>
                                    Images: {layer.images.length}
                                </Text>
                            </Flex>
                        </Button>
                        <IconButton 
                            aria-label='Delete Layer' 
                            position='absolute'
                            top='-2.5'
                            right='-2.5'
                            isRound
                            icon={<FaTrashAlt />}
                            size='sm'
                            onClick={() => DeleteLayer(idx)}
                        />
                    </Box>
                )).reverse()}
            </VStack>
        </VStack>
    )
}

export default Layers