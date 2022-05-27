import { useCore } from '@/providers/CoreProvider'

export const useCookie = () => {
    const { setIsCookieModal } = useCore();

    const onAccept = () => {
        localStorage.setItem('nfthost-cookie', 'true');
        setIsCookieModal(false);
    }

    return {
        onAccept
    }
}