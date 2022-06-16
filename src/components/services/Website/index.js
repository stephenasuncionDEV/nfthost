import { Box, Text, useColorModeValue, Wrap, Flex } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import Sidebar from './Sidebar'
import Sites from './Sites'
import Template from './Template'

const Website = () => {
    const { currentDashboard } = useWebsite();

    return (
        <Sites />
    )
}

export default Website