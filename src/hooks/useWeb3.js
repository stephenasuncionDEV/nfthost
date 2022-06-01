import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useUser } from '@/providers/UserProvider'
import Web3 from 'web3'

export const useWeb3 = () => {
    const toast = useToast();
    const router = useRouter();
    const { setAddress, setIsLoggedIn } = useUser();

    const Connect = async (wallet) => {
        try {
            if (wallet === 'metamask') {
                if (typeof window.ethereum === 'undefined' || (typeof window.web3 === 'undefined')) throw new Error('Metamask is not installed');
                window.web3 = new Web3(window.ethereum) || new Web3(window.web3.currentProvider);
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                localStorage.setItem('nfthost-address', accounts[0]);
                setAddress(accounts[0]);
                setIsLoggedIn(true);
            }
            else if (wallet === 'phantom') {
                const provider = window.solana;
                if (!provider.isPhantom) throw new Error('Phantom is not installed');
                const sol = await window.solana.connect();
                localStorage.setItem('nfthost-address', sol.publicKey.toString());
                setAddress(sol.publicKey.toString());
                setIsLoggedIn(true);
            }

            localStorage.setItem('nfthost-wallet', wallet);

            return true;
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
            
            return false;
        }
    }

    const Logout = async () => {
        try {
            setAddress('');
            setIsLoggedIn(false);
            localStorage.setItem('nfthost-address', '');
            localStorage.setItem('nfthost-wallet', '');
            router.push('/', undefined, { shallow: true }); 
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
        Connect,
        Logout
    }
}