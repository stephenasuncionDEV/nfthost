import { useEffect } from 'react'
import { useCore } from '@/providers/CoreProvider'
import posthog from 'posthog-js'

export const useCookie = () => {
    const { setIsCookieModal } = useCore();

    useEffect(() => {
        // Check if user accepted cookie
        if (!localStorage.getItem('nfthost-cookie')) {
            setIsCookieModal(true);
        }
    }, [])

    const Accept = () => {
        localStorage.setItem('nfthost-cookie', 'true');
        setIsCookieModal(false);

        posthog.capture('User accepted cookie');
    }

    return {
        Accept
    }
}