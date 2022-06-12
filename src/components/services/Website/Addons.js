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
        <Box>
            
        </Box>
    )
}

export default Addons