import { Box } from '@chakra-ui/react'
import WebsiteList from './WebsiteList'
import CreateWebsite from './CreateWebsite'

const Sites = () => {

    return (
        <Box>
            <WebsiteList />
            <CreateWebsite />
        </Box>
    )
}

export default Sites