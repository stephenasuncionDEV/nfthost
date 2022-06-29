import { Text, Flex, Button, VStack, useColorModeValue, Wrap, Image } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import Configuration from './Configuration'
import { metadataStandardsArr } from '@/utils/json'
import Option from './Option'
import Preview from './Preview'

const Metadata = () => {
    const { 
        standardType,
        setStandardType,
    } = useGenerator();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');
    const bgColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)');
    const buttonDefaultColor = useColorModeValue('gray.100', 'whiteAlpha.200');

    return (
        <VStack flexDir='column' spacing='2em'>
            <Flex
                flexDir='column'
                id='metadata'
                spacing='1.5em'
                p='1em' 
                bg={containerColor}
                borderRadius='.25em'
                boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
                alignItems='flex-start'
                w='full'
            >
                <Text fontWeight='bold' fontSize='10pt'>
                    Metadata
                </Text>
                <Text fontSize='10pt'>
                    Select a Metadata Standard
                </Text>
                <Wrap spacing='.5em' mt='1em' p='.5em' bg={bgColor} borderRadius='10px' w='full'>
                    {metadataStandardsArr?.map((standard, idx) => (
                        <Button 
                            key={idx} 
                            h='60px' 
                            minW='120px' 
                            justifyContent='flex-start' 
                            onClick={() => setStandardType(standard)}
                            borderColor={standardType.name === standard.name ? 'rgb(52,140,212)' : buttonDefaultColor}
                            borderBottomWidth='3px'
                        >
                            <VStack justifyContent='center' alignItems='center' w='full' h='full' p='.5em'>
                                {standard.name !== 'Other' && <Image src={standard.image} alt={standard.name} w='20px' h='25px' />}
                                <Text fontSize='10pt' textAlign='start'>
                                    {standard.name}
                                </Text>
                            </VStack>
                        </Button>
                    ))}
                </Wrap>
            </Flex>
            <Wrap spacing='2em'>
                <Configuration />
                <Wrap direction='column' spacing='2em' flex='1'>
                    <Preview />
                    <Option />
                </Wrap>
            </Wrap>
        </VStack>
    )
}

export default Metadata