import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { useCore } from '@/providers/CoreProvider'

export const useLanding = () => { 
    const { setIsCookieModal, setIsServiceModal } = useCore();
    const { isLoggedIn } = useUser();
    const toast = useToast();

    useEffect(() => {
        // Check if user accepted cookie
        if (!localStorage.getItem('nfthost-cookie')) {
            setIsCookieModal(true);
        }
    }, [])

    const onGetStarted = () => {
        try {
            if (!isLoggedIn) throw new Error('You must connect your wallet first (see top-right corner)');

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

    return {
        setIsCookieModal,
        onGetStarted
    }
}