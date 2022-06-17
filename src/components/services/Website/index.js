import { VStack, Button } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import WebsiteList from './WebsiteList'
import CreateWebsiteModal from './CreateWebsiteModal'
import { MdAdd } from 'react-icons/md'

const Website = () => {
    const { setIsCreateWebsiteModal } = useWebsite();

    return (
        <VStack spacing='2em' alignItems='flex-start'>
            <CreateWebsiteModal />
            <Button leftIcon={<MdAdd />} color='white' variant='primary' size='sm' onClick={() => setIsCreateWebsiteModal(true)}>
                Create Website
            </Button>
            <WebsiteList />
            {/* <CreateWebsite /> */}
        </VStack>
    )
}

export default Website