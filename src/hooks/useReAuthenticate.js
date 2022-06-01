import { useEffect } from 'react'
import { useWeb3 } from '@/hooks/useWeb3'
import { useRouter } from 'next/router'
import { useUser } from '@/providers/UserProvider'
import { decryptToken } from '@/utils/tools'

export const useReAuthenticate = (protect = false, disable = false) => {
    const { isLoggedIn } = useUser();
    const { Connect } = useWeb3();
    const router = useRouter();

    useEffect(() => {
        if (disable) return;
        const storageToken = localStorage.getItem('nfthost-user');

        const ReAuthenticate = async () => {
            if (!storageToken) return;

            const userData = decryptToken(storageToken);
            const isConnected = await Connect(userData.wallet);

            if (protect && !isConnected) {
                if (!isLoggedIn) router.push('/', undefined, { shallow: true });
            }
        }

        if (!storageToken && protect) {
            if (!isLoggedIn) router.push('/', undefined, { shallow: true });
        }

        ReAuthenticate();
    }, [])
}