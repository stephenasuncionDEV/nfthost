import { Box } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import WebsiteList from './WebsiteList'
import CreateWebsite from './CreateWebsite'

const Sites = () => {
    const { currentEditWebsite } = useWebsite();

    return (
        <Box>
            <WebsiteList />
            <CreateWebsite />
        </Box>
    )
}

export default Sites