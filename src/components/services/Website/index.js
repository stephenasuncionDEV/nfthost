import { useEffect } from 'react'
import { VStack, Button, Wrap, HStack, Box, useToast } from '@chakra-ui/react'
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
    const toast = useToast();
    const { websites, setIsCreateWebsiteModal, setCreateWebsiteStep, isEditWebsite, recaptchaRef } = useWebsite();
    const { isLoggedIn } = useUser();
    const { GetWebsites, clearFields } = useSites();
    const freeWebsiteCount = websites?.filter((website) => !website.isPremium)?.length;

    useEffect(() => {
        if (!isLoggedIn) return;
        GetWebsites();
    }, [isLoggedIn])

    const CreateWebsite = () => {
        try {
            if (!recaptchaRef.current.getValue().length) throw new Error('Please verify that you are a human.');
            clearFields();
            setCreateWebsiteStep('information');
            setIsCreateWebsiteModal(true);
        }
        catch (err) {
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

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
                    onClick={CreateWebsite} 
                    disabled={freeWebsiteCount >= 3}
                >
                    Create Website
                </Button>
                <Box>
                    <ReCAPTCHA 
                        ref={recaptchaRef} 
                        sitekey={config?.recaptcha?.siteKey}
                        onExpired={() => console.log('expired')}
                        onErrored={(e) => console.log(e)}
                    />
                </Box>
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