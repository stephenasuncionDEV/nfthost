import { useEffect } from 'react'
import { VStack, Button } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useUser } from '@/providers/UserProvider'
import WebsiteList from './WebsiteList'
import CreateWebsiteModal from './CreateWebsiteModal'
import { MdAdd } from 'react-icons/md'
import { useSites } from '@/hooks/useSites'

const Website = () => {
    const { setIsCreateWebsiteModal, setCreateWebsiteStep } = useWebsite();
    const { isLoggedIn } = useUser();
    const { GetWebsites, clearFields } = useSites();

    useEffect(() => {
        if (!isLoggedIn) return;
        GetWebsites();
    }, [isLoggedIn])

    return (
        <VStack spacing='2em' alignItems='flex-start'>
            <CreateWebsiteModal />
            <Button leftIcon={<MdAdd />} color='white' variant='primary' size='sm' onClick={() => {
                clearFields();
                setCreateWebsiteStep('information');
                setIsCreateWebsiteModal(true);
            }}>
                Create Website
            </Button>
            <WebsiteList />
            {/* <CreateWebsite /> */}
        </VStack>
    )
}

export default Website