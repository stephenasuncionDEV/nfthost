import { useCore } from '@/providers/CoreProvider'

export const useCookie = () => {
    const { setIsCookieModal } = useCore();

    const Accept = () => {
        localStorage.setItem('nfthost-cookie', 'true');
        setIsCookieModal(false);
    }

    return {
        Accept
    }
}