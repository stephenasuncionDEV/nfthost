import { useEffect } from 'react'
import { VStack, Button } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useUser } from '@/providers/UserProvider'
import { useSites } from '@/hooks/useSites'
import WebsiteList from './WebsiteList'
import CreateWebsiteModal from './CreateWebsiteModal'
import EditWebsite from './EditWebsite'
import { MdAdd } from 'react-icons/md'

const Website = () => {
    const { websites, setIsCreateWebsiteModal, setCreateWebsiteStep, isEditWebsite } = useWebsite();
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
            }} disabled={websites.length > 3}>
                Create Website
            </Button>
            <WebsiteList />
            {isEditWebsite && <EditWebsite />}
        </VStack>
    )
}

export default Website