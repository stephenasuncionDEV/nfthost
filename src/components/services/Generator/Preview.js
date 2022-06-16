import { Box, Text, Flex, VStack, useColorModeValue, Image, Button } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useGenerate } from '@/hooks/useGenerate'
import { FaRedo } from 'react-icons/fa'

const Preview = () => {
    const { previewLayers } = useGenerator();
    const { RandomPreview } = useGenerate();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');
    const dropContainerColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)');

    return (
        <VStack
            id='preview'
            p='1em'
            bg={containerColor}
            borderRadius='.25em'
            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
            flexDir='column'
            h='100%'
            alignItems='flex-start'
        >
            <Text fontWeight='bold' fontSize='10pt'>
                Preview
            </Text>
            <Text fontSize='10pt'>
                A preview of one of your NFT
            </Text>
            <Box position='relative' w='250px' h='250px' bg={dropContainerColor} borderRadius='10px' mt='1em'>
                {previewLayers?.map((layer, idx) => (
                    <Image 
                        position='absolute' 
                        src={layer} 
                        fallbackSrc='/assets/transparent.png'
                        alt={`Preview ${idx}`} 
                        boxSize='225px'
                        top='12.5'
                        right='12.5'
                        key={idx}
                    />
                ))}
            </Box>
            <Flex justifyContent='flex-end' w='full'>
                <Button leftIcon={<FaRedo />} size='sm' onClick={() => RandomPreview(false)}>
                    Random
                </Button>
            </Flex>
        </VStack>
    )
}

export default Preview