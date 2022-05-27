import { useEffect } from 'react'
import { useWeb3 } from '@/hooks/useWeb3'
import { useRouter } from 'next/router'
import { useUser } from '@/providers/UserProvider'

export const useReAuthenticate = (protect = false) => {
    const { isLoggedIn } = useUser();
    const { onConnect } = useWeb3();
    const router = useRouter();

    useEffect(() => {
        const onReAuthenticate = async () => {
            const storageAddress = localStorage.getItem('nfthost-address');
            const storageWallet = localStorage.getItem('nfthost-wallet');
            if (!storageAddress || !storageWallet) return;

            const isConnected = await onConnect(storageWallet);

            if (protect && !isConnected) {
                if (!isLoggedIn) router.push('/', undefined, { shallow: true });
            }
        }
        onReAuthenticate();
    }, [])
}