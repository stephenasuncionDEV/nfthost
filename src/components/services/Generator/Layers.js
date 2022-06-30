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

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');
    
    return (
        <VStack 
            id='layers'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='.25em'
            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
            h='100%'
        >
            <HStack spacing='2em'>
                <Text fontWeight='bold' fontSize='10pt'>
                    Layers
                </Text>
                <Button size='sm' rightIcon={<MdOutlineAdd />} onClick={AddLayer} variant='primary'>
                    Add Layer
                </Button>
            </HStack>
            <VStack alignItems='flex-start' w='full'>
                <HStack>
                    <Box borderRadius='5px' bg='orange' p='.25em' />
                    <Text fontSize='10pt'>
                        Top Layer
                    </Text>
                </HStack>
                <HStack>
                    <Box borderRadius='5px' bg='#08BDD4' p='.25em' />
                    <Text fontSize='10pt'>
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
                            variant='primary'
                        />
                    </Box>
                )).reverse()}
            </VStack>
        </VStack>
    )
}

export default Layers