import { useEffect } from 'react'
import { useWeb3 } from '@/hooks/useWeb3'

export const useReAuthenticate = () => {
    const { onConnect } = useWeb3();

    useEffect(() => {
        const storageAddress = localStorage.getItem('nfthost-address');
        const storageWallet = localStorage.getItem('nfthost-wallet');
        if (!storageAddress || !storageWallet) return;
        onConnect(storageWallet);
    }, [])
}