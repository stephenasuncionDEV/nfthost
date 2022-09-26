import { Text, Flex, useColorModeValue, Checkbox, VStack } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { webColor } from '@/theme/index'

const Option = () => {
    const { isRandomizedMetadata, setIsRandomizedMetadata } = useGenerator();

    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);

    return (
        <Flex 
            flexDir='column'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='.25em'
            alignItems='flex-start'
            border='1px solid rgb(117,63,229)'
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