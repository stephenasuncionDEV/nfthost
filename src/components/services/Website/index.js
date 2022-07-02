import { useEffect } from 'react'
import { VStack, Button, Wrap, HStack, Box } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useUser } from '@/providers/UserProvider'
import { useSites } from '@/hooks/useSites'
import AreYouSureModal from '@/components/AreYouSureModal'
import AddonSettingsModal from '@/components/services/Website/AddonSettingsModal'
import WebsiteList from './WebsiteList'
import CreateWebsiteModal from './CreateWebsiteModal'
import EditWebsite from './EditWebsite'
import Design from './Design'
import { MdAdd } from 'react-icons/md'
import config from '@/config/index'
import ReCAPTCHA from 'react-google-recaptcha'

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
            <AddonSettingsModal />
            <HStack spacing='2em'>
                <Button 
                    leftIcon={<MdAdd />} 
                    color='white' 
                    variant='primary' 
                    size='sm' 
                    onClick={() => {
                        clearFields();
                        setCreateWebsiteStep('information');
                        setIsCreateWebsiteModal(true);
                    }} 
                    disabled={freeWebsiteCount >= 3}
                >
                    Create Website
                </Button>
            </HStack>
            <WebsiteList />
            {isEditWebsite && (
                <Wrap spacing='2em' w='full'>
                    <EditWebsite />
                    <Design />
                </Wrap>
            )}
        </VStack>
    )
}

export default Website