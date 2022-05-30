import { Box, Text, VStack} from '@chakra-ui/react'
import Metadata from './Metadata'
import Assets from './Assets'
import Pagination from './Pagination'

const Generator = () => {

    return (
        <Box>
            <Text variant='content_title'>
                Collection Generator
            </Text>
            <VStack alignItems='flex-start' mt='1em' spacing='3em'>
                <Pagination>
                    <Metadata description='General information of your new NFT collection' />
                    <Assets description='Resources neccessary to create your NFT collection' />
                </Pagination>
            </VStack>
        </Box>
    )
}

export default Generator