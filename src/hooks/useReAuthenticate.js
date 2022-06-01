import { useEffect } from 'react'
import { useWeb3 } from '@/hooks/useWeb3'
import { useRouter } from 'next/router'
import { useUser } from '@/providers/UserProvider'

export const useReAuthenticate = (protect = false, disable = false) => {
    const { isLoggedIn } = useUser();
    const { Connect } = useWeb3();
    const router = useRouter();

    useEffect(() => {
        const ReAuthenticate = async () => {
            const storageAddress = localStorage.getItem('nfthost-address');
            const storageWallet = localStorage.getItem('nfthost-wallet');
            if (!storageAddress || !storageWallet) return;

            const isConnected = await Connect(storageWallet);

            if (protect && !isConnected) {
                if (!isLoggedIn) router.push('/', undefined, { shallow: true });
            }
        }
        if (disable) return;
        ReAuthenticate();
    }, [])
}