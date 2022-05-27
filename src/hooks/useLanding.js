import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useUser } from '@/providers/UserProvider'
import { useCore } from '@/providers/CoreProvider'

export const useLanding = () => { 
    const toast = useToast();
    const router = useRouter();
    const { setIsCookieModal, setIsServiceModal } = useCore();
    const { isLoggedIn } = useUser();

    useEffect(() => {
        // Check if user accepted cookie
        if (!localStorage.getItem('nfthost-cookie')) {
            setIsCookieModal(true);
        }
    }, [])

    const onGetStarted = () => {
        try {
            if (!isLoggedIn) throw new Error('You must connect your wallet');

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

    const onNavigate = (route) => {
        try {
            if (!isLoggedIn) throw new Error('You must connect your wallet');

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
        onGetStarted,
        onNavigate,
    }
}