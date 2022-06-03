import { useCore } from '@/providers/CoreProvider'
import posthog from 'posthog-js'

export const useCookie = () => {
    const { setIsCookieModal } = useCore();

    const Accept = () => {
        localStorage.setItem('nfthost-cookie', 'true');
        setIsCookieModal(false);

        posthog.capture('User accepted cookie');
    }

    return {
        Accept
    }
}