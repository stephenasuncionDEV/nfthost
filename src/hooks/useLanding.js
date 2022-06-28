import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useUser } from '@/providers/UserProvider'
import { useCore } from '@/providers/CoreProvider'
import posthog from 'posthog-js'

export const useLanding = () => { 
    const toast = useToast();
    const router = useRouter();
    const { setIsCookieModal, setIsServiceModal } = useCore();
    const { isLoggedIn } = useUser();

    const GetStarted = () => {
        try {
            if (!isLoggedIn) {
                router.push('/#connect', undefined, { shallow: true });
                throw new Error('You must connect your wallet');
            }

            posthog.capture('User clicked GetStarted on landing page');

            setIsServiceModal(true);
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

    const NavigateFeature = (route) => {
        try {
            if (!isLoggedIn) {
                router.push('/#connect', undefined, { shallow: true });
                throw new Error('You must connect your wallet');
            }

            posthog.capture('User clicked feature on landing page');

            router.push(route, undefined, { shallow: true }); 
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

    return {
        setIsCookieModal,
        GetStarted,
        NavigateFeature,
    }
}