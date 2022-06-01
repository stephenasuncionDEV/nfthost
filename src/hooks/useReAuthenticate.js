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
        if (disable || isLoggedIn) return;
        const storageToken = localStorage.getItem('nfthost-user');

        const ReAuthenticate = async () => {
            if (!storageToken) return;

            const userData = decryptToken(storageToken);

            //TODO: check if user is connected already, if not, use Connect function, else, setAddress, setIsLoggedIn, setUser
            // so that we dont get new access token everytime

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