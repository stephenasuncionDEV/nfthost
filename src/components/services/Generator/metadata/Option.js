import { Text, Flex, useColorModeValue, Checkbox, VStack } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'

const Option = () => {
    const { isRandomizedMetadata, setIsRandomizedMetadata } = useGenerator();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');

    return (
        <Flex 
            flexDir='column'
            id='metadata'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='.25em'
            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
            alignItems='flex-start'
        >
            <Text fontWeight='bold' fontSize='10pt'>
                Options
            </Text>
            <Text fontSize='9pt' mb='1em'>
                This will affect your collection's metadata.json file.
            </Text>
            <VStack p='1em' alignItems='flex-start' w='full'>
                <Checkbox isChecked={isRandomizedMetadata} onChange={(e) => setIsRandomizedMetadata(e.target.checked)}>
                    <Text fontSize='10pt'>
                        Shuffled (Randomized) metadata.json
                    </Text>
                </Checkbox>
            </VStack>
        </Flex>
    )
}

export default Option