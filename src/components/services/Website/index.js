import { useEffect } from 'react'
import { VStack, Button, Wrap } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useUser } from '@/providers/UserProvider'
import { useSites } from '@/hooks/useSites'
import AreYouSureModal from '@/components/AreYouSureModal'
import WebsiteList from './WebsiteList'
import CreateWebsiteModal from './CreateWebsiteModal'
import EditWebsite from './EditWebsite'
import CurrentTemplate from './CurrentTemplate'
import { MdAdd } from 'react-icons/md'

const Website = () => {
    const { websites, setIsCreateWebsiteModal, setCreateWebsiteStep, isEditWebsite } = useWebsite();
    const { isLoggedIn } = useUser();
    const { GetWebsites, clearFields } = useSites();
    const freeWebsiteCount = websites?.filter((website) => !website.isPremium)?.length;

    useEffect(() => {
        if (!isLoggedIn) return;
        GetWebsites();
    }, [isLoggedIn])

    return (
        <VStack spacing='2em' alignItems='flex-start'>
            <CreateWebsiteModal />
            <AreYouSureModal />
            <Button leftIcon={<MdAdd />} color='white' variant='primary' size='sm' onClick={() => {
                clearFields();
                setCreateWebsiteStep('information');
                setIsCreateWebsiteModal(true);
            }} disabled={freeWebsiteCount >= 3}>
                Create Website
            </Button>
            <WebsiteList />
            {isEditWebsite && (
                <Wrap spacing='2em'>
                    <EditWebsite />
                    <CurrentTemplate />
                </Wrap>
            )}
        </VStack>
    )
}

export default Website