import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, HStack, Text, Flex, Button, 
    VStack, SlideFade, Input, Textarea,
    NumberInput, NumberInputField, NumberInputStepper,
    NumberIncrementStepper, NumberDecrementStepper,
    Radio, RadioGroup, FormLabel, FormControl,
    Tag, TagCloseButton, TagLabel, IconButton
} from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useGenerate } from '@/hooks/useGenerate'
import { useLayer } from '@/hooks/useLayer'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { GrFormAdd } from 'react-icons/gr'
import { FaTrashAlt } from 'react-icons/fa'

const Assets = ({ description }) => {
    const { 
        layers
    } = useGenerator();
    const { 
        onChangeLayerName, 
        onPreviewLayer, 
        onDeleteLayer, 
        onAddLayer 
    } = useLayer();

    return (
        <Box w='full'>
            <Text variant='content_subtitle'>
                Assets 
            </Text>
            <HStack>
                <AiOutlineInfoCircle />
                <Text variant='content_description' mt='0'>
                    {description}
                </Text>
            </HStack>
            <Flex p='1em' mt='1.5em' bg='blackAlpha.100' borderRadius='10px' w='full' justifyContent='space-between'>
                <VStack spacing='1.5em'>
                    <HStack spacing='2em'>
                        <Text variant='content_subtitle' mt='0'>
                            Layers
                        </Text>
                        <Button size='sm' rightIcon={<GrFormAdd />} onClick={onAddLayer}>
                            Add Layer
                        </Button>
                    </HStack>
                    <VStack>
                        {layers?.map((layer, idx) => (
                            <Box position='relative' key={idx}>
                                <Button 
                                    key={idx} w='170px' h='55px' 
                                    borderLeftWidth={idx === 0 || idx === layers.length - 1 ? '2px' : '0'} 
                                    borderColor={idx === 0 ? '#08BDD4' : 'rgb(228,69,151)'}
                                    onClick={() => onPreviewLayer(layer)}
                                >
                                    <Flex flexDir='column'>
                                        <Input variant='unstyled' value={layer.name} fontSize='10pt' onChange={(e) => onChangeLayerName(e, idx)} color='black'/>
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
                                    onClick={() => onDeleteLayer(idx)}
                                />
                            </Box>
                        ))}
                    </VStack>
                </VStack>
                <VStack>

                </VStack>
            </Flex>
        </Box>
    )
}

export default Assets