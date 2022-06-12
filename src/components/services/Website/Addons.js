import { HStack, Text, Flex, Button, VStack, 
    useColorModeValue, Image, Wrap, Tag, TagLeftIcon, Box
} from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useTemplate } from '@/hooks/useTemplate'
import { GiCutDiamond } from 'react-icons/gi'
import { TemplatesArr } from '@/utils/tools'

const Addons = () => {
    const { currentEditWebsite } = useWebsite();
    
    const containerColor = useColorModeValue('whiteAlpha.500', 'blackAlpha.500');

    return (
        <VStack 
            id='templateList'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='10px'
            boxShadow='md'
            h='100%'
            alignItems='flex-start'
            flex='1'
        >
            <VStack spacing='0' alignItems='flex-start'>
                <Text variant='content_subtitle' fontSize='12pt'>
                    Addons
                </Text>
                <Text fontSize='10pt'>
                    Choose additional features you want for your website
                </Text>
            </VStack>
            <Wrap spacing='1em'>

            </Wrap>
        </VStack>
    )
}

export default Addons